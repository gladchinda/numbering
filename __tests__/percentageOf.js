const percentageOf = require('../src/percentageOf');

describe('percentageOf()', () => {
  test('should return percentage with 0 precision when third argument is not passed', () => {
    const percent = percentageOf(100, 53.75);

    expect(typeof percent).toBe('number');
    expect(percent).toEqual(54);
  });

  test('should return percentage with the given precision when third argument is passed', () => {
    const percent1 = percentageOf(450, 150, 1);
    const percent2 = percentageOf(18, 2400, 2);

    expect(typeof percent1).toBe('number');
    expect(typeof percent2).toBe('number');

    expect(percent1).toEqual(33.3);
    expect(percent2).toEqual(13333.33);
  });

  test('should throw an error with non-finite first argument', () => {
    expect(() => percentageOf('6')).toThrow();
  });

  test('should throw an error with non-finite second argument', () => {
    expect(() => percentageOf(35, '10')).toThrow();
  });

  test('should throw an error with non-positive whole number third argument', () => {
    expect(() => percentageOf(35, 10, -3)).toThrow();
  });
});
