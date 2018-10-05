const { assertIsNumber, assertIsWhole } = require('../lib/types');

/**
 * Returns a number that represents the percentage equivalent of the specified number.
 * 
 * For example:
 * 
 * percentage(0.53) => 53
 * percentage(0.00349, 2) => 0.35
 * percentage(34.56781, 2) => 3456.78
 * 
 * @param {number} value The finite number to be represented as a percentage
 * @param {number} precision The precision of the resulting percentage
 * 
 * @returns {number} The percentage equivalent of the original number
 * 
 * @throws {Error}
 */
module.exports = (value, precision = 0) => {

  // Throw error if value is not a finite number
  assertIsNumber(value, 'Expects a finite number as first argument.');

  // Throw error if precision is not a whole number
  assertIsWhole(precision, 'Expects 0 or a positive whole number as second argument.');

  // Return the percentage equivalent with the given precision
  return +(value * 100).toFixed(precision);

}
