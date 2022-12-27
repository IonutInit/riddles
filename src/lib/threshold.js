//defines a theshold for similarity (e.g. 2 letters for a 3 letter word, 3 for 4, 4 for 6)
export function threshold(a) {
  return a < 5 ? a - 1 : a - 2;
}
