//////////////////////  HARMONIC STRUCTURE OBJECTS //////////////////////

let c = console

/**
 * Theses objects create harmonic structures using Array indexes starting at index 1
 * The diatonic form uses a 7 note Array, the chromatic form uses a 12 note Array
 */
const diatonicStructuresIndexedObj = {
  majorHepta: [1,2,3,4,5,6,7],
  majorPenta: [1,2,3,5,6],
  minorPenta: [1,3,4,5,7],
  triad: [1,3,5],
  seventhChord: [1,3,5,7]
}

const chromaticStructuresIndexedObj = {
  majorHepta: [1,3,5,6,8,10,12],
  majorPenta: [1,3,5,8,10],
  minorPenta: [1,4,6,8,11],
  majorTriad: [1,5,8],
  majorSeventhChord: [1,5,8,12],
  minorTriad: [1,4,8],
  minorSeventhChord: [1,4,8,11],
  dominantSeventhChord: [1,5,8,11],
  dimTriad: [1,4,7],
  minor7flat5: [1,4,7,11],
  augTriad: [1,5,9],
  wholeTone: [1,3,5,7,9,11],
  halfWhole: [1,2,4,5,7,8,10,11]
}


/**
 * These objects create harmonic structures using the intervalic leaps
 * A leap of 1 is the same as a halfstep (ie: 1 == minor second)
 * The diatonic form uses a 7 note Array, the chromatic form uses a 12 note Array
 */
const diatonicStructuresIntervalicObj = {
  majorHepta: [0,1,1,1,1,1,1],
  majorPenta: [0,1,1,2,1],
  minorPenta: [0,2,1,1,2],
  triad: [0,2,2],
  seventhChord: [0,2,2,2]
}

const chromaticStructuresIntervalicObj = {
  majorHepta: [0,2,2,1,2,2,2], //convertScaleStepPatternToNum(["w","w","h","w","w","w","h"]), //[0,2,2,1,2,2,2] wwhwwwh
  dorianHepta: restructureModalPattern(2),
  phrygianHepta: restructureModalPattern(3),
  lydianHepta: restructureModalPattern(4),
  mixolydianHepta: restructureModalPattern(5),
  aeolianHepta: restructureModalPattern(6),
  locrianHepta: restructureModalPattern(7),
  melMinorHepta: [0,2,1,2,2,2,2],
  melMinorHeptaMode2: restructureModalPattern(2,["W","H","W","W","W","W"]),
  melMinorHeptaMode3: restructureModalPattern(3,["W","H","W","W","W","W"]),
  melMinorHeptaMode4: restructureModalPattern(4,["W","H","W","W","W","W"]),
  melMinorHeptaMode5: restructureModalPattern(5,["W","H","W","W","W","W"]),
  melMinorHeptaMode6: restructureModalPattern(6,["W","H","W","W","W","W"]),
  melMinorHeptaMode7: restructureModalPattern(7,["W","H","W","W","W","W"]),
  harmMinorHepta: [0,2,1,2,2,1,3],
  harmMinorHeptaMode2: restructureModalPattern(2,["W","H","W","W","W","3H"]),
  harmMinorHeptaMode3: restructureModalPattern(3,["W","H","W","W","W","3H"]),
  harmMinorHeptaMode4: restructureModalPattern(4,["W","H","W","W","W","3H"]),
  harmMinorHeptaMode5: restructureModalPattern(5,["W","H","W","W","W","3H"]),
  harmMinorHeptaMode6: restructureModalPattern(6,["W","H","W","W","W","3H"]),
  harmMinorHeptaMode7: restructureModalPattern(7,["W","H","W","W","W","3H"]),
  majorPenta: [0,2,2,3,2],
  minorPenta: [0,3,2,2,3],
  majorTriad: [0,4,3],
  majorSeventhChord: [1,4,3,4],
  minorTriad: [0,3,4],
  minorSeventhChord: [0,3,4,3],
  domSeventhChord: [0,4,3,3],
  dimTriad: [0,3,3],
  minor7flat5: [0,3,3,4],
  augTriad: [0,4,4],
  wholeTone: [0,2,2,2,2,2],
  halfWhole: [0,1,2,1,2,1,2,1]
}


//////////////////////  UTILITY FUNCTIONS  //////////////////////

/**
 * Choose Random Index function:
 * @param {Array} array The list of items to choose from.
 * @returns A random index within the array
 */
function chooseRandomIndex(array) {
  let randomIndex = Math.floor(Math.random() * array.length)
  return randomIndex
}

/**
 * Remove From Array function:
 * @param {*} elem The element in the array to remove.
 * @param {Array} array The parent array.
 */
function removeFromArray(elem, array) {
  array.splice(array.indexOf(elem), 1)
}

/**
 * Remove Children Divs function:
 * @param {HTMLDivElement} parent The parent div element to remove all children from.
 */
function removeChildrenDivs(parent) {
  while (parent.firstChild) {
    parent.firstChild.remove()
  }
}

function customDatasetSort(array, parameter) {
  let sortedArray = Array.from(array).sort((a,b) => {
    if (b.dataset[parameter] > a.dataset[parameter]) {
      return -1
    }
    else if (b.dataset[parameter] < a.dataset[parameter]) {
      return 1
    }
    return 0;   
    }
  )

  return sortedArray
}



//////////////////////  DECK FUNCTIONS  //////////////////////

/**
 * Build Music Deck function:
 * @param {Array} scale The array of notes to choose from.
 * @param {number} octaves The total number of octaves.
 * @returns An array of objects containing the two key values: note in array, octave number
 */
function buildMusicDeck(scale, octaves) {
  let musicDeck = [];

  for (let i = 0; i < octaves; i++) {
    scale.forEach((elem) => {
      //console.log(elem)
      musicDeck.push({
        note: elem, 
        octave: i + 1
      })
    })
  }

  console.log(musicDeck)
  return musicDeck
}



//////////////////////  CHROMATIC SCALE HELPER FUNCTIONS  //////////////////////


/**
 * Build Chromatic Scale Enharmonic function:
 * @returns An Array of 12 enharmonic chromatic notes starting with C
 */
function buildChromaticScaleEnharmonic() {
  let alphabet = "CDEFGAB";
  let chromaticScale = [];
  for (let i = 0; i < alphabet.length; i++) {
    switch (i) {
      case (2): //E and Fb
      case (6): //B and Cb
        chromaticScale.push(`${alphabet[i]}/${alphabet[(i+ 1)%alphabet.length]}b`);
        break;
      default:
        chromaticScale.push(alphabet[i]);
        chromaticScale.push(`${alphabet[i]}#/${alphabet[i+1]}b`);
        break;
    }
  }
  return chromaticScale;
}

/**
 * Build Chromatic Scale Not Enharmonic function:
 * @returns An Array of chromatic notes seperated by each unique accidental (ie: C# and Db seperated)
 */
function buildChromaticScaleSeperatedNames() {
  let allNotes = []
  let chromatic = buildChromaticScaleEnharmonic()
  for (let i = 0; i < chromatic.length; i++) {
    let noteName = chromatic[i]
    let splitNotes = noteName.split("/")
    splitNotes.forEach((item) => {allNotes.push(item) })
  }
  return allNotes;
}


//////////////////////  MUSIC SCALES FUNCTIONS  //////////////////////


/**
 * Build Interval Cycle function:
 * @param {number} interval Interval distance in halfsteps between notes (Perfect 5th == 7 steps)
 * @param {number} numLeaps Total number of leaps. (7 for all keys)
 * @param {Array} scale List of notes in scale
 * @param {number} startingIndex Index of first note in cycle
 * @returns An Array with each note in the musical cycle
 */
function buildIntervalCycle(interval, numLeaps = 7, scale, startingIndex = 0) {
  let cycleArray = [];
  for (let i = 0; i <= numLeaps; i++) {
    cycleArray.push(scale[(startingIndex + interval * i) % scale.length])
  }
  return cycleArray
}

/**
 * Sanitize Accidentals function:
 * @param {char} accidental Either sharp or flat symbol (#/b)
 * @param {Array} scale List of notes in scale
 * @returns An sanitized Array of unified accidentals
 */
function sanitizeAccidentals(accidental, scale) {
  let sanitizedScale = []

  scale.forEach((elem) => {
    let currentNote = elem.split("/")
    if (currentNote.length == 1) {
      sanitizedScale.push(currentNote[0])
    }
    else {
      if (accidental == "#") {
        sanitizedScale.push(currentNote[0])
      }
      else {
        sanitizedScale.push(currentNote[1])
      }
    }
  })
  return sanitizedScale
}

/**Create Circle of Fifths function:
 * This creates two interval cycles, in fourths and fifths.
 * It then sanitizes the accidentals to show only the correct one.
 * @returns An array containing the list of Flat keys and Sharp Keys
 */
function buildCircleOfFifths() {
  let flatKeys = buildIntervalCycle(5, 7, buildChromaticScaleEnharmonic())
  let sharpKeys = buildIntervalCycle(7, 7, buildChromaticScaleEnharmonic())

  flatKeys = sanitizeAccidentals("b", flatKeys)
  sharpKeys = sanitizeAccidentals("#", sharpKeys)

  //return flatKeys.concat(sharpKeys.slice(1))
  return [flatKeys, sharpKeys]
}


/**
 * Find Unified Accidental function:
 * @param {string} key The name of the key (ie: Bb)
 * @returns An object that identifies the correct accidental of key and the corresponding circle of fifths/fourths
 */
function findUnifiedAccidental(key) {
  key = key.charAt(0).toUpperCase() + key.substring(1)
  if (key != "C") {
    let circleOfFifths = buildCircleOfFifths()
    if (circleOfFifths[0].includes(key)) {
      return {accidental: "b", cycle: circleOfFifths[0]}
    }
    else if (circleOfFifths[1].includes(key))  {
      return {accidental: "#", cycle: circleOfFifths[1]}
    }
    else {
      console.log("ERROR! Key doesn't exist");
      //throw error
      return "error";
    }
  }
  else {
    return {accidental: "none", cycle: ["C", "D", "E", "F", "G", "A", "B"]};
  }
}


/**
 * Get Accidentals In Key Sig function:
 * @param {number} keySignatureNum Number of accidentals in key signature (ie: 1 for the key of F)
 * @param {char} accidental Either sharp or flat symbol (#/b)
 * @returns An Array with the notes of each accidental in the key signature
 */
function getAccidentalsInKeySig(keySignatureNum, accidental) {
  let scale = ["C", "D", "E", "F", "G", "A", "B"];
  if (accidental == "#") {
    return buildIntervalCycle(4, keySignatureNum, scale, scale.indexOf("F"))
  }
  else {
    return buildIntervalCycle(3, keySignatureNum, scale, scale.indexOf("B"))
  }
}

/**
 * Build Major Scale function:
 * @param {string} key The name of the key (ie: Bb)
 * @returns An Array of notes in a major key with the correct accidentals
 */
function buildMajorScale(key) {
  let majorScale = []
  let scale = ["C", "D", "E", "F", "G", "A", "B"];
  let indexOfKey = scale.indexOf(key[0])
  let currentKeyNoAccidental = scale.slice(indexOfKey).concat(scale.slice(0, indexOfKey))
  let accidentalObj = findUnifiedAccidental(key)
  if (accidentalObj != "error") {
    let keySignature = accidentalObj.cycle.indexOf(key) - 1
    let accidentalList = getAccidentalsInKeySig(keySignature, accidentalObj.accidental);
    for (let i = 0; i < 7; i++) {
      let currentNote = currentKeyNoAccidental[i]
      accidentalList.forEach((elem) => {
        if (elem == currentKeyNoAccidental[i] && accidentalObj.accidental != "none" ) {
          currentNote += accidentalObj.accidental
        }
      })
      majorScale.push(currentNote)
    }
    return majorScale
  }
  else {
    //throw error
    return "error"
  }
}


/**
 * Build Modal Scale function:
 * @param {Array} majorScale An Array of the parent major (ionian) scale
 * @param {num} modeNum The number of the mode to be built
 * @returns An Array of the notes of the chosed modal scale
 */
function buildModalScale(majorScale, modeNum) {
  return majorScale.slice(modeNum - 1).concat(majorScale.slice(0, modeNum - 1))
}



//////////////////////  SCALE RESTRUCTURE FUNCTIONS  //////////////////////

/**
 * Convert Scale Step Pattern To Num function:
 * @param {Array} pattern An Array of the scale pattern in Whole steps and Halfsteps (ie: WWHWWWH)
 * @returns A new array converted into index leaps.
 */
function convertScaleStepPatternToNum(pattern) {
  let numberPattern = [0];
  pattern.forEach((elem) => {
    if (elem.toUpperCase() == "W") {
      numberPattern.push(2)
    }
    else if (elem.toUpperCase() == "H") {
      numberPattern.push(1)
    }
    else {
      numberPattern.push(3)
    }
  })
  return numberPattern;

}

/**
 * Restructure Modal Pattern function:
 * @param {number} modeNum The index of the new starting note
 * @param {Array} pattern An Array of the pattern in Whole steps and Halfsteps
 * @returns A new array converted into index leaps.
 */
function restructureModalPattern(modeNum, pattern = ["w","w","h","w","w","w","h"]) {
  return convertScaleStepPatternToNum(buildModalScale(pattern, modeNum))
}


/**
 * Find Note Index function:
 * @param {string} noteName The letter name of note to find in scale
 * @param {Array} scale An array of notes
 * @returns The index of the chosen note in the scale
 */
function findNoteIndex(noteName, scale = buildChromaticScaleEnharmonic()) {
  for (let i = 0; i < scale.length; i++) {
    if (noteName.toUpperCase() == scale[i].toUpperCase()) {
      return i
    }
    let currentElem = scale[i].split("/");
    if (currentElem[0].toUpperCase() == noteName.toUpperCase() || currentElem[1] != undefined && currentElem[1].toUpperCase() == noteName.toUpperCase()) {
      return i
    }
  }

  return "error"
}


//////////////////////  HARMONIC STRUCTURES BUILD FUNCTIONS  //////////////////////

/**
 * Create Diatonic Structure function:
 * @param {string} startNote A name of the note to start the structure
 * @param {Array} scale An Array of the scale of notes to build with
 * @param {string} structure The name of the structure
 * @returns An Array of notes in the chosen structure
 */
function createDiatonicStructure(startNote, scale, structure) {
  let pattern = diatonicStructuresIntervalicObj[structure]
  let startIndex = scale.indexOf(startNote)
  let diatonicStructure = []
  pattern.forEach((elem) => {
    startIndex += elem
    diatonicStructure.push(scale[startIndex % scale.length])
  })
  return diatonicStructure
}


/**
 * Create Harmonic Structure function:
 * @param {string} startNote A name of the note to start the structure
 * @param {string} structure The name of the structure
 * @returns An Array of notes in the chosen structure
 */
function createHarmonicStructure(startNote, structure, scale = buildChromaticScaleEnharmonic()) {
  let noteIndex = findNoteIndex(startNote, scale)
  if (noteIndex != "error") {
    let pattern = chromaticStructuresIntervalicObj[structure] 
    let harmonicStructure = []
    pattern.forEach((elem) => {
      noteIndex += elem
      harmonicStructure.push(scale[noteIndex % scale.length])
    })
    return harmonicStructure
  }
}


/**
 * Build Major Scale Obj function:
 * @param {string} key The name of the key (ie: Bb)
 * @returns An nested object with root, mode and chord for each scale degree
 */
function buildMajorScaleObj(key) {
  let scale = buildMajorScale(key)
  if (scale != "error") {
    let scaleObj = { 
      ionian: {num: 1, root: scale[0], scale: scale, chord: createDiatonicStructure(0, scale, "seventhChord")  },
      dorian: {num: 2, root: scale[1], scale: buildModalScale(scale, 2), chord: createDiatonicStructure(1, scale, "seventhChord") },
      phrygian: {num: 3, root: scale[2], scale: buildModalScale(scale, 3), chord: createDiatonicStructure(2, scale, "seventhChord") },
      lydian: {num: 4, root: scale[3], scale: buildModalScale(scale, 4), chord: createDiatonicStructure(3, scale, "seventhChord") },
      mixolydian: {num: 5, root: scale[4], scale: buildModalScale(scale, 5), chord: createDiatonicStructure(4, scale, "seventhChord") },
      aeolian: {num: 6, root: scale[5], scale: buildModalScale(scale, 6), chord: createDiatonicStructure(5, scale, "seventhChord") },
      locrian: {num: 7, root: scale[6], scale: buildModalScale(scale, 7), chord: createDiatonicStructure(6, scale, "seventhChord") },
    }
    return scaleObj
  }
  else {
    //throw error
    return "error"
  }
}


/**
 * Build Generic Scale Obj function:
 * @param {Array} scale An Array of the scale of notes
 * @returns An nested object with root, mode and chord for each scale degree
 */
function buildGenericScaleObj(scale) {
  if (scale != "error") {
    let scaleObj = { 
      mode1: {num: 1, root: scale[0], scale: scale, chord: createDiatonicStructure(0, scale, "seventhChord")  },
      mode2: {num: 2, root: scale[1], scale: buildModalScale(scale, 2), chord: createDiatonicStructure(1, scale, "seventhChord") },
      mode3: {num: 3, root: scale[2], scale: buildModalScale(scale, 3), chord: createDiatonicStructure(2, scale, "seventhChord") },
      mode4: {num: 4, root: scale[3], scale: buildModalScale(scale, 4), chord: createDiatonicStructure(3, scale, "seventhChord") },
      mode5: {num: 5, root: scale[4], scale: buildModalScale(scale, 5), chord: createDiatonicStructure(4, scale, "seventhChord") },
      mode6: {num: 6, root: scale[5], scale: buildModalScale(scale, 6), chord: createDiatonicStructure(5, scale, "seventhChord") },
      mode7: {num: 7, root: scale[6], scale: buildModalScale(scale, 7), chord: createDiatonicStructure(6, scale, "seventhChord") },
    }
    return scaleObj
  }
  else {
    //throw error
    return "error"
  }
}


/**
 * Build Generic Scale Obj With Callback function:
 * @param {string} key The name of the key (ie: Bb)
 * @param {function} scaleCallback Callback function to build scale
 * @returns An nested object with root, mode and chord for each scale degree
 */
function buildGenericScaleObjWithCallback(key, scaleCallback) {
  let scale = scaleCallback(key)
  if (scale != "error") {
    let scaleObj = { 
      mode1: {num: 1, root: scale[0], scale: scale, chord: createDiatonicStructure(0, scale, "seventhChord")  },
      mode2: {num: 2, root: scale[1], scale: buildModalScale(scale, 2), chord: createDiatonicStructure(1, scale, "seventhChord") },
      mode3: {num: 3, root: scale[2], scale: buildModalScale(scale, 3), chord: createDiatonicStructure(2, scale, "seventhChord") },
      mode4: {num: 4, root: scale[3], scale: buildModalScale(scale, 4), chord: createDiatonicStructure(3, scale, "seventhChord") },
      mode5: {num: 5, root: scale[4], scale: buildModalScale(scale, 5), chord: createDiatonicStructure(4, scale, "seventhChord") },
      mode6: {num: 6, root: scale[5], scale: buildModalScale(scale, 6), chord: createDiatonicStructure(5, scale, "seventhChord") },
      mode7: {num: 7, root: scale[6], scale: buildModalScale(scale, 7), chord: createDiatonicStructure(6, scale, "seventhChord") },
    }
    return scaleObj
  }
  else {
    //throw error
    return "error"
  }
}




//////////////////////  CREATE CARD FUNCTIONS  //////////////////////

/**
 * Create Card function:
 * @param {string} cardRank The card rank.
 * @param {Number} cardOctave The card octave.
 * @returns A card div element with front, back and labels.
 */
function createCard(cardRank, cardOctave) {
  const frontOfCard = document.createElement('div')
  const backOfCard = document.createElement('div')
  frontOfCard.classList.add('frontCard')
  frontOfCard.classList.add('hide')
  backOfCard.classList.add('backCard')
  backOfCard.classList.add('show')
  const labelFrame = document.createElement('div')
  labelFrame.classList.add('labelFrame')
  createCardLabel('center', frontOfCard, labelFrame, cardRank)
  createCardLabel('top', frontOfCard, labelFrame, cardOctave)
  createCardLabel('bottom', frontOfCard, labelFrame, cardOctave)
  const cardDiv = document.createElement('div')
  cardDiv.appendChild(frontOfCard)
  cardDiv.appendChild(backOfCard)
  cardDiv.classList.add('cardDiv')
  cardDiv.dataset.rank = cardRank
  cardDiv.dataset.octave = cardOctave
  cardDiv.classList.add(`${cardRank}${cardOctave}`)
  cardDiv.dataset.selected = "false";

  return cardDiv;
}

/**
 * Create Card Label function:
 * @param {string} className The class of the card labels position. (ie: Top)
 * @param {HTMLDivElement} frontDiv The parent div for the label frame.
 * @param {HTMLDivElement} labelFrame The parent div for the label.
 * @param {string} txtContent The text for the label. 
 */
function createCardLabel(className, frontDiv, labelFrame, txtContent)  {
  const labelDiv = document.createElement('div')
  const label = document.createElement('p')
  label.classList.add('cardLabel')
  label.innerHTML = txtContent
  labelDiv.classList.add('labelDiv')
  labelDiv.classList.add(className)
  labelDiv.appendChild(label)
  labelFrame.appendChild(labelDiv)
  frontDiv.appendChild(labelFrame)
}


//////////////////////  FLIP CARD FUNCTIONS  //////////////////////

/**
 * Show Hide function:
 * @param {HTMLBodyElement} elem The element to be shown or hidden.
 */
function showHide(elem) {
  elem.classList.toggle("show");
  elem.classList.toggle("hide")
      /**
      if (elem.classList.contains('show')) {
        elem.classList.remove('show')
        elem.classList.add('hide')
      }
      else {
        elem.classList.remove('hide')
        elem.classList.add('show')
      }
      */
}

/**
 * Flip Card function:
 * @param {HTMLDivElement} card The parent card div.
 * @param {boolean} animateBool A bool to tell whether card shoul already be flipped.
 */
function flipCard(card, animateBool) {
  let front = card.querySelector('.frontCard')
  let back = card.querySelector('.backCard')
  if (animateBool) {
        //card.classList.contains('flip') ? card.classList.remove('flip') :  card.classList.add('flip')
    card.classList.toggle("flip")
    setTimeout(() => {
      showHide(front)
      showHide(back)
    }, 150) //1second 300
  }
  else {
    front.style.transform = "rotate(180deg)"
    showHide(front)
    showHide(back) 
  }
}


//////////////////////  CARD HELPER FUNCTIONS  //////////////////////

/**
 * Count Cards function
 * @param {HTMLDivElement} parent The parent div containing the cards.
 * @returns The length of an array of all the cardDiv elements counted inside parent.
 */
function countCards(parent) {
  return parent.querySelectorAll(".cardDiv").length
}


/**
 * Add Card To Hand function:
 * @param {HTMLDivElement} parent The target parent div to add card.
 * @param {Array} currentDeck The current list of available cards in the deck.
 */
function addCardToHand(parent, currentDeck) {
  let randIndex = chooseRandomIndex(currentDeck)
  let currentCard = createCard(currentDeck[randIndex].note,currentDeck[randIndex].octave )
  parent.appendChild(currentCard)
  currentCard.addEventListener("click", (e) => {
    if (selectedCards.length < 7) {
      e.target.dataset.selected == "false" ? selectedCards.push(e.target) : removeFromArray(e.target, selectedCards)
      e.target.dataset.selected == "false" ? e.target.dataset.selected = "true" : e.target.dataset.selected = "false"
      e.target.classList.toggle("selectedCard")
    } 
  })
  removeFromArray(currentDeck[randIndex], currentDeck)
  playerHand.push(currentCard)
  setTimeout(() => {
    flipCard(currentCard, true)
  }, 100)
  currentCard.addEventListener("transitionend", (e) => {
    e.target.style.pointerEvents = "all"
  })
}



/**
 * Resize Card function:
 * @param {HTMLDivElement} card The card div to be resized.
 * @param {number} numCards The total number of cards in the parent div.
 * @param {number} index The position of the card div element in the parent.
 */
function resizeCard(card, numCards, index) {
  card.style.left = `${index * card.offsetWidth * .75}px`   //set card x coordinate with about 25% crossover
  card.style.zIndex = index+999
  if (numCards > 8) { //check if total cards is too big and needs full resize
    card.style.width = `${100 / numCards}%`
    card.style.height = `${card.offsetWidth * 1.5}px`
    card.style.left = `${index * card.offsetWidth - (card.offsetWidth * .25) }px` //resest card x coordinate with .15% crossover
    //make card a little bigger
    card.style.width = `${card.offsetWidth * 1.25}px`
    card.style.height = `${card.offsetWidth * 1.5}px`
    //card.querySelector(".center").style.fontSize = "1.2rem"
  }
}



/**
 * Resize Hand function:
 * @param {HTMLDivElement} parent The parent div where cards are located.
 */
function resizeHand(parent, handList = parent.querySelectorAll(".cardDiv")) {
  let numCards = countCards(parent)
  handList.forEach((card, index) => {
    resizeCard(card,numCards,index)
  })
}


/**
 * Fill Hand function:
 * @param {HTMLDivElement} parent The target parent div.
 * @param {number} max The maximum number of cards in hand.
 * @param {Array} currentDeck The array of available cards in hand.
 */
function fillHand(parent, max, gameObj) {
  let currentHandSize = countCards(parent)
  while (currentHandSize < max) {
    addCardToHand(parent, gameObj.deck)
    currentHandSize++
  }

  //resizeHand(parent, sortHandByOctave(sortHandByRank(parent.querySelectorAll(".cardDiv"), gameObj) ))
  //resizeHand(parent, sortHandByRank(sortHandByOctave(parent.querySelectorAll(".cardDiv")), gameObj))
  resizeHand(parent, parent.querySelectorAll(".cardDiv"))
}


function sortHandByRank(array, gameObj) {
  let sortedArray = customDatasetSort(array, "rank")
  let startingIndex = null
  let firstNote = 0

  while (startingIndex == null) {
    for (let i = 0; i < sortedArray.length; i++ ) {
      if (sortedArray[i].dataset.rank ==  gameObj.scale[firstNote]) {
        startingIndex = i
        break;
      }
    }
    firstNote++
  }
  return sortedArray.slice(startingIndex).concat(sortedArray.slice(0, startingIndex))
}


function sortHandByOctave(array) {
  let sortedArray = customDatasetSort(array, "octave")
  return sortedArray
}


function getRidOfDuplicateCards2(cardDivArray, gameObj) {
  let sanitizedArray = []
  consolidateOcaves(cardDivArray, gameObj.scale).map((x) => {
    if (x[1].length > 0) {
      sanitizedArray.push( x[0])
    }
  })

  return sanitizedArray
}

function getRidOfDuplicateCards(octaveArray, gameObj) {
  let sanitizedArray = []
  octaveArray.map((x) => {
    if (x[1] > 0) {
      sanitizedArray.push(x)
    }
  })

  return sanitizedArray
}

//////////////////////  GAMEBOARD UI FUNCTIONS  //////////////////////

function displayPossibleKeys(parent, keyArray) {
  keyArray.forEach((key) => {
    let optionBox = document.createElement("option");
    optionBox.innerHTML = key;
    optionBox.value = key;
    parent.appendChild(optionBox)
  })

}


//Frequency Functions////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function getFrequencyChromatic(num) {
  let noteNum;
  let note = "";
  let freq;

  if (num <= 11) {
    noteNum = Number(num);
  }
  else {
    if (Number(num) >= 83) {
      noteNum =  (Number(num) % 84)
      noteNum = (noteNum % 12);
    }
    else {
      noteNum = (num % 12);
    }
  }

  switch(noteNum) {
    case 0:
      freq = 32.70320// 261.63;
      note = "C";
      break;
    case 1:
      freq = 34.64783 // 277.18;
      note = "C#/Db"
      break;
    case 2:
      freq = 36.70810 //293.66;
      note = "D"
      break;
    case 3:
      freq = 38.89087 //311.13;
      note = "D#/Eb"
      break;
    case 4:
      freq = 41.20344 //329.62;
      note = "E"
      break;
    case 5:
      freq = 43.65353 // 349.23;
      note = "F"
      break;
    case 6:
      freq = 46.24930 //69.99;
      note = "F#/Gb"
      break;
    case 7:
      freq = 48.99943 //392;
      note = "G"
      break;
    case 8:
      freq = 51.91309 //415.30;
      note = "G#/Ab"
      break;
    case 9:
      freq = 55.00000;
      note = "A"
      break;
    case 10:
      freq = 58.27047;
      note = "A#/Bb"
      break;
    case 11:
      freq = 61.73541;
      note = "B"
      break;
  }

  let multiplier = 1
  if (num > 11) {
    num > 83 ? multiplier = Math.floor((Number(num) % 84) /12) : multiplier = Math.floor(num /12);
    if (multiplier < 2) {
      note = note + (multiplier + 1) 
      freq *= 2 
    }
    else {
      for (let i = 0; i < multiplier; i++) {
        freq *= 2
      }
      note = note + (multiplier + 1)
    }
  }
  return [freq, note];
}


function getFrequencyNoteWithName(noteName, noteOctave) {
  let enharmonicName = convertToEnharmonicName(noteName)
  let chromaticScale = buildChromaticScaleEnharmonic()
  let noteIndex = chromaticScale.indexOf(enharmonicName)
  //c.log(noteOctave)
  //c.log(noteName)
  let note;
  let freq;

  switch(noteIndex) {
    case 0:
      freq = 32.70320// 261.63;
      note = "C";
      break;
    case 1:
      freq = 34.64783 // 277.18;
      note = "C#/Db"
      break;
    case 2:
      freq = 36.70810 //293.66;
      note = "D"
      break;
    case 3:
      freq = 38.89087 //311.13;
      note = "D#/Eb"
      break;
    case 4:
      freq = 41.20344 //329.62;
      note = "E"
      break;
    case 5:
      freq = 43.65353 // 349.23;
      note = "F"
      break;
    case 6:
      freq = 46.24930 //69.99;
      note = "F#/Gb"
      break;
    case 7:
      freq = 48.99943 //392;
      note = "G"
      break;
    case 8:
      freq = 51.91309 //415.30;
      note = "G#/Ab"
      break;
    case 9:
      freq = 55.00000;
      note = "A"
      break;
    case 10:
      freq = 58.27047;
      note = "A#/Bb"
      break;
    case 11:
      freq = 61.73541;
      note = "B"
      break;
  }

  if (noteOctave != 1) {
    for (let i = 0; i < noteOctave - 1; i++) {
      freq *= 2
    }
  }
  //console.log(freq)
  //console.log(note)
  return [freq, note + noteOctave];
}


function playOsc(freq) {
  let osc
  let gainNode = audioCtx.createGain();
  gainNode.gain.value = 0.2;
  osc = audioCtx.createOscillator();
  osc.type = "sine"// type//"sawtooth" //"square";
  osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
  osc.connect(gainNode).connect(audioCtx.destination);
  osc.start(audioCtx.currentTime)
  //gainNode.gain.setTargetAtTime(0.1, audioCtx.currentTime, .02);
  gainNode.gain.setTargetAtTime(0, audioCtx.currentTime + .5, .1);
  osc.stop(audioCtx.currentTime + 1)
  //setTimeout(() => {
    //osc.disconnect()
  //}, 350)
}


function playNoteSoundOfHand(handList) {
  console.log(handList)
  for (let i = 0; i < handList[2].length; i++) {
    setTimeout(() => {
      playOsc(getFrequencyNoteWithName(handList[0], handList[2][i])[0])
    }, i * 500)
  }
}


function playSoundOfNoteList(noteList) {
  for (let i = 0; i < noteList[1].length; i++) {
    setTimeout(() => {
      playOsc(getFrequencyNoteWithName(noteList[0], noteList[1][i])[0])
    }, i * 500)
  }
}
//////////////////////  GAME LOGIC  //////////////////////

function convertToEnharmonicName(note) {
  let alphabet = "CDEFGAB"
  let enharmonicName

  switch (note) {
    case "E":
    case "Fb":
      enharmonicName = "E/Fb"
      break;
    case "B":
    case "Cb":
      enharmonicName = "B/Cb"
      break;

    default:
      if (!note.includes("/")) {
        if (note.includes("#")) {
          enharmonicName = `${note}/${alphabet[(alphabet.indexOf(note[0]) + 1)]}b`
        }
        else if (note.includes("b")) {
          enharmonicName = `${alphabet[(alphabet.indexOf(note[0]) - 1) % alphabet.length]}#/${note}`
        }
        else {
          enharmonicName = note
        }
      }
      else {
        enharmonicName = note
      }
      break;
  }
  return enharmonicName
}


function getNotesRankArray(cardDivArray) {
  let noteList = []

  cardDivArray.forEach((elem) => {
    noteList.push(elem.dataset.rank)
  })
  return noteList
}

function getDivProperty(cardDivArray, property) {
  let noteList = []

  cardDivArray.forEach((elem) => {
    noteList.push(elem.dataset[property])
  })
  return noteList

}


/**
 * Consolidate Octaves function:
 * @param {Array} noteArray An array of HTMLElement divs
 * @param {Array} scaleArray An array of notes in a scale
 * @returns An array of notes grouped by repeated octaves
 */
function consolidateOcaves(noteArray, scaleArray = buildChromaticScaleEnharmonic()) {
  let noteRankArray = getDivProperty(noteArray, "rank")
  let noteOctaveArray = getDivProperty(noteArray,"octave")

  let octaveList = scaleArray.map((elem) => {
    let playedNotes= []
    let count = 0;
    noteRankArray.forEach((item, index) => {
      if (item == elem) {
        count++
        playedNotes.push(noteOctaveArray[index])
        //playedNotes.push([elem, noteOctaveArray[index]])
      }
    })
    return [elem, playedNotes]
    //return {note: elem, repeats: count, playedCard: playedNotes }
  })
  return octaveList
}


function sortByCount(noteList) {
  console.log(noteList)
  noteList.sort((a,b) => {
    if (Number(a[1].length) > Number(b[1].length)) {
      return -1
    }
    else if (Number(a[1].length) < Number(b[1].length)) {
      return 1
    }
    return 0;   
    }
  )
  return noteList
}




function identifyIntervalsInHand(cardList) {
  //console.log(cardList)
  if (cardList.length > 1) {
    let chromaticScale = buildChromaticScaleEnharmonic()
    //console.log(chromaticScale)
    let enharmonicList = cardList.map((elem) =>  [convertToEnharmonicName(elem[0]), elem[1]]).filter((value) => Number(value[1].length) > 0 )
    let intervals = ["unison,", "minor2nd", "major2nd", "minor3rd", "major3rd", "perfect4", "sharp4", "perfect5", "minor6", "major6", "minor7", "major7"]
    let intervalList = []
    c.log(enharmonicList)

    intervals.forEach((interval, index) => {
      //console.log(interval)
      //console.log(index)
      let intervalNotePairs = []

      for (let i = 0; i < enharmonicList.length; i++) {
        for (let g = 0; g < enharmonicList.length; g++) {
          if (i != g) {
            //console.log(`Note1: ${enharmonicList[i]} index: ${i}`)
            //console.log(`Note2: ${enharmonicList[g] }index: ${g}`)
            let enharmonicIndex = (chromaticScale.indexOf(enharmonicList[g][0]) - chromaticScale.indexOf(enharmonicList[i][0])) % chromaticScale.length 
            //console.log(`Enharmonic Index: ${enharmonicIndex}`)
            if (enharmonicIndex < 0) { 
              enharmonicIndex = chromaticScale.length + enharmonicIndex 
              //console.log(`Enharmonic Index Corrected: ${enharmonicIndex}`)
            }


            if (enharmonicIndex == index) {
              intervalNotePairs.push([cardList[i], cardList[g]])
              //console.log(`Interval Match! ${enharmonicList[i][0]} and ${enharmonicList[g][0]} equal a ${interval} `)
              //console.log(`Interval Match! ${cardList[i][0]} and ${cardList[g][0]} equal a ${interval} `)
            }
            //console.log("======================================")
          }
        }
      }
      intervalList.push([interval, intervalNotePairs])
    })
    //console.log (sortByCount(intervalList.filter((value) => Number(value[1].length) > 0)))
    return (sortByCount(intervalList.filter((value) => Number(value[1].length) > 0)))
  }
  return null
}


function identifyTriadsInHand(cardList, gameObj) {
  //create chromatic scale
  //check all intervals from each note
  //check if fifth exists, then check if third, then check if seventh
  let majorScale = gameObj.scale
  if (cardList.length > 2) {
    let chromaticScale = buildChromaticScaleEnharmonic()
    let enharmonicList = cardList.map((elem) => [convertToEnharmonicName(elem[0]), elem[1]]).filter((value) => Number(value[1].length) > 0 )
    let triadList = []
    console.log(enharmonicList)

    enharmonicList.map((x) => {return x[0]}).forEach((note, index, array) => {
      let originalNoteName = cardList[index][0]
      let fifth = (chromaticScale.indexOf(note) + 7) % chromaticScale.length
      let m3 = (chromaticScale.indexOf(note) + 3) % chromaticScale.length
      let Maj3 = (chromaticScale.indexOf(note) + 4) % chromaticScale.length
      let flatFifth = (chromaticScale.indexOf(note) + 6) % chromaticScale.length
      let sharpFifth = (chromaticScale.indexOf(note) + 8) % chromaticScale.length


      if (array.includes(chromaticScale[fifth])) {
        let triad = createDiatonicStructure(cardList[index][0], majorScale, "triad")
        if (array.includes(chromaticScale[m3])) {
          triadList.push([`${originalNoteName} Minor Triad`, cardList.filter((value) => triad.includes(value[0]))])
        }
        if (array.includes(chromaticScale[Maj3])) {
          triadList.push([`${originalNoteName} Major Triad`, cardList.filter((value) => triad.includes(value[0]))])
        }
      }
      else if (array.includes(chromaticScale[flatFifth])) {
        let triad = createDiatonicStructure(cardList[index][0], majorScale, "triad")
        if (array.includes(chromaticScale[m3])) {
          triadList.push([`${originalNoteName} Diminished Triad`, cardList.filter((value) => triad.includes(value[0]))])
        }
      }
      else if (array.includes(chromaticScale[sharpFifth])) {
        let triad = createDiatonicStructure(cardList[index][0], majorScale, "triad")
        if (array.includes(chromaticScale[Maj3])) {
          triadList.push([`${originalNoteName} Augmented Triad`, cardList.filter((value) => triad.includes(value[0]))])
        }
      }
    })

  return triadList.length != 0 ?  triadList :  null;
  }
  else {
    return null
  }
}



function identifySeventhChordsInHand(cardList, gameObj) {
  //create chromatic scale
  //check all intervals from each note
  //check if fifth exists, then check if third, then check if seventh
  let majorScale = gameObj.scale
  if (cardList.length > 2) {
    let chromaticScale = buildChromaticScaleEnharmonic()
    let enharmonicList = cardList.map((elem) => [convertToEnharmonicName(elem[0]), elem[1]]).filter((value) => Number(value[1].length) > 0 )
    let seventhChordList = []

    enharmonicList.map((x) => {return x[0]}).forEach((note, index, array) => {
      let originalNoteName = cardList[index][0]
      let flatFifth = (chromaticScale.indexOf(note) + 6) % chromaticScale.length
      let fifth = (chromaticScale.indexOf(note) + 7) % chromaticScale.length
      let m3 = (chromaticScale.indexOf(note) + 3) % chromaticScale.length
      let Maj3 = (chromaticScale.indexOf(note) + 4) % chromaticScale.length
      let m7 = (chromaticScale.indexOf(note) + 10) % chromaticScale.length
      let Maj7 = (chromaticScale.indexOf(note) + 11) % chromaticScale.length

      if (array.includes(chromaticScale[fifth])) {
        let seventh = createDiatonicStructure(cardList[index][0], majorScale, "seventhChord")
        if (array.includes(chromaticScale[m3])) {
          if (array.includes(chromaticScale[m7])) {
            seventhChordList.push([`${originalNoteName} Minor 7`, cardList.filter((value) => seventh.includes(value[0]))])
          }
        }
        if (array.includes(chromaticScale[Maj3])) {
          if (array.includes(chromaticScale[Maj7])) {
            seventhChordList.push([`${originalNoteName} Major 7`, cardList.filter((value) => seventh.includes(value[0]))])
          }
          else if (array.includes(chromaticScale[m7])) {
            seventhChordList.push([`${originalNoteName} Dom 7`, cardList.filter((value) => seventh.includes(value[0]))])
          }
        }
      }
      else if (array.includes(chromaticScale[flatFifth])) {
        let seventh = createDiatonicStructure(cardList[index][0], majorScale, "seventhChord")
        if (array.includes(chromaticScale[m3])) {
          if (array.includes(chromaticScale[m7])) {
            seventhChordList.push([`${originalNoteName} Minor 7 flat 5`, cardList.filter((value) => seventh.includes(value[0]))])
          }
        }

      }
    })

  return seventhChordList.length != 0 ?  seventhChordList :  null;
  }
  else {
    return null
  }
}



function identifySingleDiatonicScaleInHand(cardList, scale, gameObj) {
  let sanitizedScale = getRidOfDuplicateCards(cardList, gameObj)

  let scalePossible = true
  let playedNotes = []
  for (let i = 0; i < scale.length; i++) {
    for (let g = 0; g < sanitizedScale.length; g++) {
      if (scale[i] == sanitizedScale[g][0]) {
        scalePossible = true
        playedNotes.push(sanitizedScale[g])
        break;
      }
      else {
        scalePossible = false
      }
    }
    if (scalePossible == false) {
      break;
    }
  }

  if (scalePossible) {
    return [scale, playedNotes]
  }
  else {
    return false
  }

}




function identifyAllDiatonicScalesInHand(cardList, gameObj) {
  let majorScale = gameObj.scale
  let majPentScale = createDiatonicStructure(majorScale[0], majorScale, "majorPenta")
  let minPentScale = createDiatonicStructure(majorScale[5], majorScale, "minorPenta")

  let scalesInHand = []
  if (cardList.length >= 5 ) {
    identifySingleDiatonicScaleInHand(cardList, majPentScale, gameObj) ? scalesInHand.push([`${majPentScale[0]} Major Pentatonic`, identifySingleDiatonicScaleInHand(cardList, majPentScale, gameObj)[1]]) : null
    identifySingleDiatonicScaleInHand(cardList, minPentScale, gameObj) ? scalesInHand.push([`${minPentScale[0]} Minor Pentatonic`, identifySingleDiatonicScaleInHand(cardList, minPentScale, gameObj)[1]]) : null

    //identifySingleDiatonicScaleInHand(cardList, majPentScale) ? scalesInHand.push(`${majPentScale[0]} Major Pentatonic`) : console.log(false)
    //identifySingleDiatonicScaleInHand(cardList, minPentScale) ? scalesInHand.push(`${minPentScale[0]} Minor Pentatonic`) : console.log(false)
    if (cardList.length >= 7) {
      identifySingleDiatonicScaleInHand(cardList, majorScale, gameObj) ? scalesInHand.push([`${majorScale[0]} Major Scale`, identifySingleDiatonicScaleInHand(cardList, majorScale, gameObj)[1]]) : null
    }

  }

  console.log(scalesInHand)
  return scalesInHand.length != 0 ? scalesInHand : null;
}

function updateGameObj(scale, keySig, deck) {
  return {
    key: keySig,
    scale: scale,
    deck: deck
  }
}

//////////////////////  SCORE LOGIC  //////////////////////

function getTopRepeatingofHandType(noteList) {
  console.log(noteList)
  if (noteList != null && noteList.length > 0) {
    let topRepeating = noteList.filter((value, index, array) => value[1].length == array[0][1].length)

    //displayData(topRepeating, handTxt, handTypeDisplay)
    return topRepeating
  }
  return null
}

function displayData(list, txt, parent) {

  if (list != null && list.length  > 0 ) {
    let handTxt = txt
    list.forEach((elem) => {
      if (Array.isArray(elem) && elem.length > 1) {
        handTxt += `${elem[0]}, `

      }
      else {
        handTxt += `${elem}, `
      }
    }  )
    let handData = document.createElement("div")
    handData.classList.add("handType")
    handData.innerHTML = handTxt.slice(0, -2)
    parent.appendChild(handData)
  }
}


function checkAllHandTypes(selectedCards, gameObj) {

  let octaveList = consolidateOcaves(selectedCards, gameObj.scale)
  let sortedHand = sortByCount(octaveList).filter((value) => Number(value[1].length) > 0)
  console.log(sortedHand)
  let intervalList = identifyIntervalsInHand(sortedHand)
  console.log(intervalList)
  let topOctaves = getTopRepeatingofHandType(sortedHand)
  let topIntervals = getTopRepeatingofHandType(intervalList)

  let triadList = identifyTriadsInHand(sortedHand, gameObj)
  console.log(triadList)
  let seventhList = identifySeventhChordsInHand(sortedHand, gameObj)
  console.log(seventhList)
  //let scaleList = identifyDiatonicScalesInHand(octaveList, gameObj)
  let scaleList = identifyAllDiatonicScalesInHand(sortedHand, gameObj)

  return {
    octaves: topOctaves,
    intervals: topIntervals,
    triads: triadList,
    sevenths: seventhList,
    scales: scaleList
  }

}




function displayAllHands(playedHandObj) {
  console.log(playedHandObj)

  displayData(playedHandObj.octaves, playedHandObj.octaves[0][1] + " octaves of ", handTypeDisplay)
  displayData(playedHandObj.intervals, " Intervals of ", handTypeDisplay)
  displayData(playedHandObj.triads, "Triads of ", handTypeDisplay)
  displayData(playedHandObj.sevenths, "Sevenths of ", handTypeDisplay)
  displayData(playedHandObj.scales[0], "", handTypeDisplay)

}

function chooseTopScoringHand(playedHandObj) {
  let topScoringHand

  for (const property in playedHandObj) {
    if (playedHandObj[property] != null) {
      topScoringHand = property
    }
  }

  console.log(topScoringHand)
  return topScoringHand
}

function calculateHandScore(handType, playedHandObj ) {
  let currentHand
  let score = 0
  let multiplier
  switch (handType) {
    case "octaves":
      console.log(playedHandObj.octaves)
      currentHand = playedHandObj.octaves
      multiplier = scoreObj.octaves
      displayData(currentHand, currentHand[0][1].length + " octaves of ", handTypeDisplay)
      currentHand.forEach((elem) => {
        score += Number(elem[1]) * Number(multiplier)
      })
      playSoundOfNoteList(currentHand[0])
      //playNoteSoundOfHand(currentHand[0])
      break;
    case "intervals":
      console.log(playedHandObj.intervals)
      currentHand = playedHandObj.intervals
      multiplier = scoreObj.intervals
      displayData(playedHandObj.intervals, " Intervals of ", handTypeDisplay)
      currentHand.forEach((elem) => {
        score += Number(elem[1]) * Number(multiplier)
        elem[1].forEach((item) => {
          item.forEach((note, index) => {
            setTimeout(() => {
              playSoundOfNoteList(note)

            }, index * 500)
            
          })
        })

      })

      break;
    case "triads":
      console.log(playedHandObj.triads)
      currentHand = playedHandObj.triads
      multiplier = scoreObj.triads
      displayData(playedHandObj.triads, "Triads of ", handTypeDisplay)
      currentHand.forEach((elem) => {
        score += Number(elem[1].length) * Number(multiplier)

        /* elem[2].forEach((item) => {
          //playNoteSoundOfHand(item)
        }) */

      })
      break;
    case "sevenths":
      console.log(playedHandObj.sevenths)
      currentHand = playedHandObj.sevenths
      multiplier = scoreObj.sevenths
      displayData(playedHandObj.sevenths, "Sevent Chord of ", handTypeDisplay)


      /* currentHand.forEach((elem) => {
        currentHand[1].forEach((elem) => {
          score += Number(elem[1]) * Number(multiplier)
          //playNoteSoundOfHand(elem)
        })
        
      }) */
      break;
    case "scales":
      console.log(playedHandObj.scales)
      currentHand = playedHandObj.scales
      multiplier = scoreObj.scales
      c.log(currentHand)
      c.log(currentHand[0])
      c.log(currentHand[0][1])

      displayData(playedHandObj.scales[playedHandObj.scales.length - 1], "", handTypeDisplay)
      currentHand[currentHand.length - 1][1].forEach((elem) => {
        score += Number(elem[1]) * Number(multiplier)
      })
      break;
  }

  console.log(currentHand)


  scoreDisplay.innerHTML = score + " points"
  //console.log(score)
}


//////////////////////  SCORE SYSTEM  //////////////////////

//points to add to score for each harmonic hand structure
let scoreObj = {
  highnote: 1,
  unison: 1,
  intervals: 2,
  octaves: 3, //7
  stacked: 4,
  triads: 5,
  sevenths: 6,
  //chords: 5,
  //penta: 5,
  scales: 7,
  flush: 8,
  bonus: 10
}




//////////////////////  MAIN LOOP  //////////////////////
const audioCtx = new (window.AudioContext || window.webkit.AudioContext)();
const gameboard = document.querySelector("#gameboard")
const player1 = document.getElementById("player1")
const drawBtn = document.getElementById("drawBtn")
const playBtn = document.getElementById("playBtn")
const handTypeDisplay = document.querySelector("#handFlexBox")
const scoreDisplay = document.querySelector("#score")
const scaleCtrl = document.querySelector("#scaleCtrl")
const scaleBtn = document.querySelector("#scaleBtn")
const sortRankBtn = document.querySelector("#sortRankBtn")
const sortOctaveBtn = document.querySelector("#sortOctaveBtn")

displayPossibleKeys(scaleCtrl, buildCircleOfFifths()[0])
displayPossibleKeys(scaleCtrl, buildCircleOfFifths()[1])
displayPossibleKeys(scaleCtrl, ["Chromatic"])

let cardList = []
let playerHand = []
let selectedCards = []
let keySig = "C"
let chromatic = buildChromaticScaleEnharmonic()
let currentScale = buildMajorScale(scaleCtrl.value)
let deck = buildMusicDeck(currentScale, 7)

let gameObj = updateGameObj(currentScale, keySig, deck)

fillHand(player1,10, gameObj)
cardList = player1.querySelectorAll(".cardDiv")


//////////////////////  GAME EVENT LISTENERS  //////////////////////

playBtn.addEventListener("click", (e) => {
  removeChildrenDivs(handTypeDisplay)
  let playedHandObj = checkAllHandTypes(selectedCards, gameObj)
  //displayAllHands(playedHandObj)
  console.log(playedHandObj)
  
  calculateHandScore(chooseTopScoringHand(playedHandObj), playedHandObj )


  selectedCards.forEach((elem) => elem.remove())
  fillHand(player1,10, gameObj)
  selectedCards = []
  cardList = player1.querySelectorAll(".cardDiv")
  resizeHand(player1, sortHandByRank(sortHandByOctave(cardList), gameObj))
})

drawBtn.addEventListener("click", (e) => {
  fillHand(player1,10, gameObj)
})

scaleBtn.addEventListener("click", (e) => {
  removeChildrenDivs(player1)
  if (scaleCtrl.value == "Chromatic") {
    currentScale = buildChromaticScaleEnharmonic()
  }
  else {
    currentScale = buildMajorScale(scaleCtrl.value)
  }
  

  keySig = currentScale[0]
  deck = buildMusicDeck(currentScale, 7)
  gameObj = updateGameObj(currentScale, keySig, deck)
  fillHand(player1,10, gameObj)
  cardList = player1.querySelectorAll(".cardDiv")
  
})

sortRankBtn.addEventListener("click", (e) => {
  keySig = currentScale[0]
  gameObj = updateGameObj(currentScale, keySig, deck)
  //resizeHand(parent, sortHandByOctave(sortHandByRank(parent.querySelectorAll(".cardDiv"), gameObj)))
  //resizeHand(player1, sortHandByRank(sortHandByOctave(cardList), gameObj))
  resizeHand(player1, sortHandByRank(sortHandByOctave(cardList), gameObj))
})

sortOctaveBtn.addEventListener("click", (e) => {
  keySig = currentScale[0]
  gameObj = updateGameObj(currentScale, keySig, deck)
  resizeHand(player1, sortHandByOctave(sortHandByRank(cardList, gameObj)))
})

//////////////////////  WINDOW EVENT LISTENERS  //////////////////////

window.addEventListener("resize", (e) => {
  resizeHand(player1)
})

window.addEventListener('selectstart', (e) => {
  e.preventDefault();
})

gameboard.addEventListener("contextmenu", (e) => {
  e.preventDefault();
  document.querySelectorAll(".selectedCard").forEach((elem) => {
    elem.classList.remove("selectedCard")
    removeFromArray(elem, selectedCards)
    elem.dataset.selected = "false"
  })
})


//////////////////////  OLD FUNCTIONS //////////////////////

/** 
 * console.log(createHarmonicStructure("C", "majorHepta"))
 * console.log(buildCircleOfFifths)
console.log(createHarmonicStructure("B/Cb", "majorHepta"))
console.log("Major : ===================================================")
console.log(buildMajorScale("C"))
console.log(buildMajorScale("Bb"))
console.log(buildMajorScale("D"))
console.log("Modal : ===================================================")
console.log(buildModalScale(buildMajorScale("G"), 2))
console.log(createHarmonicStructure("C", "majorHepta"))
console.log(createHarmonicStructure("C", "mixolydianHepta"))
console.log(buildMajorScaleObj("Bb"))
console.log(buildGenericScaleObj(createHarmonicStructure("C", "melMinorHepta")))
console.log(buildGenericScaleObj(createHarmonicStructure("C", "harmMinorHepta")))


function identifyIntervalsInHand2(cardList) {

  if (cardList.length > 1) {
    
    let chromaticScale = buildChromaticScaleEnharmonic()
    let enharmonicList = cardList.map((elem) =>  [convertToEnharmonicName(elem[0]), elem[1]]).filter((value) => Number(value[1].length) > 0 )
    let intervals = ["unison,", "minor2nd", "major2nd", "minor3rd", "major3rd", "perfect4", "sharp4", "perfect5", "minor6", "major6", "minor7", "major7"]
    let intervalList = []

    
    intervals.forEach((interval, index) => {
      let playedInterval = []
      enharmonicList.forEach((note1,index1) => {
        enharmonicList.forEach((note2, index2) => {
          if (note1 !== note2) {
            let enharmonicIndex = (chromaticScale.indexOf(note2[0]) - chromaticScale.indexOf(note1[0])) % chromaticScale.length 
            if (enharmonicIndex < 0) {enharmonicIndex = chromaticScale.length + enharmonicIndex }
            if (enharmonicIndex == index) {
              playedInterval.push([cardList[index1],cardList[index2]])
            }
          }
        })
      })
      intervalList.push([interval, playedInterval])
    })


    return (sortByCount(intervalList.filter((value) => Number(value[1].length) > 0)))
  }
  return null

}


function identifyChordsInHand(cardList, gameObj) {
  //create chromatic scale
  //check all intervals from each note
  //check if fifth exists, then check if third, then check if seventh
  let majorScale = gameObj.scale
  if (cardList.length > 2) {
    let chromaticScale = buildChromaticScaleEnharmonic()
    let enharmonicList = cardList.map((elem) => [convertToEnharmonicName(elem[0]), elem[1], elem[2]]).filter((value) => Number(value[1]) > 0 )
    let triadList = []
    let seventhChordList = []

    enharmonicList.map((x) => {return x[0]}).forEach((note, index, array) => {
      let playedNotes = []
      let originalNoteName = cardList[index][0]
      let fifth = (chromaticScale.indexOf(note) + 7) % chromaticScale.length
      let m3 = (chromaticScale.indexOf(note) + 3) % chromaticScale.length
      let Maj3 = (chromaticScale.indexOf(note) + 4) % chromaticScale.length
      let m7 = (chromaticScale.indexOf(note) + 10) % chromaticScale.length
      let Maj7 = (chromaticScale.indexOf(note) + 11) % chromaticScale.length

      if (array.includes(chromaticScale[fifth])) {
        let triad = createDiatonicStructure(cardList[index][0], majorScale, "triad")
        let seventh = createDiatonicStructure(cardList[index][0], majorScale, "seventhChord")
        if (array.includes(chromaticScale[m3])) {
          triadList.push([`${originalNoteName} Minor Triad`, cardList.filter((value) => triad.includes(value[0]))])
          if (array.includes(chromaticScale[m7])) {
            seventhChordList.push([`${originalNoteName} Minor 7`, cardList.filter((value) => seventh.includes(value[0]))])
          }
        }

        if (array.includes(chromaticScale[Maj3])) {
          triadList.push([`${originalNoteName} Major Triad`, cardList.filter((value) => triad.includes(value[0]))])
          if (array.includes(chromaticScale[Maj7])) {
            seventhChordList.push(`${originalNoteName} Major 7`, cardList.filter((value) => seventh.includes(value[0])))
          }
          else if (array.includes(chromaticScale[m7])) {
            seventhChordList.push(`${originalNoteName} Dom 7`, cardList.filter((value) => seventh.includes(value[0])))
          }
        }
      }
    })

  return triadList.length != 0 ?  [triadList, seventhChordList] :  null;
  }
  else {
    return null
  }
}


*/


