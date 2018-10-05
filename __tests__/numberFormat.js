const numberFormat = require('../src/numberFormat');

describe('numberFormat()', () => {
  test('should return formatted number with up to 20 precision when valid arguments are passed', () => {

    const num1 = numberFormat(123456789, 2);
    const num2 = numberFormat('-123,456,789', 3);
    const num3 = numberFormat('1234.56789', 2);
    const num4 = numberFormat(-1234.56789, 6);
    const num5 = numberFormat(Math.PI / Math.E, 10);

    expect(num1).toEqual('123,456,789.00');
    expect(num2).toEqual('-123,456,789.000');
    expect(num3).toEqual('1,234.57');
    expect(num4).toEqual('-1,234.567890');
    expect(num5).toEqual('1.1557273498');

  });

  test('should return formatted number with 0 precision when second argument is not passed or is invalid', () => {

    const num1 = numberFormat(123456789);
    const num2 = numberFormat('-123,456,789', -5);
    const num3 = numberFormat('1234.56789', null);
    const num4 = numberFormat(-1234.56789, false);
    const num5 = numberFormat(Math.PI / Math.E, 12.3);

    expect(num1).toEqual('123,456,789');
    expect(num2).toEqual('-123,456,789');
    expect(num3).toEqual('1,235');
    expect(num4).toEqual('-1,235');
    expect(num5).toEqual('1');

  });
  
  test('should return value when invalid numeric value is passed', () => {

    const num1 = numberFormat([1, 2, 3, 4, 5]);
    const num2 = numberFormat('-123,456-789');
    const num3 = numberFormat('123.4.567.89');
    const num4 = numberFormat(false);
    const num5 = numberFormat({ candy: 5 });

    expect(num1).toEqual([1, 2, 3, 4, 5]);
    expect(num2).toEqual('-123,456-789');
    expect(num3).toEqual('123.4.567.89');
    expect(num4).toEqual(false);
    expect(num5).toEqual({ candy: 5 });

  });

  test('should truncate original precision of value to 20 before formatting the value', () => {
    const value = Math.PI / Math.E;
    const num1 = numberFormat(value, 20);
    const num2 = numberFormat(value, 25);

    expect(num2).toMatch(new RegExp(`^${num1}0{5}\$`));
  });
});
