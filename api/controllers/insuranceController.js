const fs = require('fs');
const csv = require('csv-parser');

const csvFilePath = './data/Car_Insurance_Claim.csv';

const getCreditScore = (req, res) => {
  const { AGE, GENDER, DRIVING_EXPERIENCE, EDUCATION, INCOME, VEHICLE_YEAR, VEHICLE_TYPE, ANNUAL_MILEAGE } = req.query;


  const results = [];

  fs.createReadStream(csvFilePath)
    .pipe(csv())
    .on('data', (data) => {

      const csvAge = data.AGE.toLowerCase();
      const csvGender = data.GENDER.toLowerCase();
      const csvDrivingExperience = data.DRIVING_EXPERIENCE.toLowerCase();
      const csvEducation = data.EDUCATION.toLowerCase();
      const csvIncome = data.INCOME.toLowerCase();
      const csvVehicleYear = data.VEHICLE_YEAR.toLowerCase();
      const csvVehicleType = data.VEHICLE_TYPE.toLowerCase();
      const csvAnnualMileage = parseInt(data.ANNUAL_MILEAGE, 10) || 0;

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

        results.push({ ID: data.ID, CREDIT_SCORE: data.CREDIT_SCORE });
      }
    })
    .on('end', () => {

      if (results.length === 0) {
        res.status(404).json({ message: "Nenhum resultado encontrado para os parâmetros fornecidos." });
      } else {
        res.json(results);
      }
    })
    .on('error', (error) => {
      console.error('Erro ao ler o arquivo CSV:', error);
      res.status(500).json({ message: 'Erro ao processar a solicitação.' });
    });
};

module.exports = { getCreditScore };
