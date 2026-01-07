import { Persona } from './persona';

describe('Persona', () => {
  it('should create an instance', () => {
    expect(new Persona(1, 'Giacomo', 'Masiero', 'M')).toBeTruthy();
  });
});
