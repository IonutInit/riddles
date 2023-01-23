import { threshold } from "./threshold";

let usedLetters = [];
const usedSynonyms = [];

// import { usedSynonyms } from "../pages/Game";

// import { hints } from "./hintStructure";
// let randLetterLimit = hints.filter(x => x.call.name === 'randomLetter')[0].limit

export const averageLetter = (word, synonymsString) => {
  const letters = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ];
  const arr = [];
  for (let i = 0; i < word.length; i++) {
    for (let j = 0; j < letters.length; j++) {
      if (word[i] === letters[j]) {
        arr.push(letters.indexOf(letters[j]) + 1);
      }
    }
  }
  const averageIndex = Math.round(
    (arr.reduce((a, b) => a + b) - arr.length) / arr.length
  );
  const averageLetter = letters[averageIndex].toUpperCase();

  return `The average letter is ${averageLetter}.`;
};

export const approximateLengthHarder = (word, synonymsString) => {
  const dif = word.length - threshold(word.length);
  return `The solution is between ${word.length - dif} and ${
    word.length + dif
  } letters long.`;
};

export const approximateLengthEasier = (word, synonymsString) => {
  const dif = word.length - threshold(word.length);
  return `The solution is between ${word.length - 1} and ${
    word.length + 1
  } letters long.`;
};

export const approximateLengthEasiest = (word, synonymsString) => {
  return `The solution is ${word.length} letters long.`;
};

//Example of random letters without duplication, but cannot handle uni-directional data flow
export const randomLetter = (word, synonymString) => {
  let [...letterSet] = new Set(word);
  //hardcoded randomLetter limit
  //the if statements is used to flush out the array of used letters if it's larger than the limit; combined with the limit itself, it can return the correct maximum number of results
  if (usedLetters.length >= 3) {
    usedLetters.splice(0, usedLetters.length);
  }
  let result;
  if (usedLetters.length === letterSet.length) {
    return "There are no more letters in this word."; //will not be used, as there aren't any two-letter solutions
  }
  do {
    result =
      letterSet[Math.floor(Math.random() * letterSet.length)].toUpperCase();
  } while (usedLetters.includes(result));
  usedLetters.push(result);
  return `One of the letters is ${result}.`;
};

// Example of synonyms without duplication, but cannot handle uni-directional data flow
export const synonym = (word, synonymString) => {
  const synonyms = synonymString.split(",");
  //hardcoded synonym limit
  //see randomLimit for explanation of the if statement
  if (usedSynonyms.length >= 2) {
    usedSynonyms.splice(0, usedSynonyms.length);
  }
  let result;
  if (usedSynonyms.length === synonyms.length) {
    return "Oops, it seems there are no more synonyms...";
  }
  do {
    result = synonyms[Math.floor(Math.random() * synonyms.length)].trim();
  } while (usedSynonyms.includes(result));
  usedSynonyms.push(result);
  return `Another word for it might be ${result}.`;
};

export const firstLetter = (word, synonymsString) => {
  return `The first letter of the solution is ${word[0].toUpperCase()}.`;
};

export const endLetter = (word, synonymsString) => {
  return `The solution ends in ${word[word.length - 1].toUpperCase()}.`;
};
