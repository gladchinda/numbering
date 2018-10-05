const { nonzero } = require('../lib/digits');
const { assertIsNatural } = require('../lib/types');

/**
 * Creates a random string of the given length containing only digits.
 * 
 * @param {number} length The length of the string.
 * 
 * @return {string} The generated string containing only digits.
 * 
 * @throws {Error}
 */
module.exports = (length = 1) => {

  // Throw an error if length is not a valid integer greater than 0
  assertIsNatural(length, 'The length parameter must be an integer greater than 0.');

  // Return the random digits sequence of the given length
  return [ ...Array(length) ].map(nonzero).join('');

}
