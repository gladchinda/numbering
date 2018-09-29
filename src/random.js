/**
 * Creates a random string of the given length containing only digits.
 * @param {int} length The length of the string.
 * @return {string} The generated string containing only digits.
 */
export default (length = 1) => {
  if (!(Number.isInteger(length) && length > 0)) {
    throw new Error('The length parameter must be an integer greater than 0.');
  }

  return [...Array(length)]
    .map(() => Math.floor(Math.random() * 10))
    .join('');
}
