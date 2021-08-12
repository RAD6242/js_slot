'use strict';

{
  class Reel {
    constructor(reel_index) {
      this.upper = document.createElement('div');
      this.upper.classList.add('reel_upper');
      this.upper.textContent = 1;
      this.upperNum = 0;
      
      this.center = document.createElement('div');
      this.center.classList.add('reel_center');
      this.center.textContent = 2;
      this.centerNum = 0;

      this.bottom = document.createElement('div');
      this.bottom.classList.add('reel_bottom');
      this.bottom.textContent = 3;
      this.bottomNum = 0;

      this.reels = [
        this.upper, 
        this.center, 
        this.bottom
      ];
      this.reels.forEach(el => {
        document.getElementById(`reel${reel_index}`).querySelector('.reel_inner').appendChild(el);
      });
      
      this.timerId = undefined;

      this.stop = document.getElementById(`stop${reel_index}`);
      this.stop.addEventListener('click', () => {
        this.pushStop();
      });
    }

    pushStop() {
      msgBox.textContent = '';

      if (!this.stop.classList.contains('stoping')){
        this.reelStop();
        focusChange();
        this.stop.classList.remove('focusBorder');
        if (stopLeft > 0) {
          stopLeft--;
        }
        if (stopLeft === 0) {
          resultCheck();
        }
      }
    }

    getReels() {
      return this.reels;
    };

    reelChange() {
      this.timerId = setTimeout(() => {
        const reelMax = 7;
        const reelMin = 1;

        this.upper.textContent = Math.floor(Math.random() * reelMax + reelMin) ;
        this.upperNum = this.upper.textContent;
        if(this.upperNum === '7') {
          this.colorChange(this.upper, 'red')
        } else {
          this.colorChange(this.upper, 'black')
        }

        this.center.textContent = Math.floor(Math.random() * reelMax + reelMin);
        this.centerNum = this.center.textContent;
        if(this.centerNum === '7') {
          this.colorChange(this.center, 'red')
        } else {
          this.colorChange(this.center, 'black')
        }

        this.bottom.textContent = Math.floor(Math.random() * reelMax + reelMin);
        this.bottomNum = this.bottom.textContent;
        if(this.bottomNum === '7') {
          this.colorChange(this.bottom, 'red')
        } else {
          this.colorChange(this.bottom, 'black')
        }

        this.reelChange();
      }, 50);
    };

    colorChange(reelCell, fontColor) {
      reelCell.style.color = fontColor;
    }

    reelStop() {
      clearTimeout(this.timerId);
      this.stop.classList.add('stoping');
    }

    reelInit() {
      this.stop.classList.remove('stoping');
    }
  };

  function resultCheck() {
    let resultFlag = 0;
    let getCoin = 0;

    if (reels[0].upperNum === reels[1].upperNum && reels[0].upperNum === reels[2].upperNum) {
      getCoin = numCheck(reels[0].upperNum, reels[1].upperNum, reels[2].upperNum, getCoin);
      resultFlag++;
      document.querySelector('.check_bar_upper').style.zIndex = 5;
    } 
    if (reels[0].centerNum === reels[1].centerNum && reels[0].centerNum === reels[2].centerNum ) {
      getCoin = numCheck(reels[0].centerNum, reels[1].centerNum, reels[2].centerNum, getCoin);
      resultFlag++;
      document.querySelector('.check_bar_center').style.zIndex = 5;
    }
    if (reels[0].bottomNum === reels[1].bottomNum && reels[0].bottomNum === reels[2].bottomNum) {
      getCoin = numCheck(reels[0].bottomNum, reels[1].bottomNum, reels[2].bottomNum, getCoin);
      resultFlag++;
      document.querySelector('.check_bar_bottom').style.zIndex = 5;
    }
    if (reels[0].upperNum === reels[1].centerNum && reels[0].upperNum === reels[2].bottomNum) {
      getCoin = numCheck(reels[0].upperNum, reels[1].centerNum, reels[2].bottomNum, getCoin);
      resultFlag++;
      document.querySelector('.check_bar_lurb').style.zIndex = 5;
    }
    if (reels[0].bottomNum === reels[1].centerNum && reels[0].bottomNum === reels[2].upperNum) {
      getCoin = numCheck(reels[0].bottomNum, reels[1].centerNum, reels[2].upperNum, getCoin);
      resultFlag++;
      document.querySelector('.check_bar_lbru').style.zIndex = 5;
    }
    if (resultFlag === 0) {
      msgBox.textContent += "Oh..BAD!!! LET'S RETRY!!";
    }

    haveCoin += getCoin;
    haveUpdate();
    getUpdate(getCoin);

    if (haveCoin < 3) {
      gameOver();
      msgBox.textContent = "YOU DON'T HAVE 3COINS...GAME OVER...";
      start.textContent = 'RETRY!';
      start.classList.remove('game_over');
    } else {
      gameOver();
      start.classList.remove('game_over');
    }
  };

  function numCheck(num1, num2, num3, getCoin) {
    if (num1 === '7' && num2 === '7' && num3 === '7') {
      msgBox.textContent = 'BONUS LUCKY 777!!!';
      getCoin += 100;
    } else {
      getCoin += num1 * 10;
      msgBox.textContent += `HIT!!! YOU GOT ${getCoin} COINS!!!`;
    }
    return getCoin;
  }

  function init() {
    for(let i = 0; i < 3; i++) {
      reels[i].upper.style.backgroundColor = 'inherit';
      reels[i].center.style.backgroundColor = 'inherit';
      reels[i].bottom.style.backgroundColor = 'inherit';
      reels[i].reelInit();
    }
    checkBars.forEach(bar => {
      bar.style.zIndex = -1;
    });
    haveUpdate();
  };

  function gameOverInit() {
    start.classList.remove('game_over');
    reels.forEach(reel => {
      reel.stop.classList.remove('game_over');
    });
  }

  function gameOver() {
    reels.forEach(reel => {
      reel.stop.classList.add('game_over');
    });
  }

  function haveUpdate() {
    haveCoinTxt.textContent = `HAVING : ${haveCoin}`;
  };

  function getUpdate(getCoin) {
    getCoinTxt.textContent = `GET : ${getCoin}`;
  };

  function focusChange() {  
    if (stopLeft > 0) {
      if (start.classList.contains('focusBorder')) {
        start.classList.remove('focusBorder');
        reels[0].stop.classList.add('focusBorder');
        reels[1].stop.classList.add('focusBorder');
        reels[2].stop.classList.add('focusBorder');
      }
    }
    if (stopLeft === 1) {
      start.classList.add('focusBorder');
    }
  }

  const reels = [new Reel(0), new Reel(1), new Reel(2)];
  const checkBars = [
    document.querySelector('.check_bar_upper'),
    document.querySelector('.check_bar_center'),
    document.querySelector('.check_bar_bottom'),
    document.querySelector('.check_bar_lbru'),
    document.querySelector('.check_bar_lurb'),
  ];

  const haveCoinTxt = document.getElementById('have_coin');
  const getCoinTxt = document.getElementById('get_coin');
  const msgBox = document.getElementById('msg_box');
  let stopLeft = 0;
  let inputCoin = 0;
  let haveCoin = 100;

  const start = document.getElementById('start');
  start.addEventListener('click', () => {
    if (haveCoin < 3) {
      haveCoin = 100;
      start.textContent = 'START';
    }

    msgBox.textContent = 'GAME START!';
    gameOverInit();

    start.classList.add('game_over');
    if (stopLeft == 0) {
      inputCoin = 3;
      stopLeft = 3;
      haveCoin -= inputCoin;
      haveUpdate();
    }
    getCoinTxt.textContent = "SLOT MACINE";
    focusChange();

    init();
    reels.forEach(reel => {
      clearTimeout(reel.timerId);
      reel.reelChange();
    })

  });
  
}