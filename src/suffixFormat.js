const { boolOrFalse } = require('../lib/bools');
const { isNumber, isNatural } = require('../lib/types');

// Min and Max precisions for suffix formatting
const MIN_PRECISION = 1;
const MAX_PRECISION = 10;

// Suffixes for increasing thousand levels
const SUFFIXES = ['K', 'M', 'B', 'T'];

// Regex for matching numeric value
const NUMERIC_REGEX = /^([-+]?)(\d+)(?:\.(\d+))?$/;

/**
 * Returns the suffix formatted representation of the specified number.
 * By default, values are flooored using Math.floor() except the rounding argument
 * is set to true, in which case they are rounded using Math.round().
 * 
 * The precision must be between 1 and 10. Precision of 1 is used by default if no precision
 * or an invalid precision is supplied. However, if the given precision is far higher than
 * the precision of the whole part of the number value, then the max value precision will be
 * used instead.
 * 
 * For example:
 *
 * suffixFormatted(1234567) => '1M'
 * suffixFormatted('-12345', 3) => '-12.4K'
 * suffixFormatted(123456789, 4, true) => '123.5M'
 * 
 * @param {string|number} value The number to be formatted
 * @param {number} precision The max number of digits in the formatted number (precision)
 * @param {boolean} rounding Determine whether values should be rounded or floored
 * 
 * @returns {string|any}
 */
module.exports = (value, precision = MIN_PRECISION, rounding = false) => {

  // Check if value is a number or a string
  if (typeof value === 'string' || isNumber(value)) {

    // Strip off every non-numeric character from numeric value
    const numeric = String(value).replace(/[^-+.\d]/g, '');

    // Return value if it is not a valid numeric value
    if (!NUMERIC_REGEX.test(numeric)) {
      return value;
    }

    // Resolve the maximum precision for the given value
    const precisionMax = `${ Math.abs(parseInt(numeric)) || '' }`.length - 1;

    // Resolve precision to a valid value, otherwise use 1
    precision = (
      isNatural(precision) && Math.max(MIN_PRECISION, Math.min(precision, precisionMax, MAX_PRECISION))
    ) || MIN_PRECISION;

    // Get the 10 exponent (e) of the number when expressed in scientific form
    const [, e = 0] = (+numeric).toPrecision(precision).match(/(?:e([+-]\d+))$/) || [];

    // Only format numbers >= 1000 (1e+3)
    // Return numeric value for smaller values
    if (e < 3) {
      return numeric;
    }

    // Resolve the exponent, modulo and thousands level
    const exponent = Math.abs(e);
    // const inversion = e / exponent;
    const modulo = exponent % 3;
    const level = Math.floor(exponent / 3);

    // Resolve decimal offsets for normalized number
    const precisionOffset = exponent + 1 - precision;
    const thousandsOffset = modulo + 1 - precision;

    // Resolve rounding function based on the rounding boolean argument
    // If the rounding argument is not a boolean, it defaults to false
    // Math.round() will be used if rounding is true
    // Otherwise Math.floor() will be used
    const round = boolOrFalse(rounding) ? Math.round : Math.floor;

    // Normalize the value using the resolved decimal offsets
    const normalized = round(+numeric / Math.pow(10, precisionOffset)) * Math.pow(10, thousandsOffset);

    // Join the normalized value with the level suffix
    // and return the suffix formatted numeric string
    return [
      +normalized.toFixed(precision),
      SUFFIXES[ level - 1 ]
    ].join('');

  }

  // Return value if it does not have a valid numerical representation
  return value;

}
