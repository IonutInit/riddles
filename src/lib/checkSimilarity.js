//the original plan was to combine some sort of letter set similarity checker with letter positioning checker
//however, this may have been too much for the purpose of this app
//this function only compares the similarity of unique letters; its major drawback is that a scrambled word will return a positive

import { threshold } from "./threshold";

export function checkSetSimilarity(input, keyword) {
  input.toLowerCase();
  if (input === keyword) {
    return "Correct";
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

  //checking set similarity
  let counter = 0;
  for (let i in setKeyword) {
    for (let j in setInput)
      if (setKeyword[i] == setInput[j]) {
        counter++;
      }
  }

  //also setting limits for the length of the input set (otherwise we might get positives for pairs like 'egdgdrety' and 'egg')
  const dif = keyword.length - threshold(keyword.length);
  let lengthOK = false;
  if (
    setInput.length + dif >= threshold(setKeyword.length) &&
    setInput.length - dif <= threshold(setKeyword.length)
  ) {
    lengthOK = true;
  }

  if (counter >= threshold(keyword.length) && lengthOK == true) {
    return "Getting there...";
  } else {
    return false;
  }
}

//same check but for an array of words, meant for the synonyms of the solution

export function checkSynonymSimilarity(input, synonyms) {
  for (let synonym in synonyms) {
    if (checkSetSimilarity(input, synonyms[synonym])) {
      return `Your direction is good, but your path walks alongside The Path of Riddles.`;
    }
  }
}
