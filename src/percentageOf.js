const { assertIsNumber, assertIsWhole } = require('../lib/types');

/**
 * Returns a number that represents the percentage equivalent of a specified finite number
 * against another finite number.
 * 
 * For example:
 * 
 * percentageOf(100, 53.75) => 54
 * percentageOf(450, 150, 1) => 33.3
 * percentageOf(18, 2400, 2) => 13333.33
 *
 * @param {number} baseValue The finite number to be used as the base number
 * @param {number} value The finite number to be represented as a percentage
 * @param {number} precision The precision of the resulting percentage
 * 
 * @returns {number} The percentage equivalent of the original number
 * 
 * @throws {Error}
 */
module.exports = (baseValue, value, precision = 0) => {

  // Throw error if baseValue is not a finite number
  assertIsNumber(baseValue, 'Expects a finite number as first argument.');

  // Throw error if value is not a finite number
  assertIsNumber(value, 'Expects a finite number as second argument.');

  // Throw error if precision is not a whole number
  assertIsWhole(precision, 'Expects 0 or a positive whole number as third argument.');

  // Return the percentage equivalent with the given precision
  return +(value / baseValue * 100).toFixed(precision);

}
