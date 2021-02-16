const fs = require('fs');

module.exports = {
    config: function(params = {}) {
        const file = params.file || '.env';

        const content = fs.readFileSync(file, 'utf-8');
        const lines = content.split('\n');

        for (const line of lines) {
            const [key, value] = this.parse(line);

            process.env[key] = value;
        }
    },

    parse: function(line) {
        const pair = line.split('=');
        let [key, value] = pair;
        let parsedValue;

        if (!isNaN(Number(value)) && Number(value) !== 0)
            parsedValue = Number(value);
        else if (value == 'true')
            parsedValue = true;
        else if (value == 'false')
            parsedValue = false;
        else {
            value = value.trim();

            if ((value.startsWith('\'') && value.endsWith('\'')) || (value.startsWith('"') && value.endsWith('"'))) {
                parsedValue = value.slice(1, -1);   // Getting rid of the quotation marks
            } else
                parsedValue = value;
        }

        return [key, parsedValue];
    }
}