const fs = require('fs');
const csv = require('csv-parser');

const csvFilePath = './data/Car_Insurance_Claim.csv';

const getCreditScore = (req, res) => {
  const { AGE, GENDER, DRIVING_EXPERIENCE, EDUCATION, INCOME, VEHICLE_YEAR, VEHICLE_TYPE, ANNUAL_MILEAGE } = req.query;

  // Array para armazenar os resultados encontrados
  const results = [];

  // Ler o arquivo CSV e procurar os dados correspondentes
  fs.createReadStream(csvFilePath)
    .pipe(csv())
    .on('data', (data) => {
      // Normalizar os dados do CSV
      const csvAge = data.AGE.toLowerCase();
      const csvGender = data.GENDER.toLowerCase();
      const csvDrivingExperience = data.DRIVING_EXPERIENCE.toLowerCase();
      const csvEducation = data.EDUCATION.toLowerCase();
      const csvIncome = data.INCOME.toLowerCase();
      const csvVehicleYear = data.VEHICLE_YEAR.toLowerCase();
      const csvVehicleType = data.VEHICLE_TYPE.toLowerCase();
      const csvAnnualMileage = parseInt(data.ANNUAL_MILEAGE) || 0;

      // Comparar os dados do CSV com os parâmetros fornecidos
      console.log('CSV:', csvAge, csvGender, csvDrivingExperience, csvEducation, csvIncome, csvVehicleYear, csvVehicleType, csvAnnualMileage);
      console.log('Params:', AGE.toLowerCase(), GENDER.toLowerCase(), DRIVING_EXPERIENCE.toLowerCase(), EDUCATION.toLowerCase(), INCOME.toLowerCase(), VEHICLE_YEAR.toLowerCase(), VEHICLE_TYPE.toLowerCase(), parseInt(ANNUAL_MILEAGE, 10) || 0);

      if (
        csvAge === AGE.toLowerCase() &&
        csvGender === GENDER.toLowerCase() &&
        csvDrivingExperience === DRIVING_EXPERIENCE.toLowerCase() &&
        csvEducation === EDUCATION.toLowerCase() &&
        csvIncome === INCOME.toLowerCase() &&
        csvVehicleYear === VEHICLE_YEAR.toLowerCase() &&
        csvVehicleType === VEHICLE_TYPE.toLowerCase() &&
        Math.round(csvAnnualMileage) === Math.round(parseInt(ANNUAL_MILEAGE) || 0)
      ) {
        // Se houver correspondência, adicionar o ID e o CREDIT_SCORE à lista de resultados
        results.push({ ID: data.ID, CREDIT_SCORE: data.CREDIT_SCORE });
      }
    })
    .on('end', () => {
      // Verificar se a lista de resultados está vazia
      if (results.length === 0) {
        // Se estiver vazia, enviar uma resposta 404 indicando que nenhum resultado foi encontrado
        res.status(404).json({ message: "Nenhum resultado encontrado para os parâmetros fornecidos." });
      } else {
        // Caso contrário, enviar a lista de resultados como resposta
        res.json(results);
      }
    })
    .on('error', (error) => {
      console.error('Erro ao ler o arquivo CSV:', error);
      res.status(500).json({ message: 'Erro ao processar a solicitação.' });
    });
};

module.exports = { getCreditScore };
