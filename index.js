
//////////////////////  HARMONIC STRUCTURES //////////////////////

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
  majorHepta: [0,1,1,1,1,1,1,1],
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


//////////////////////  DECK FUNCTIONS  //////////////////////


function buildMusicDeck(scale, octaves) {
  let musicDeck = [];

  for (let i = 0; i < octaves; i++) {
    scale.forEach((elem) => {
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

/**
 * Find Unified Accidental function:
 * @param {string} key The name of the key (ie: Bb)
 * @returns An object that identifies the correct accidental of key and the corresponding circle of fifths/fourths
 */
function findUnifiedAccidental(key) {
  key = key.charAt(0).toUpperCase() + key.substring(1)
  if (key != "C") {
    let flatKeys = buildIntervalCycle(5, 7, buildChromaticScaleEnharmonic())
    let sharpKeys = buildIntervalCycle(7, 7, buildChromaticScaleEnharmonic())

    flatKeys = sanitizeAccidentals("b", flatKeys)
    sharpKeys = sanitizeAccidentals("#", sharpKeys)

    if (flatKeys.includes(key)) {
      return {accidental: "b", cycle: flatKeys}
    }
    else if (sharpKeys.includes(key))  {
      return {accidental: "#", cycle: sharpKeys}
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
 * @param {number} keySignature Numbe of accidentals in key signature (ie: 1 for the key of F)
 * @param {char} accidental Either sharp or flat symbol (#/b)
 * @returns An Array with the notes of each accidental in the key signature
 */
function getAccidentalsInKeySig(keySignature, accidental) {
  let scale = ["C", "D", "E", "F", "G", "A", "B"];
  if (accidental == "#") {
    return buildIntervalCycle(4, keySignature,scale, scale.indexOf("F"))
  }
  else {
    return buildIntervalCycle(3, keySignature, scale, scale.indexOf("B"))
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
  let currentScaleNoAccidental = scale.slice(indexOfKey).concat(scale.slice(0, indexOfKey))
  let accidentalObj = findUnifiedAccidental(key)
  if (accidentalObj != "error") {
    let keySignature = accidentalObj.cycle.indexOf(key) - 1
    let accidentalList = getAccidentalsInKeySig(keySignature, accidentalObj.accidental);
    for (let i = 0; i < 7; i++) {
      let currentNote = currentScaleNoAccidental[i]
      accidentalList.forEach((elem) => {
        if (elem == currentScaleNoAccidental[i] && accidentalObj.accidental != "none" ) {
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
 * @param {Array} pattern An Array of the pattern in Whole steps and Halfsteps
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
  return convertScaleStepPatternToNum(pattern.slice(modeNum - 1).concat(pattern.slice(0, modeNum - 2)))
}


/**
 * Find Note Index function:
 * @param {string} noteName The letter name of note to find in scale
 * @param {Array} scale An array of notes
 * @returns The index of the chosen note in the scale
 */
function findNoteIndex(noteName, scale = buildChromaticScaleEnharmonic()) {
  for (let i = 0; i < scale.length; i++) {
    let currentElem = scale[i].split("/");
    if (currentElem[0] == noteName || currentElem[1] == noteName) {
      return i
    }
  }

  return "error"
}



//////////////////////  HARMONIC STRUCTURES BUILD FUNCTIONS  //////////////////////



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

/**
 * Create Diatonic Structure function:
 * @param {string} startNote A name of the note to start the structure
 * @param {Array} scale An Array of the scale of notes to build with
 * @param {string} structure The name of the structure
 * @returns An Array of notes in the chosen structure
 */
function createDiatonicStructure(startNote, scale, structure) {
  let pattern = diatonicStructuresIntervalicObj[structure] 
  let diatonicStructure = []
  pattern.forEach((elem) => {
    startNote += elem
    diatonicStructure.push(scale[startNote % scale.length])
  })
  return diatonicStructure
}


/**
 * Create Harmonic Structure function:
 * @param {string} startNote A name of the note to start the structure
 * @param {string} structure The name of the structure
 * @returns An Array of notes in the chosed structure
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


//////////////////////  CREATE CARD FUNCTIONS  //////////////////////

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
  //createCardLabel('octaveTop', frontOfCard, labelFrame, cardOctave)
  //createCardLabel('octaveBottom', frontOfCard, labelFrame, cardOctave)
  const cardDiv = document.createElement('div')
  cardDiv.appendChild(frontOfCard)
  cardDiv.appendChild(backOfCard)
  cardDiv.classList.add('cardDiv')
  cardDiv.dataset.rank = cardRank
  cardDiv.dataset.octave = cardOctave
  cardDiv.classList.add(`${cardRank}${cardOctave}`)
  cardDiv.dataset.selected = "false";
  //cardDiv.querySelectorAll('.cardLabel').forEach((elem) => {
    //elem.innerHTML = cardRank
  //})

  return cardDiv;
}

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

function showHide(elem) {
  if (elem.classList.contains('show')) {
    elem.classList.remove('show')
    elem.classList.add('hide')
  }
  else {
    elem.classList.remove('hide')
    elem.classList.add('show')
  }
}


function flipCard(card, animateBool) {
  let front = card.querySelector('.frontCard')
  let back = card.querySelector('.backCard')
  if (animateBool) {
    card.classList.contains('flip') ? card.classList.remove('flip') :  card.classList.add('flip')
    //card.style.pointerEvents = "none"
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


//////////////////////  CARD UTILITY FUNCTIONS  //////////////////////

function chooseRandomIndex(array) {
  let randomIndex = Math.floor(Math.random() * array.length)
  return randomIndex
}

function removeFromArray(elem, array) {
  array.splice(array.indexOf(elem), 1)
}


function removeChildrenDivs(parent) {
  while (parent.firstChild) {
    parent.firstChild.remove()
  }
}



function countCards(parent) {
  return parent.querySelectorAll(".cardDiv").length
}

function resizeCard(card, numCards, index) {
  card.style.left = `${index * card.offsetWidth * .75}px`   //set card x coordinate with about 25% crossover
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

function resizeHand(parent) {
  let numCards = countCards(parent)
  parent.querySelectorAll(".cardDiv").forEach((card, index) => {
    resizeCard(card,numCards,index)
  })
}

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

function fillHand(parent, max, currentDeck = deck) {
  let currentHandSize = countCards(parent)
  let maxHandSize = currentHandSize + max
  while (currentHandSize < maxHandSize) {
    addCardToHand(parent, currentDeck)
    currentHandSize++
  }
  resizeHand(parent)
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
      if (note.includes("#")) {
        enharmonicName = `${note}/${alphabet[(alphabet.indexOf(note[0]) + 1)]}b`
      }
      else if (note.includes("b")) {
        enharmonicName = `${alphabet[(alphabet.indexOf(note[0]) - 1) % alphabet.length]}#/${note}`
    
      }
      else {
        enharmonicName = note
      }
      break;
  }
  return enharmonicName
}



function getNotesCardDivArray(cardDivArray) {
  let noteList = []

  cardDivArray.forEach((elem) => {
    noteList.push(elem.dataset.rank)
  })

  return noteList

}

function consolidateOcaves(noteArray, scaleArray = buildChromaticScaleEnharmonic()) {
  let octaveList = scaleArray.map((elem) => {
    let count = 0;
    noteArray.forEach((item) => {
      if (item == elem) {
        count++
      }
    })
    return [elem, count]
  })
  return octaveList
}


function sortByCount(noteList) {
  noteList.sort((a,b) => {
    if (Number(a[1]) > Number(b[1])) {
      return -1
    }
    else if (Number(a[1]) < Number(b[1])) {
      return 1
    }

    return 0;   
    }
  )
  return(noteList)

}



function identifyIntervals(cardList) {
  let chromaticScale = buildChromaticScaleEnharmonic()
  let enharmonicList = cardList.map((elem) => [convertToEnharmonicName(elem[0]), elem[1]]).filter((value) => Number(value[1]) > 0 )
  console.log(enharmonicList)
  let intervals = ["1,", "b2", "2", "b3", "3", "P4", "#4", "5", "b6", "6", "b7", "7"]
  let intervalList = []
  
  intervals.forEach((interval, index) => {
    let count = 0
    enharmonicList.map((note1) => {
      enharmonicList.forEach((note2) => {
        
        if (note1 !== note2) {
          let currentInterval = (chromaticScale.indexOf(note2[0]) - chromaticScale.indexOf(note1[0])) % chromaticScale.length 
          if (currentInterval < 0) {currentInterval = chromaticScale.length + currentInterval }
          if (currentInterval == index) {
            let multiplier
            note1[1] < note2[1] ? multiplier = note1[1] : multiplier = note2[1]
            count += (1 * multiplier)
          }
        }
      })
    })
    intervalList.push([interval, count])
  })

  console.log(intervalList)


  return (sortByCount(intervalList.filter((value) => Number(value[1]) > 0)))
}


function identifyChords(cardList) {
  //create chromatic scale
  //check all intervals from each note
  //check if fifth exists, then check if third, then check if seventh

  let chromaticScale = buildChromaticScaleEnharmonic()
  let enharmonicList = cardList.map((elem) => [convertToEnharmonicName(elem[0]), elem[1]]).filter((value) => Number(value[1]) > 0 )
  let triadList = []
  let seventhChordList = []

  enharmonicList.map((x) => {return x[0]}).forEach((note, index, array) => { 

    let fifth = (chromaticScale.indexOf(note[0]) + 7) % chromaticScale.length
    let m3 = (chromaticScale.indexOf(note[0]) + 3) % chromaticScale.length
    let Maj3 = (chromaticScale.indexOf(note[0]) + 4) % chromaticScale.length
    let m7 = (chromaticScale.indexOf(note[0]) + 10) % chromaticScale.length
    let Maj7 = (chromaticScale.indexOf(note[0]) + 11) % chromaticScale.length

    if (array.includes(chromaticScale[fifth])) {
      if (array.includes(chromaticScale[m3])) {
        triadList.push(`${note[0]} Minor Triad`)
        if (array.includes(chromaticScale[m7])) {
          seventhChordList.push(`${note[0]} Minor 7`)
        }
      }

      if (array.includes(chromaticScale[Maj3])) {
        triadList.push(`${note[0]} Major Triad`)

        if (array.includes(chromaticScale[Maj7])) {
          seventhChordList.push(`${note[0]} Major 7`)
        }
        else if (array.includes(chromaticScale[m7])) {
          seventhChordList.push(`${note[0]} Dom 7`)
        }
      }
    }
  })

  console.log([triadList, seventhChordList])
  return [triadList, seventhChordList]

}





function scoreHand(noteList, txt, arg = 0, negTxt) {
  let topRepeating = noteList.filter((value, index, array) => value[1] == array[0][1])
  let handTxt

  if (topRepeating[0][1] > arg) {
    handTxt = topRepeating[0][1] + txt
  }
  else {
    handTxt = negTxt
  }

  topRepeating.forEach((elem) => handTxt += `${elem[0]}, ` )

  let handData = document.createElement("div")
  handData.classList.add("handType")
  handData.innerHTML = handTxt.slice(0, -2)
  handTypeDisplay.appendChild(handData)
}

function displayData(list, txt, parent) {
  if (list.length > 0) {
    let handTxt = txt
    list.forEach((elem) => handTxt += `${elem}, ` )
  
    let handData = document.createElement("div")
    handData.classList.add("handType")
    handData.innerHTML = handTxt.slice(0, -2)
    parent.appendChild(handData)

  }
}



//////////////////////  MAIN LOOP  //////////////////////

const gameboard = document.querySelector("#gameboard")
const players = document.querySelectorAll(".handOfCards")
const drawBtn = document.getElementById("drawBtn")
const playBtn = document.getElementById("playBtn")
const handTypeDisplay = document.querySelector("#handFlexBox")
const scoreDsiplay = document.querySelector("#score")

//let deck = buildMusicDeck(buildChromaticScaleEnharmonic(), 7)
let chromatic = buildChromaticScaleEnharmonic()

console.log(chromatic)
let currentScale = buildMajorScale("A")
let deck = buildMusicDeck(currentScale, 7)
let playerHand = []
let selectedCards = []

players.forEach((elem) => {fillHand(elem,10)})


//////////////////////  GAME EVENT LISTENERS  //////////////////////

playBtn.addEventListener("click", (e) => {
  removeChildrenDivs(handTypeDisplay)
  let octaveList = consolidateOcaves(getNotesCardDivArray(selectedCards), currentScale)
  console.log(octaveList)
  let sortedHand = sortByCount(octaveList).filter((value) => Number(value[1]) > 0)

  let intervalList = identifyIntervals(octaveList)
  console.log(intervalList)
  let chordList = identifyChords(octaveList)
  scoreHand(sortedHand, " octave of ", 1, "High note of ")
  scoreHand(intervalList, " Intervals of ")
  //scoreHand(chordList, " Chords of ")
  displayData(chordList[0], "Triads of ", handTypeDisplay)
  displayData(chordList[1], "Sevenths of ", handTypeDisplay)

})

drawBtn.addEventListener("click", (e) => {
  players.forEach((elem) => fillHand(elem,1))
})





//////////////////////  WINDOW EVENT LISTENERS  //////////////////////

window.addEventListener("resize", (e) => {
  players.forEach((elem) => resizeHand(elem))
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
*/


/** 
function createCircleOfFifth(intervalicLeap, accidental, numLeaps = 7) { // number of halfsteps. Perfect 5th is 7
  let cycleArray = [];
  let chromatic = buildChromaticScaleEnharmonic()

  for (let i = 0; i <= numLeaps; i++) {
    let currentNote = chromatic[(intervalicLeap * i)%chromatic.length].split("/")
    if (currentNote.length == 1) {
      cycleArray.push(currentNote[0])
    }
    else {
      if (accidental == "#") {
        cycleArray.push(currentNote[0])
      }
      else {
        cycleArray.push(currentNote[1])
      }
    }
  }
  return cycleArray
}


function findUnifiedAccidentalOld(key) {
  key = key.charAt(0).toUpperCase() + key.substring(1)
  if (key != "C") {
    let flatKeys = createCircleOfFifth(5, "b")
    let sharpKeys = createCircleOfFifth(7, "#")
  
    if (flatKeys.includes(key)) {
      return {accidental: "b", cycle: flatKeys}
    }
    else if (sharpKeys.includes(key))  {
      return {accidental: "#", cycle: sharpKeys}
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



function getAccidentalsInKeySigOld(accidental, numAccidentals) {
  let startIndex;
  let interval;
  let alphabet = "CDEFGAB";
  let accidentalList = []
  if (accidental == "#") {
    startIndex = alphabet.indexOf("F")
    interval = 4
  }
  else {
    interval = 3 //3
    startIndex = alphabet.indexOf("B")
  }
  accidentalList.push(alphabet[startIndex])
  for (let i = 0; i < numAccidentals - 1; i++) {
    startIndex += intervalicLeap;
    accidentalList.push(alphabet[startIndex % alphabet.length])
  }
  return accidentalList
}






function buildMajorScaleOld(key) {
  let alphabet = "CDEFGAB";
  let majorScale = []
  let accidentalObj = findUnifiedAccidental(key)
  if (accidentalObj != "error") {
    let accidentalList = getAccidentalsInKeySig(accidentalObj.accidental, accidentalObj.cycle.indexOf(key));
    let keyIndex = alphabet.indexOf(key[0])
    let currentScale = alphabet.substring(keyIndex) + alphabet.substring(0, keyIndex)
    for (let i = 0; i < 7; i++) {
      let currentNote = currentScale[i]
      accidentalList.forEach((elem) => {
        if (elem == currentScale[i] && accidentalObj.accidental != "none" ) {
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




function scoreOctaveHand(octaveList) {
  let topRepeatingOctaves = octaveList.filter((value, index, array) => value[1] == array[0][1])
  let handTxt = topRepeatingOctaves[0][1] + " octave of "
  topRepeatingOctaves.forEach((elem) => handTxt += `${elem[0]}, ` )
  handTypeDisplay.innerHTML = handTxt.slice(0, -2)
}

*/
