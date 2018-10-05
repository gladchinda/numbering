const suffixFormat = require('../src/suffixFormat');

describe('suffixFormat()', () => {
  test('should return suffix formatted number with up to 10 precision when valid arguments are passed', () => {

    const num1 = suffixFormat(123456789, 2);
    const num2 = suffixFormat('-123,456,789', 3);
    const num3 = suffixFormat('1234.56789', 2);
    const num4 = suffixFormat(-12345678.9, 6);
    const num5 = suffixFormat(123, 10);

    expect(num1).toEqual('120M');
    expect(num2).toEqual('-124M');
    expect(num3).toEqual('1.2K');
    expect(num4).toEqual('-12.3457M');
    expect(num5).toEqual('123');

  });

  test('should return suffix formatted number with 1 precision when second argument is not passed or is invalid', () => {

    const num1 = suffixFormat(123456789);
    const num2 = suffixFormat('-123,456,789', -5);
    const num3 = suffixFormat('1234.56789', null);
    const num4 = suffixFormat(-1234.56789, false);
    const num5 = suffixFormat(Math.PI / Math.E * Math.pow(10, 13), 12.3);

    expect(num1).toEqual('100M');
    expect(num2).toEqual('-200M');
    expect(num3).toEqual('1K');
    expect(num4).toEqual('-2K');
    expect(num5).toEqual('10T');

  });
  
  test('should return value when invalid numeric value is passed', () => {

    const num1 = suffixFormat([1, 2, 3, 4, 5]);
    const num2 = suffixFormat('-123,456-789');
    const num3 = suffixFormat('123.4.567.89');
    const num4 = suffixFormat(false);
    const num5 = suffixFormat({ candy: 5 });

    expect(num1).toEqual([1, 2, 3, 4, 5]);
    expect(num2).toEqual('-123,456-789');
    expect(num3).toEqual('123.4.567.89');
    expect(num4).toEqual(false);
    expect(num5).toEqual({ candy: 5 });

  });

  test('should reduce higher precision to max value precision', () => {

    const num1 = suffixFormat(123456789, 10);
    const num2 = suffixFormat('-123,456,789', 50);
    const num3 = suffixFormat('1234.56789', 5);
    const num4 = suffixFormat(-1234.56789, 20);

    expect(num1).toEqual('123.45678M');
    expect(num2).toEqual('-123.45679M');
    expect(num3).toEqual('1.23K');
    expect(num4).toEqual('-1.24K');

  });

  test('should return numeric value when absolute value of number is less than 1000', () => {

    const num1 = suffixFormat(123);
    const num2 = suffixFormat('-12.345');
    const num3 = suffixFormat('0.123456789');
    const num4 = suffixFormat(Math.PI / Math.E);
    const num5 = suffixFormat(-999);

    expect(num1).toEqual('123');
    expect(num2).toEqual('-12.345');
    expect(num3).toEqual('0.123456789');
    expect(num4).toEqual('1.1557273497909217');

    // Abnormal result due to how negative numbers are stored
    expect(num5).toEqual('-1K');

  });

  test('should return rounded numeric value instead of floored when rounding third argument is true', () => {

    const num1 = suffixFormat(123456789, 6, true);
    const num2 = suffixFormat('-98765.4321', 3, true);
    const num3 = suffixFormat('987654321000', 1, true);
    const num4 = suffixFormat(987654321000, 2, true);
    const num5 = suffixFormat(-123456789, 50, true);

    expect(num1).toEqual('123.457M');
    expect(num2).toEqual('-98.8K');
    expect(num3).toEqual('1T');
    expect(num4).toEqual('990B');
    expect(num5).toEqual('-123.45679M');

  });
});
