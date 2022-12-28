import {
    averageLetter, 
    approximateLengthHarder, 
    approximateLengthEasier, 
    approximateLengthEasiest, 
    randomLetter, 
    synonym, 
    firstLetter, 
    endLetter  
  } from "./hints";


export let hints = [
    {
        call: averageLetter,
        status: null,
        points: 0, //how many times has been played this turn
        limit: 1, //how many times can be played by turn
        lowerLimit: 1, //it is available each turn within the lower/upper limits of the game
        upperLimit: 4, 
        chance: 2, //the chance of it being called out of the summ of all chances 
    },
    {
        call: approximateLengthHarder,
        status: null,
        points: 0,
        limit: 1,
        lowerLimit: 1,
        upperLimit: 5, 
        chance: 2,       
    },
    {
        call: approximateLengthEasier,
        status: null,
        points: 0,
        limit: 1,
        lowerLimit: 6,
        upperLimit: 10,
        chance: 1,       
    },
    {
        call: approximateLengthEasiest,
        status: null,
        points: 0,
        limit: 1,
        lowerLimit: 11,
        upperLimit: 200,
        chance: 1,        
    },
    {
        call: randomLetter,
        status: null,
        points: 0,
        limit: 3,
        lowerLimit: 1,
        upperLimit: 200, 
        chance: 1,       
    },
    {
        call: synonym,
        status: null,
        points: 0,
        limit: 2,
        lowerLimit: 1,
        upperLimit: 200,
        chance: 1,        
    },
    {
        call: endLetter,
        status: null,
        points: 0,
        limit: 1,
        lowerLimit: 3,
        upperLimit: 200,
        chance: 1,        
    },
    {
        call: firstLetter,
        status: null,
        points: 0,
        limit: 1,
        lowerLimit: 5,
        upperLimit: 200, 
        chance: 2,       
    },
  ]