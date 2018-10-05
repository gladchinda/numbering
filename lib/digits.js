/**
 * Returns a single digit (between 0-9 both inclusive).
 * @returns {number}
 */
const digit = () => {
  return Math.floor(Math.random() * 10);
}

/**
 * Returns a single non-zero digit (between 1-9 both inclusive).
 * @returns {number}
 */
const nonzero = () => {
  return Math.ceil(Math.random() * 9);
}

// Export the module
module.exports = {
  digit,
  nonzero
};
