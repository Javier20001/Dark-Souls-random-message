function randomPositionFunction(listWords) {
  const randPosition = Math.floor(Math.random() * listWords.length);
  return randPosition;
}

function randomPositionCategory(randPosition, listWords) {
  const randPositionCategory = Math.floor(
    Math.random() * listWords[randPosition].length
  );
  return randPositionCategory;
}

module.exports = { randomPositionFunction, randomPositionCategory };
