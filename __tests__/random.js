const random = require('../src/random');

describe('random()', () => {
  test('should return string of the given length containing only digits', () => {
    const digits = random(6);

    expect(typeof digits).toBe('string');
    expect(digits).toHaveLength(6);
    expect(digits).toMatch(/^\d+$/);
  });

  test('should return string containing only 1 digit when called without arguments', () => {
    const digits = random();

    expect(typeof digits).toBe('string');
    expect(digits).toHaveLength(1);
    expect(digits).toMatch(/^\d$/);
  });

  test('should throw an error with non-integer argument', () => {
    expect(() => random('6')).toThrow();
  });

  test('should throw an error with non-natural number argument', () => {
    expect(() => random(0)).toThrow();
  });

  test('should return string starting with non-zero digit when second argument is true', () => {
    const digits = random(6, true);
    
    expect(typeof digits).toBe('string');
    expect(digits).toHaveLength(6);
    expect(digits).toMatch(/^[1-9]/);
  });
});
