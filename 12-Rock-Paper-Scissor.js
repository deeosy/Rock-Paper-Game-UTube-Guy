let score = JSON.parse(localStorage.getItem('score')) || {
    wins: 0,
    losses: 0,
    ties: 0,
};

updateScoreElement();
// another greater shortcut for writing the code below is by using the default operator above this comment which means if not true then false
//u can also write the below code as if (!score) {}

/*
let score = JSON.parse(localStorage.getItem('score'));
if (score === null) {
  score = {
    wins: 0,
    losses: 0,
    ties: 0,
  }
} */    

let isAutoPlay = false;
let intervalId;

// we created the autoplay function 
function autoPlay() {
  if(!isAutoPlay){
    // set interval to 1000ms and saved it to a variable 'intervalId'. this allows us to stop the autoplay by using clearInterval() like on line #34
    intervalId = setInterval(() => {
      //assigned a new playerMove which automatically picks from the random number function of the computer move and then insert the playmove in the playGame function to start playing the game.
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1000);
    isAutoPlay = true;
  } else{
    clearInterval(intervalId);
    isAutoPlay = false;
  }
}

function playGame(playerMove) {
  const computerMove = pickComputerMove();
  let result = '';
  
  if (playerMove === 'Scissors') {
    if (computerMove === 'Scissors') {
      result = 'Tie.';
    } else if (computerMove === 'Rock') {
      result = 'You lose.';
    } else if (computerMove === 'Paper') {
      result = 'You win.';
    }

  } else if (playerMove === 'Paper') {
    if (computerMove === 'Paper') {
      result = 'Tie.';
    } else if (computerMove === 'Rock') {
      result = 'You win.';
    } else if (computerMove === 'Scissors') {
      result = 'You lose.';
    }
    
  } else if (playerMove === 'Rock') {
    if (computerMove === 'Rock') {
      result = 'Tie.';
    } else if (computerMove === 'Paper') {
      result = 'You lose.';
    } else if (computerMove === 'Scissors') {
      result = 'You win.'
    }
  }

  if (result === 'You win.') {
    score.wins += 1;
  } else if (result === 'You lose.') {
    score.losses += 1;
  } else if (result === 'Tie.') {
    score.ties += 1;
  }

  localStorage.setItem('score', JSON.stringify(score));

  updateScoreElement();

  document.querySelector('.js-result')
    .innerHTML = result;

  document.querySelector('.js-moves')
    .innerHTML = `You <img src="./images/${playerMove}-image-js.png" alt="" class="image"> <img src="./images/${computerMove}-image.png" alt="" class="image"> Computer`;

  //       alert(`You have picked ${playerMove}. Computer picked ${computerMove}. ${result}
  // Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`); 
};

function updateScoreElement() {
  document.querySelector('.js-score')
    .innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

function pickComputerMove() {
  const randomNumber = Math.random();

  let computerMove = '';

  if (randomNumber >= 0 && randomNumber < (1/3)) {
    computerMove = 'Rock';
  } else if (randomNumber >= (1/3) && randomNumber < (2/3)) {
    computerMove = 'Paper';
  } else if (randomNumber >= (2/3) && randomNumber <1) {
    computerMove = 'Scissors';
  }
  
  return computerMove;
  // trying return statements. Return lets us get a value of a function. Note: return statement ends the function immediately so anything written below it in the function will not work. the value of the return is sent to a different part of the code or where it has been called at.
  // return 5;
  // return 'rock';
}