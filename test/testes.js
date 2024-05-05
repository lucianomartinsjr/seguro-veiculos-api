const { calcularCreditScore } = require('../src/controllers/personController');

describe('calcularCreditScore', () => {
    test('Deve retornar um número entre 300 e 1200', () => {
        const personData = {}; // Dados fictícios para teste
        const creditScore = calcularCreditScore(personData);
        expect(creditScore).toBeGreaterThanOrEqual(300);
        expect(creditScore).toBeLessThanOrEqual(1200);
    });
});
