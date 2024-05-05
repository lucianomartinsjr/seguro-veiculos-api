const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Seguro de Veículos API',
            version: '1.0.0',
            description: 'API para calcular o crédito score para seguro de veículos',
        },
    },
    apis: ['./src/controllers/*.js'],
};

const specs = swaggerJsdoc(options);

module.exports = specs;
