const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Le titre de votre API',
        version: '1.0.0',
        description: 'La description de votre API',
    },
    servers: [
        {
            url: 'http://localhost:3000',
            description: 'Development server',
        },
    ],
    components: {
        schemas: {
            Annonce: {
                type: 'object',
                properties: {
                    titre: {
                        type: 'string',
                        description: 'Titre de l\'annonce'
                    },
                    caracteristique: {
                        type: 'string',
                        description: 'Caracteristique de l\'annonce'
                    },
                    prix: {
                        type: 'number',
                        description: 'Prix de l\'annonce'
                    },
                },
            },
        },
    },
};

const options = {
    swaggerDefinition,
    apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
