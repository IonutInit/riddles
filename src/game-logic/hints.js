import {threshold} from './threshold'

export let averageLetterCounter = 0;
export let approximateLengthCounter = 0;

export const averageLetter = (word) => {
    const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
    const arr = []
    for (let i = 0; i < word.length; i++) {
        for (let j = 0; j < letters.length; j++) {
            if(word[i] === letters[j]) {
                arr.push(letters.indexOf(letters[j]) + 1)
            }
        }
    }
    const averageIndex = Math.round((arr.reduce((a, b) => a + b) - arr.length) / arr.length)
    const averageLetter = letters[averageIndex].toUpperCase()
    averageLetterCounter++
    return `The average letter is ${averageLetter}.`
}

// console.log(averageLetter('irina'))

export const approximateLength = (word) => {
    const dif = word.length - threshold(word.length)
    approximateLengthCounter++
    return `The solution is between ${word.length - dif} and ${word.length+dif} letters long.`
}

// console.log(approximateLength('hello'))

export const randomLetter = (word) => {
    const rand = Math.floor(Math.random() * word.length)
    return `One of the letters is ${word[rand].toUpperCase()}.`
}

// console.log(randomLetter('hello'))

export const synonym = (synonyms) => {
    const rand = Math.floor(Math.random() * synonyms.length)
    return `Another word for it might be ${synonyms[rand].trim()}.`
}

// console.log(synonym(['hello', 'this', 'that']))


//the array of available 
const hints = [averageLetter, approximateLength, randomLetter, synonym]

//array expressing the chances that each of the hints may appear
//in getHint one of these elements will be chosen at random then passed as the index of the 'hints' array of functions
const hintPool = [0, 0, 1, 1, 2, 3]

const getHint = (word) => {
    const hint = hintPool[Math.floor(Math.random() * hintPool.length)]
    console.log(hint)
    return hints[hintPool[hint]](word)
}

// console.log(getHint('hello'))




const arraySplicer = (element, array) => {
    const remove = array.splice(element, 1)
    return array
}


