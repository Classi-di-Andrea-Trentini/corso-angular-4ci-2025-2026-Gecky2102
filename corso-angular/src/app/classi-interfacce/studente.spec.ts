import { Studente } from './studente';

describe('Studente', () => {
  it('should create an instance', () => {
    expect(new Studente(1, 'Mario', 'Rossi', 'Maschio', '4A')).toBeTruthy();
  });
});
