'use strict';

//selecting element from class and id
const activePlayer0 = document.querySelector('.tag--0');
const activePlayer1 = document.querySelector('.tag--1');
//dice
const dice = document.querySelector('.dice');

//player
const playerX = document.querySelectorAll('.player');
const playerElement0 = document.querySelector('.player--0');
const playerElement1 = document.querySelector('.player--1');

//scoring
const currentScoreElement0 = document.getElementById('current--0');
const currentScoreElement1 = document.getElementById('current--1');
const scoreElement0 = document.getElementById('score--0');
const scoreElement1 = document.getElementById('score--1');

const btnRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');

//initiate
const maxScore = 100;
let currentScore0 = 0;
let score0 = 0;
let currentScore1 = 0;
let score1 = 0;
let isAfterReset0 = false;
let isAfterReset1 = false;

initGame();

function initGame() {
  dice.classList.add('hidden');
  if (activePlayer0.classList.contains('hidden')) {
    activePlayer0.classList.remove('hidden');
    activePlayer1.classList.add('hidden');
  }
  if (!playerElement0.classList.contains('player--active')) {
    playerElement0.classList.add('player--active');
    playerElement1.classList.remove('player--active');
  }
  playerElement0.classList.remove('player--winner');
  playerElement1.classList.remove('player--winner');
  activePlayer0.textContent = 'ACTIVE';
  activePlayer1.textContent = 'ACTIVE';
  currentScoreElement0.textContent = 0;
  currentScoreElement1.textContent = 0;
  scoreElement0.textContent = 0;
  scoreElement1.textContent = 0;
  currentScore0 = 0;
  score0 = 0;
  currentScore1 = 0;
  score1 = 0;
}

function switchPlayer(isHold) {
  if (playerElement0.classList.contains('player--active')) {
    activePlayer1.classList.remove('hidden');
    activePlayer0.classList.add('hidden');
    playerElement0.classList.remove('player--active');
    playerElement1.classList.add('player--active');
    currentScore0 = isHold
      ? isAfterReset0
        ? score0 + currentScore0
        : currentScore0
      : 0;
    score0 = isHold ? currentScore0 : score0;
    scoreElement0.textContent = score0;
    currentScoreElement0.textContent = currentScore0;
    console.log(isHold, currentScore0, score0);
    isAfterReset0 = !isHold;
    if(score0 >= 20){
      playerElement0.classList.add('player--winner');
      activePlayer0.textContent = 'WINNER';
      Swal.fire({
        title: 'Player 1 Wins',
        confirmButtonText: 'OK',
        showCancelButton: true,
        icon : 'success'
      }).then(respose =>{
        if(respose.isConfirmed){
          initGame();
        }
      });
    }
  } else if (playerElement1.classList.contains('player--active')) {
    activePlayer0.classList.remove('hidden');
    activePlayer1.classList.add('hidden');
    playerElement1.classList.remove('player--active');
    playerElement0.classList.add('player--active');
    currentScore1 = isHold
      ? isAfterReset1
        ? score1 + currentScore1
        : currentScore1
      : 0;
    score1 = isHold ? currentScore1 : score1;
    scoreElement1.textContent = score1;
    currentScoreElement1.textContent = currentScore1;
    console.log(isHold, currentScore1, score1);
    isAfterReset1 = !isHold;
    if(score1 >= 20){
      activePlayer1.textContent = 'WINNER';
      playerElement1.classList.add('player--winner');
      Swal.fire({
        title: 'Player 2 Wins',
        confirmButtonText: 'OK',
        showCancelButton: true,
        icon : 'success'
      }).then(respose =>{
        if(respose.isConfirmed){
          initGame();
        }
      });
      
    }
  }
}

//handling roll button
btnRoll.addEventListener('click', function () {
  let randNum = Math.floor(Math.random() * 6) + 1;
  dice.classList.remove('hidden');
  dice.src = `img/dice-${randNum}.png`;
  if (randNum !== 1) {
    if (playerElement0.classList.contains('player--active')) {
      currentScore0 += randNum;
      currentScoreElement0.textContent = currentScore0;
    } else if (playerElement1.classList.contains('player--active')) {
      currentScore1 += randNum;
      currentScoreElement1.textContent = currentScore1;
    }
  } else {
    switchPlayer(false);
  }
});

//handling hold button
btnHold.addEventListener('click', function () {
  switchPlayer(true);
});


//handling new game button
btnNew.addEventListener('click', initGame);

