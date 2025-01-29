/**
 * Generates a random position within the bounds of the given list.
 *
 * @param {Array} listWords - The array of words from which to generate a random position.
 * @returns {number} A random index within the bounds of the listWords array.
 */
function randomPositionFunction(listWords) {
  const randPosition = Math.floor(Math.random() * listWords.length);
  return randPosition;
}

/**
 * Generates a random position category index based on the given random position and list of words.
 *
 * @param {number} randPosition - The random position index within the list of words.
 * @param {Array<Array<string>>} listWords - A two-dimensional array where each sub-array contains words.
 * @returns {number} - A random index within the sub-array at the given random position.
 */
function randomPositionCategory(randPosition, listWords) {
  const randPositionCategory = Math.floor(
    Math.random() * listWords[randPosition].length
  );
  return randPositionCategory;
}

module.exports = { randomPositionFunction, randomPositionCategory };
