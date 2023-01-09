//the original plan was to combine some sort of letter set similarity checker with letter positioning checker
//however, this may have been too much for the purpose of this app
//this function only compares the similarity of unique letters; its major drawback is that a scrambled word will return a positive

import { threshold } from "./threshold";

//comparing similarity of unique letters is emore suitable in our case than checking for similarity in letter position
//the major drawback is that a scrambled word will return a perfect positive
//however, integrating this with a letter similarity checker may be too much

export function checkSetSimilarity(input, keyword) {
  if (input.length === 0) {
    return null;
  }

  input = input.toLowerCase();

  if (input === keyword) {
    return true;
  }
  //creating arrays of unique letters
  const setInput = [];
  for (let i of input) {
    if (setInput.indexOf(i) == -1) {
      setInput.push(i);
    }
  }

  const setKeyword = [];
  for (let i of keyword) {
    if (setKeyword.indexOf(i) == -1) {
      setKeyword.push(i);
    }
  }

  //checking 'set' similarity
  let counter = 0;
  for (let i in setKeyword) {
    for (let j in setInput)
      if (setKeyword[i] == setInput[j]) {
        counter++;
      }
  }

  //also setting limits for the length of the input set (otherwise we might get positives for 'egdgdrety' and 'egg')
  const dif = keyword.length - threshold(keyword.length);
  let lengthOK = false;
  if (
    setInput.length + dif >= threshold(setKeyword.length) &&
    setInput.length - dif <= threshold(setKeyword.length)
  ) {
    lengthOK = true;
  }

  if (counter >= threshold(keyword.length) && lengthOK == true) {
    return 1;
  }
}

//repeating the process for synonyms, after removing the commas and creating an array from the synonyms string
export function checkSynonymSimilarity(input, synonyms) {
  synonyms = synonyms.replace(/,/g, "");
  let synonymArray = synonyms.split(" ");
  for (let synonym in synonymArray) {
    if (
      checkSetSimilarity(input, synonymArray[synonym]) === true ||
      checkSetSimilarity(input, synonymArray[synonym]) === 1
    ) {
      return 2;
    }
  }
}
