/**
 * Creates a random string of the given length containing only digits.
 * @param {int} length The length of the string.
 * @return {string} The generated string containing only digits.
 */
const random = (length = 1, nzFirst = false) => {

  // Throw an error if length is not a valid integer greater than 0
  if (!(Number.isInteger(length) && length > 0)) {
    throw new Error('The length parameter must be an integer greater than 0.');
  }

  // Resolve nzFirst to its boolean value and default to false for non-booleans
  const nzfirst = (typeof nzFirst === 'boolean') && nzFirst;

  // Create a sequence of random digits of the given length
  // When `nzfirst` is true, the length of the sequence is less 1
  const random = [ ...Array(nzfirst ? length - 1 : length) ]
    .map(() => Math.floor(Math.random() * 10))
    .join('');

  // Return the random digits sequence
  // When `nzfirst` is true, a non-zero digit is prepended to the sequence
  return `${nzfirst ? Math.ceil(Math.random() * 9) : ''}${random}`;
  
}

module.exports = random;
