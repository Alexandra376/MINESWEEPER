const body = document.querySelector('body');

const header = document.createElement('header');
header.className = 'header';
body.appendChild(header);

const headerContainer = document.createElement('div');
headerContainer.className = 'header-container';
body.appendChild(headerContainer);

const headerBox = document.createElement('div');
headerBox.className = 'header-box';
headerContainer.appendChild(headerBox);

const headerText = document.createElement('div');
headerText.className = 'header-text';
headerBox.appendChild(headerText);

const levelEasy = document.createElement('h3');
levelEasy.textContent = 'Easy';
headerText.appendChild(levelEasy);

const levelMedium = document.createElement('h3');
levelMedium.textContent = 'Medium';
headerText.appendChild(levelMedium);

const levelHard = document.createElement('h3');
levelHard.textContent = 'Hard';
headerText.appendChild(levelHard);

const sound = document.createElement('h3');
sound.textContent = '🔊';
sound.id = 'sound';
headerText.appendChild(sound);

const changeThema = document.createElement('h3');
changeThema.textContent = '🔆';
changeThema.id = 'thema';
headerText.appendChild(changeThema);

const headerGame = document.createElement('div');
headerGame.className = 'header-game';
headerBox.appendChild(headerGame);

const messageWin = document.createElement('div');
messageWin.className = 'header-win';
headerGame.appendChild(messageWin);

const messageLose = document.createElement('div');
messageLose.className = 'header-lose';
headerGame.appendChild(messageLose);

const headerCounter = document.createElement('div');
headerCounter.className = 'header-counter';
headerGame.appendChild(headerCounter);

const flag = document.createElement('h4');
flag.textContent = '🚩 10';
headerCounter.appendChild(flag);

const counter = document.createElement('h4');
counter.className = 'timer';
counter.textContent = "⏳ 000"
counter.id = 'timer';
headerCounter.appendChild(counter);

const newGame = document.createElement('button');
newGame.classList = 'header-newgame';
newGame.textContent = "New game";
headerCounter.appendChild(newGame);

const stuffBox = document.createElement('div');
stuffBox.className = 'header-stuffbox';
headerGame.appendChild(stuffBox);

const cellBox = document.createElement('div');
cellBox.className = 'header-cellbox';
stuffBox.appendChild(cellBox);

const gameField = document.createElement('div');
gameField.className = 'header-field';
cellBox.appendChild(gameField);

levelEasy.addEventListener('click', function() {
  startGame(10, 10, 1);
  flag.textContent = '🚩 10';
    cellBox.classList.add('easy');
    gameField.classList.add('easy');
    headerGame.classList.add('easy');
    cellBox.classList.remove('medium');
    gameField.classList.remove('medium');
    headerGame.classList.remove('medium');
    cellBox.classList.remove('hard');
    gameField.classList.remove('hard');
    headerGame.classList.remove('hard');
  });

levelMedium.addEventListener('click', function() {
  startGame(15, 15, 30);
  flag.textContent = '🚩 30';
  cellBox.classList.add('medium');
  gameField.classList.add('medium');
  headerGame.classList.add('medium');
  cellBox.classList.remove('easy');
  gameField.classList.remove('easy');
  headerGame.classList.remove('easy');
  cellBox.classList.remove('hard');
  gameField.classList.remove('hard');
  headerGame.classList.remove('hard');
});

levelHard.addEventListener('click', function() {   
  startGame(25, 25, 50);
  flag.textContent = '🚩 50';
  cellBox.classList.add('hard');
  gameField.classList.add('hard');
  headerGame.classList.add('hard');
  cellBox.classList.remove('medium');
  gameField.classList.remove('medium');
  headerGame.classList.remove('medium');
  cellBox.classList.remove('easy');
  gameField.classList.remove('easy');
  headerGame.classList.remove('easy');
});

const soundPlayer = document.getElementById('sound');
let isSoundEnabled = true;
soundPlayer.addEventListener('click', (event) => {
  if (isSoundEnabled) {
    soundPlayer.classList.add('checked')
    isSoundEnabled = false;
  } else {
    soundPlayer.classList.remove('checked')
    isSoundEnabled = true;
  }
});

function playFlagSound() {
  if (isSoundEnabled) {
    const audio = new Audio('./audio/flag_sound.mp3');
    audio.play();
  }
};

function playMineSound() {
  if (isSoundEnabled) {
    const audio1 = new Audio('./audio/mine.mp3');
    audio1.play();
  }
};

function playWinSound() {
  if (isSoundEnabled) {
    const audio2 = new Audio('./audio/win.mp3');
    audio2.play();
  }
};

function playCellSound() {
  if (isSoundEnabled) {
    const audio3 = new Audio('./audio/cells.mp3');
    audio3.play();
  }
};

startGame(10, 10, 10);
function startGame(WIDTH, HEIGHT, BOMBS_COUNT) {
  const field = document.querySelector('.header-field');
  const cellsCount = WIDTH * HEIGHT;
  field.innerHTML = '<button></button>'.repeat(cellsCount);
  const cells = [...field.children];

  let closedCount = cellsCount;
  let flaggedCount = 0;

  const bombs = [...Array(cellsCount).keys()]
  .sort(() => Math.random() - 0.5)
  .slice(0, BOMBS_COUNT);

  let timerInterval;
  let timeElapsed = 0;
  // let Intervaltimer;

  field.addEventListener('click', (event) => {
    if (timeElapsed === 0)
      // && !Intervaltimer) 
      {
      timerInterval = setInterval(updateTimer, 1000);
    }
    checkWinCondition();
  });

  const newGameButton = document.querySelector('.header-newgame');
  newGameButton.addEventListener('click', resetGame);

  function resetGame() {
    clearInterval(timerInterval);
    timerInterval = null;
    timeElapsed = 0;
    console.log('resetGame', timeElapsed)
    closedCount = cellsCount;
    flaggedCount = 0;
    flag.textContent = `🚩 ${BOMBS_COUNT}`;
    counter.textContent = `⏳ 000`;
    messageWin.classList.remove('show');
    messageLose.classList.remove('show');

    cells.forEach(cell => {
      cell.removeEventListener('click', cellClickHandler);
      cell.removeEventListener('contextmenu', cellContextMenuHandler);
      cell.innerHTML = '';
      cell.disabled = false;
    });

    startGame(WIDTH, HEIGHT, BOMBS_COUNT);
  }

  function updateTimer() {
    timeElapsed++;
    console.log('updateTimer', timeElapsed)
    const timerElement = document.getElementById('timer');
    timerElement.textContent = `⏳ ${formatTime(timeElapsed)}`;
  }

  function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${padZero(minutes)}:${padZero(seconds)}`;
  }

  function padZero(value) {
    return String(value).padStart(2, '0');
  }

  // function checkWinCondition() {
  //   if (closedCount <= BOMBS_COUNT || isAllFlagsCorrect()) {
  //     clearInterval(timerInterval);
  //     timerInterval = null;
  //   }
  // }

  field.addEventListener('click', (event) => {
    if (event.target.tagName !== 'BUTTON') {
      return;
    }
    const index = cells.indexOf(event.target);
    const column = index % WIDTH;
    const row = Math.floor(index / WIDTH);
    open(row, column);
    playCellSound();
  });

  field.addEventListener('contextmenu', (event) => {
    event.preventDefault();

    if (event.target.tagName !== 'BUTTON') {
      return;
    }
    const index = cells.indexOf(event.target);
    const column = index % WIDTH;
    const row = Math.floor(index / WIDTH);
    toggleFlag(row, column);
  });

  const thema = document.getElementById('thema');
  let isThemaLight = true;
  thema.addEventListener('click', (event) => {
  if (isThemaLight) {
    isThemaLight = false;
    headerCounter.classList.add('checked');
    headerCounter.classList.add('checked');
    headerGame.classList.add('checked');
    cellBox.classList.add('checked');
    newGame.classList.add('checked');
  } else {
    isThemaLight = true;
    headerCounter.classList.remove('checked');
    headerCounter.classList.remove('checked');
    headerGame.classList.remove('checked');
    cellBox.classList.remove('checked');
    newGame.classList.remove('checked');
  } 
});

  function isValid(row, column) {
    return row >= 0
    && row < HEIGHT
    && column >= 0
    && column < WIDTH;
  }

  function checkWinCondition() {
    if (closedCount <= BOMBS_COUNT || isAllFlagsCorrect()) {
      clearInterval(timerInterval);
      timerInterval = null;
      disableAllCells();
      playWinSound();
      messageWin.textContent = 'You found all mines!';
      messageWin.classList.add('show');
      return;
    }
  }

  function getCount(row, column) {
    let count = 0;
    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        if (isBomb(row + y, column + x)) {
          count++
        }
      }
    }
    return count;
  }

  function toggleFlag(row, column) {
    if (!isValid(row, column)) return;
  
    const index = row * WIDTH + column;
    const cell = cells[index];
  
    if (cell.disabled === true) return;
  
    if (cell.innerHTML === '') {
      if (flaggedCount < BOMBS_COUNT) {
        cell.innerHTML = '🚩';
        flaggedCount++;
        playFlagSound();
      }
    } else if (cell.innerHTML === '🚩') {
      cell.innerHTML = '';
      flaggedCount--;
    }
  
    updateFlagCounter();
  }
  
  function updateFlagCounter() {
    flag.textContent = `🚩 ${BOMBS_COUNT - flaggedCount}`;
  }

  function open(row, column) {
    if (!isValid(row, column)) return;

    const index = row * WIDTH + column;
    const cell = cells[index];

    if(cell.disabled === true) return;

    cell.disabled = true;

    if (isBomb(row, column)) {
      cell.innerHTML = '💣';
      showAllMines();
      highlightIncorrectFlags();
      disableAllCells();
      clearInterval(timerInterval);
      timerInterval = null;
      playMineSound();
      messageLose.textContent = 'Game over!!!';
      messageLose.classList.add('show');
      return;
    }

    closedCount--;
    if(closedCount <= BOMBS_COUNT) {
      disableAllCells();
      clearInterval(timerInterval);
      timerInterval = null;
      playWinSound();
      messageWin.textContent = 'You found all mines!';
      messageWin.classList.add('show');
      return;
    }

   const count = getCount(row, column);

  if (count !== 0) {
    const digit = document.createElement('span');
    digit.textContent = count;

    if (count === 1) {
      digit.className = 'blue';
    } else if (count === 2) {
      digit.className = 'green';
    } else if (count === 3) {
      digit.className = 'red';
    }
  
    cell.textContent = '';
    cell.appendChild(digit);
    return;
  }

  function showAllMines() {
    for (let i = 0; i < bombs.length; i++) {
      const bombIndex = bombs[i];
      const row = Math.floor(bombIndex / WIDTH);
      const column = bombIndex % WIDTH;
      const index = row * WIDTH + column;
      const cell = cells[index];
      if (!isFlagged(row, column)) {
        cell.innerHTML = '💣';
        cell.disabled = true;
      }
    }
    clearInterval(timerInterval);
    timerInterval = null;
  }
  
  function highlightIncorrectFlags() {
    for (let i = 0; i < cells.length; i++) {
      const row = Math.floor(i / WIDTH);
      const column = i % WIDTH;
      const cell = cells[i];
      if (isFlagged(row, column) && !isBomb(row, column)) {
        cell.style.backgroundColor = 'red'; 
        cell.disabled = true;
      }
    }
    clearInterval(timerInterval); 
    timerInterval = null;
  }

  function disableAllCells() {
    cells.forEach(cell => {
      cell.disabled = true;
    });
  }

   for (let x = -1; x <= 1; x++) {
    for (let y = -1; y <= 1; y++) {
      open(row + y, column + x);
    }
  }
  checkWinCondition(); 
}

function isFlagged(row, column) {
  if (!isValid(row, column)) return false;
  const index = row * WIDTH + column;
  const cell = cells[index];
  return cell.innerHTML === '🚩';
}

function isAllFlagsCorrect() {
  for (let i = 0; i < bombs.length; i++) {
    const bombIndex = bombs[i];
    const row = Math.floor(bombIndex / WIDTH);
    const column = bombIndex % WIDTH;
    if (!isFlagged(row, column)) {
      return false;
    }
  }
  return flaggedCount === BOMBS_COUNT;
}

  function isBomb(row, column) {
    if (!isValid(row, column)) return false;
    const index = row * WIDTH + column;

    return bombs.includes(index);
  }

  function cellClickHandler(event) {
    field.addEventListener('click', cellClickHandler);
  }

  function cellContextMenuHandler(event) {
    field.addEventListener('contextmenu', cellContextMenuHandler);
  }

cells.forEach(cell => {
  cell.addEventListener('click', cellClickHandler);
  cell.addEventListener('contextmenu', cellContextMenuHandler);
})
}


