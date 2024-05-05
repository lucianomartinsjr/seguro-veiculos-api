const { getCreditScore } = require('../api/controllers/insuranceController');

jest.mock('fs', () => ({
  createReadStream: jest.fn(() => ({
    pipe: jest.fn(() => ({
      on: jest.fn((event, callback) => {
        if (event === 'data') {
          callback({
            AGE: '65+',
            GENDER: 'female',
            DRIVING_EXPERIENCE: '0-9y',
            EDUCATION: 'high school',
            INCOME: 'upper class',
            VEHICLE_YEAR: 'after 2015',
            VEHICLE_TYPE: 'sedan',
            ANNUAL_MILEAGE: '12000.0',
            CREDIT_SCORE: '0.629027313918201'
          });
        } else if (event === 'end') {
          callback();
        }
      })
    }))
  }))
}));

describe('getCreditScore', () => {
  test('should return the credit score for valid parameters', async () => {
    const req = {
      query: {
        AGE: '65+',
        GENDER: 'female',
        DRIVING_EXPERIENCE: '0-9y',
        EDUCATION: 'high school',
        INCOME: 'upper class',
        VEHICLE_YEAR: 'after 2015',
        VEHICLE_TYPE: 'sedan',
        ANNUAL_MILEAGE: '12000.0'
      }
    };

    const res = {
      json: jest.fn()
    };

    await getCreditScore(req, res);

    expect(res.json).toHaveBeenCalledWith({ creditScore: '0.629027313918201' });
  });

  test('should return 404 if no credit score found for provided parameters', async () => {
    const req = {
      query: {
        AGE: '65+',
        GENDER: 'female',
        DRIVING_EXPERIENCE: '0-9y',
        EDUCATION: 'high school',
        INCOME: 'upper class',
        VEHICLE_YEAR: 'after 2015',
        VEHICLE_TYPE: 'sedan',
        ANNUAL_MILEAGE: '13000.0' // This should not match the mocked data
      }
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    await getCreditScore(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: "CREDIT_SCORE não encontrado para os dados fornecidos." });
  });
});
