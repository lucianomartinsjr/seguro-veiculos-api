const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const yamljs = require('yamljs');
const insuranceRoutes = require('./api/routes/insuranceRoutes');

const app = express();
const swaggerDocument = yamljs.load('./swagger.yaml');

app.use(bodyParser.json());

// Rota principal
app.use('/api', insuranceRoutes);

// Rota para a documentação da API
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
