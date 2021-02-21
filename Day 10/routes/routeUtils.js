const dynamicRoutes = require('./dynamicRoutes');

const endpointsRequiringData = {
    'POST': [
        '/users',
    ],

    'PUT': [
        new RegExp('/users/update/(\\d+)/?'),
    ],
};

module.exports = {
    isDynamicRoute: function (url, method) {
        if (!dynamicRoutes[method])
            return {isD: false};
        
        let dRoutes = Object.keys(dynamicRoutes[method]);
        for (const route of dRoutes) {
            let reg = new RegExp(route.slice(1, -1));
            let m = url.match(reg);

            if (m)
                return {isD: !!m, m, reg};
        }

        return {isD: false};
    },

    requiresData: function (url, method) {
        if (!endpointsRequiringData[method])
            return false;

        for (const endpoint of endpointsRequiringData[method]) {
            if (endpoint instanceof RegExp) {
                if (url.match(endpoint))
                    return true;
            } else {
                if (url === endpoint)
                    return true;
            }
        }

        return false;
    },
}