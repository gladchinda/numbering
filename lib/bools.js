/**
 * Returns value if it is a boolean, otherwise returns true.
 * @param {any} value
 * @returns {boolean}
 */
const boolOrTrue = value => {
  return (typeof value !== 'boolean') || value;
}

/**
 * Returns value if it is a boolean, otherwise returns false.
 * @param {any} value
 * @returns {boolean}
 */
const boolOrFalse = value => {
  return (typeof value === 'boolean') && value;
}

// Export the module
module.exports = {
  boolOrTrue,
  boolOrFalse
};
