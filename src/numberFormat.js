const { isNumber, isWhole } = require('../lib/types');

// Min and Max precisions for number formatting
const MIN_PRECISION = 0;
const MAX_PRECISION = 20;

// Regex for matching numeric value
const NUMERIC_REGEX = /^([-+]?)(\d+)(?:\.(\d+))?$/;

/**
 * Returns the numerically formatted representation of the specified number with
 * thousands separator(,) and decimal places based on the specified precision.
 * 
 * If the number of decimals in the number is lower than the precision, it is padded
 * with zeroes(0s) until the precision length.
 * 
 * For example:
 * 
 * numberFormat('-12345700') => '-12,345,700'
 * numberFormat(Math.PI / Math.E, 10) => '1.1557273498'
 * 
 * @param {string|number} value The number to be formatted
 * @param {number} precision The number of decimal places in the formatted number
 * 
 * @return {string|any}
 */
module.exports = (value, precision = MIN_PRECISION) => {

  // Check if value is a number or a string
  if (typeof value === 'string' || isNumber(value)) {

    // Resolve precision to a valid value, otherwise use 0
    precision = (isWhole(precision) && precision) || MIN_PRECISION;

    // Strip off every non-numeric character from numeric value
    const numeric = String(value).replace(/[^-+.\d]/g, '');

    // Normalize the specified value and return the string representation of the normalized number
    // Max allowed precision is 20.
    const normalized = String(parseFloat(numeric).toFixed(Math.min(precision, MAX_PRECISION)));

    // Check if the normalized number matches a valid number representation
    const matches = normalized.match(NUMERIC_REGEX);

    if (NUMERIC_REGEX.test(numeric) && matches) {

      // Destructure the matched parts from the matches array
      const [, sign, number, decimal = ''] = matches;

      // Resolve the length and separations offset of the whole number part before the decimal
      // 3 is used here because separation happens after every third digit
      const length = number.length;
      const offset = length % 3;

      // Get the number of thousand separations in the whole part of the number
      const splits = Math.round(length - offset) / 3;

      // Hold the offset digits as a group and add them as the first element of the separated array
      // Loop through every other digits in groups of 3 and append them to the separated array
      const separated = [
        ...((offset === 0) ? [] : [ number.substr(0, offset) ]),
        ...([ ...Array(splits) ].map((n, i) => number.substr(i * 3 + offset, 3)))
      ];

      // Join the sign, digit groups separated by (,), decimal point(.) and the decimal digits
      // And return the concatenated numeric string
      return [
        sign,
        separated.join(','),
        (precision > 0) ? '.' : '',
        decimal.padEnd(precision, '0').substr(0, (precision > 0 && precision) || 0)
      ].join('');

    }

  }

  // Return value if it does not have a valid numerical representation
  return value;

}
