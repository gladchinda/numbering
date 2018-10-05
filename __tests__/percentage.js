const percentage = require('../src/percentage');

describe('percentage()', () => {
  test('should return percentage with 0 precision when second argument is not passed', () => {
    const percent = percentage(0.123456789);

    expect(typeof percent).toBe('number');
    expect(percent).toEqual(12);
  });

  test('should return percentage with the given precision when second argument is passed', () => {
    const percent1 = percentage(0.123456789, 3);
    const percent2 = percentage(123.456789, 1);

    expect(typeof percent1).toBe('number');
    expect(typeof percent2).toBe('number');

    expect(percent1).toEqual(12.346);
    expect(percent2).toEqual(12345.7);
  });

  test('should throw an error with non-finite first argument', () => {
    expect(() => percentage('6')).toThrow();
  });

  test('should throw an error with non-positive whole number second argument', () => {
    expect(() => percentage(0.3, -3)).toThrow();
  });
});
