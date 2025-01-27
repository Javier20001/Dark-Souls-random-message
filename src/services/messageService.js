const data = require("../data/dark_souls_messages.json");
const {
  randomPositionFunction,
  randomPositionCategory,
} = require("../utils/randomUtil");

// Cargar datos desde el JSON
const base = data.phrases.base;
const characters = data.phrases.categories.characters;
const objects = data.phrases.categories.objects;
const geography = data.phrases.categories.geography;
const actions = data.phrases.categories.actions;
const orientation = data.phrases.categories.orientation;
const body_part = data.phrases.categories.body_part;
const attribute = data.phrases.categories.attribute;
const concepts = data.phrases.categories.concepts;
const conjugation = data.phrases.categories.conjugation;

const listWords = [
  characters,
  objects,
  geography,
  actions,
  orientation,
  body_part,
  attribute,
  concepts,
];

function generateRandomMessage() {
  let rValue = base[Math.floor(Math.random() * base.length)];
  if (rValue.indexOf("****") !== -1) {
    let randPosition = randomPositionFunction(listWords);
    rValue = rValue.replace(
      "****",
      listWords[randPosition][randomPositionCategory(randPosition, listWords)]
    );
  }

  let boolean = Math.floor(Math.random() * 2);
  if (boolean === 1) {
    let randPosition = randomPositionFunction(listWords);
    rValue =
      rValue +
      " " +
      conjugation[Math.floor(Math.random() * conjugation.length)] +
      " " +
      listWords[randPosition][randomPositionCategory(randPosition, listWords)];
  }

  return rValue;
}

module.exports = { generateRandomMessage };
