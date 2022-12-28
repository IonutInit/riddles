import { threshold } from "./threshold";



export const averageLetter = (word, synonymsString) => {
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
  
  return `The average letter is ${averageLetter}.`
}

export const approximateLengthHarder = (word, synonymsString) => {
  const dif = word.length - threshold(word.length)
  return `The solution is between ${word.length - dif} and ${word.length+dif} letters long.`
}


export const approximateLengthEasier = (word, synonymsString) => {
  const dif = word.length - threshold(word.length)
  return `The solution is between ${word.length - 1} and ${word.length +  1} letters long.`
}


export const approximateLengthEasiest = (word, synonymsString) => {
 return `The solution is ${word.length} letters long.`
}



export const randomLetter = (word, synonymsString) => {
  const rand = Math.floor(Math.random() * word.length)
  return `One of the letters is ${word[rand].toUpperCase()}.`
}


export const synonym = (word, synonymsString) => {
  let synonyms = synonymsString.split(',')
  const rand = Math.floor(Math.random() * synonyms.length)  
  
  return `Another word for it could be ${synonyms[rand].replace(' ', '')}.`
}


export const firstLetter = (word, synonymsString) => {
  return `The first letter of the solution is ${word[0].toUpperCase()}.`
}

export const endLetter = (word, synonymsString) => {
  return `The solution ends in ${word[word.length - 1].toUpperCase()}.`
}


// let hints = [
//   {
//       call: averageLetter,
//       status: null,
//       points: 0, //how many times has been played this turn
//       limit: 1, //how many times can be played by turn
//       lowerLimit: 1, //it is available each turn within the lower/upper limits of the game
//       upperLimit: 4, 
//       chance: 2, //the chance of it being called out of the summ of all chances 
//   },
//   {
//       call: approximateLengthHarder,
//       status: null,
//       points: 0,
//       limit: 1,
//       lowerLimit: 1,
//       upperLimit: 5, 
//       chance: 2,       
//   },
//   {
//       call: approximateLengthEasier,
//       status: null,
//       points: 0,
//       limit: 1,
//       lowerLimit: 6,
//       upperLimit: 10,
//       chance: 1,       
//   },
//   {
//       call: approximateLengthEasiest,
//       status: null,
//       points: 0,
//       limit: 1,
//       lowerLimit: 11,
//       upperLimit: 200,
//       chance: 1,        
//   },
//   {
//       call: randomLetter,
//       status: null,
//       points: 0,
//       limit: 3,
//       lowerLimit: 1,
//       upperLimit: 200, 
//       chance: 1,       
//   },
//   {
//       call: synonym,
//       status: null,
//       points: 0,
//       limit: 2,
//       lowerLimit: 1,
//       upperLimit: 200,
//       chance: 1,        
//   },
//   {
//       call: endLetter,
//       status: null,
//       points: 0,
//       limit: 1,
//       lowerLimit: 3,
//       upperLimit: 200,
//       chance: 1,        
//   },
//   {
//       call: firstLetter,
//       status: null,
//       points: 0,
//       limit: 1,
//       lowerLimit: 5,
//       upperLimit: 200, 
//       chance: 2,       
//   },
// ]




const getHints = (solution, synonymsString) => {
  
  //filters for optiions that are still within the game play and which haven't been yet called more than they are supposed to 
  hints.map(x => (x.lowerLimit < gameStatus && x.upperLimit > gameStatus) ? x.status = true : x.status = false)

  for (let i = 0; i < hints.length; i++) {
      if (hints[i].points >= hints[i].limit) {
          hints[i].status = false;
      }
  }

  //creates an array enumerating the viable options each of them times their chance
  let availableHints = hints.filter(x => x.status === true)

   for (let i = 0; i < availableHints.length; i++) {
      for(let j = 0; j < availableHints[i].chance; j++) {
          options.push(availableHints[i].call)
      }
  }

  //one of these instances is being called to provide the hint
  let rand = Math.floor(Math.random() * options.length)
  result.push(options[rand](solution, synonymsString))

  //it adds a point for the instance that has been called
  for (let i = 0; i < availableHints.length; i++) {
      if(availableHints[i].call.name === options[rand].name) {
          availableHints[i].points++
      }
  }

  //randomly adds one point to the chances of any instance that will still be played after the game reaches 5
  let upcomingHints = hints.filter(x => x.upperLimit > 5)
  rand = Math.floor(Math.random() * upcomingHints.length)
  upcomingHints[rand].chance++

  return hints
}