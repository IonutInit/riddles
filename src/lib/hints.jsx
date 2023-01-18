import { threshold } from "./threshold";

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

export const randomLetter = (word, synonymsString) => {
  const rand = Math.floor(Math.random() * word.length);
  return `One of the letters is ${word[rand].toUpperCase()}.`;
};

//Example of random letters without duplication, but cannot handle uni-directional data flow
// let usedLetters = [];
// const randomLetter = (word) => {
//     let [...letterSet] = new Set(word);
//     let result;
//     if (usedLetters.length === letterSet.length) {
//         return 'No more letters.'
//     }
//     do {
//         result = letterSet[Math.floor(Math.random() * letterSet.length)].toUpperCase()
//     } while (usedLetters.includes(result))
//     usedLetters.push(result)
//     return `One of the letters is ${result}.`
// }

export const synonym = (word, synonymsString) => {
  let synonyms = synonymsString.split(",");
  const rand = Math.floor(Math.random() * synonyms.length);

  return `Another word for it could be ${synonyms[rand].replace(" ", "")}.`;
};

//Example of synonyms without duplication, but cannot handle uni-directional data flow
// let usedSynonymsArray = []
// const synonym = (synonymString, usedSynonyms) => {
//     usedSynonyms = usedSynonymsArray
//     const synonyms = synonymString.split(',');
//     let result;
//     if (usedSynonyms.length === synonyms.length) {
//         return 'No more synonyms.'
//     }
//     do {
//         result = synonyms[Math.floor(Math.random() * synonyms.length)].trim()
//     } while (usedSynonyms.includes(result));
//     usedSynonyms.push(result)
//     console.log(usedSynonymsArray)
//     return `Another word for it might be ${result}.`
// }

export const firstLetter = (word, synonymsString) => {
  return `The first letter of the solution is ${word[0].toUpperCase()}.`;
};

export const endLetter = (word, synonymsString) => {
  return `The solution ends in ${word[word.length - 1].toUpperCase()}.`;
};

