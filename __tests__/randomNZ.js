const randomNZ = require('../src/randomNZ');

describe('randomNZ()', () => {
  test('should return string of the given length containing only non-zero digits', () => {
    const digits = randomNZ(6);

    expect(typeof digits).toBe('string');
    expect(digits).toHaveLength(6);
    expect(digits).toMatch(/^[1-9]+$/);
  });

  test('should return string containing only 1 non-zero digit when called without arguments', () => {
    const digits = randomNZ();

    expect(typeof digits).toBe('string');
    expect(digits).toHaveLength(1);
    expect(digits).toMatch(/^[1-9]$/);
  });

  test('should throw an error with non-integer argument', () => {
    expect(() => randomNZ('6')).toThrow();
  });

  test('should throw an error with non-natural number argument', () => {
    expect(() => randomNZ(0)).toThrow();
  });
});
