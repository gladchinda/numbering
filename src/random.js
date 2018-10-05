const { boolOrFalse } = require('../lib/bools');
const { digit, nonzero } = require('../lib/digits');
const { assertIsNatural } = require('../lib/types');

/**
 * Creates a random string of the given length containing only digits.
 * @param {int} length The length of the string.
 * @param {bool} nzFirst Flag that determines whether the sequence must start with non-zero digit.
 * @return {string} The generated string sequence containing only digits.
 * @throws {Error}
 */
module.exports = (length = 1, nzFirst = false) => {

  // Throw an error if length is not a valid integer greater than 0
  assertIsNatural(length, 'The length parameter must be an integer greater than 0.');

  // Resolve nzFirst to its boolean value and default to false for non-booleans
  const nzfirst = boolOrFalse(nzFirst);

  // Create a sequence of random digits of the given length
  // When `nzfirst` is true, the length of the sequence is less 1
  const random = [ ...Array(nzfirst ? length - 1 : length) ].map(digit).join('');

  // Return the random digits sequence
  // When `nzfirst` is true, a non-zero digit is prepended to the sequence
  return `${ nzfirst ? nonzero() : '' }${random}`;

}
