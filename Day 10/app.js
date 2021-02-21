const http = require('http');
const staticRoutes = require('./routes/staticRoutes');
const dynamicRoutes = require('./routes/dynamicRoutes');
const {isDynamicRoute, requiresData} = require('./routes/routeUtils');

const PORT = process.env.PORT || 8080;

http.createServer(async (request, response) => {
    const method = request.method;
    const url = request.url.endsWith('/') ? request.url.slice(0, -1) : request.url;

    const {isD, m = undefined, reg = undefined} = isDynamicRoute(url, method);
    if (isD) {
        const param = m[1];

        if (requiresData(url, method)) {
            request.on('data', async (data) => {
                const answer = await dynamicRoutes[method][reg](param, data);
                return respond(answer);
            });
        } else {
            const answer = await dynamicRoutes[method][reg](param);
            return respond(answer);
        }

    } else if (staticRoutes[method]) {
        const routeHandler = staticRoutes[method][url];

        if (requiresData(url, method)) {
            request.on('data', async (data) => {
                const answer = await routeHandler(data);
                respond(answer);
            });
        } else {
            const answer = await routeHandler();
            respond(answer);
        }
    }

    function respond({message, data = null, reason = null}) {
        if (message === 'success') {
            response.statusCode = 200;
            response.setHeader('Content-Type', 'application/json');
            response.end(JSON.stringify(data));
        } else {
            response.statusCode = 400;
            console.error(reason);
            response.end(reason.toString());
        }
    }
    
}).listen(PORT, () => {
    console.log(`Server is running at port ${PORT}...`);
});