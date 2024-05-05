const express = require('express');
const swaggerUi = require('swagger-ui-express');
const specs = require('./docs/swaggerDef');
const { getCreditScore } = require('./src/controllers/personController');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Rota para calcular o crédito score
/**
 * @swagger
 * /credit-score:
 *   post:
 *     summary: Calcula o crédito score
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idade:
 *                 type: integer
 *               sexo:
 *                 type: string
 *               anosExperiencia:
 *                 type: integer
 *               escolaridade:
 *                 type: string
 *               renda:
 *                 type: string
 *               anoVeiculo:
 *                 type: integer
 *               tipoVeiculo:
 *                 type: string
 *               quilometragemAnual:
 *                 type: number
 *     responses:
 *       200:
 *         description: Crédito score calculado com sucesso
 */
app.post('/credit-score', getCreditScore);

// Rota para exibir a documentação da API
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
