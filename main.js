const typed = new Typed('#typed-name', {
  strings: ["Tonghie", "CJ"],
  typeSpeed: 100,
  backSpeed: 50,
  backDelay: 1000,
  showCursor: true,
  cursorChar: '|',
  loop: true
});

const swiper = new Swiper('.swiper', {
    loop: true,
    spaceBetween: 20,
    centeredSlides: true,
    effect: 'coverflow',
    grabCursor: true,
    slidesPerView: 1,
    coverflowEffect: {
      rotate: 10,
      stretch: 0,
      depth: 200,
      modifier: 1,
      slideShadows: false,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
  });

document.addEventListener("DOMContentLoaded", function() {
  const form = document.getElementById("feedback-form");
  const sendButton = form.querySelector("button[type='submit']");

  emailjs.init("4uCGVPBz3H1dGhGwQ"); 
  form.addEventListener("submit", function(e) {
    e.preventDefault();

    sendButton.disabled = true;
    sendButton.innerText = "Sending...";

    emailjs.sendForm(
      "service_mqqndw9",      
      "template_et2og3p",      
      form
    )
    .then(() => {
      alert("Feedback sent! Thank you.");
      form.reset();
      sendButton.disabled = false;
      sendButton.innerText = "Send";
    }, (error) => {
      console.error("FAILED...", error);
      alert("Oops! Something went wrong.");
      sendButton.disabled = false;
      sendButton.innerText = "Send";
    });
  });
});

// GAME
const cube = document.getElementById('cube');
const startBtn = document.getElementById('start-btn');
const scoreEl = document.getElementById('score');
const container = document.getElementById('game-container');

let score = 0;
let cubeBottom = 80;
let isFlying = false;
let gravityInterval;
let obstacleInterval;
let obstacles = [];

function resetGame() {
  cubeBottom = 80;
  cube.style.bottom = cubeBottom + 'px';
  score = 0;
  scoreEl.textContent = 'Score: 0';
  obstacles.forEach(obs => obs.top.remove && obs.top.remove());
  obstacles.forEach(obs => obs.bottom.remove && obs.bottom.remove());
  obstacles = [];
  clearInterval(gravityInterval);
  clearInterval(obstacleInterval);
}

function startGame() {
  resetGame();

  gravityInterval = setInterval(() => {
    if (!isFlying) {
      cubeBottom -= 3;
      if (cubeBottom < 0) {
        cubeBottom = 0;
        endGame();
      }
      cube.style.bottom = cubeBottom + 'px';
    }
  }, 20);

  obstacleInterval = setInterval(createObstacle, 2000);
}

function flyCube() {
  cubeBottom += 40;
  if (cubeBottom > container.clientHeight - 50) cubeBottom = container.clientHeight - 50;
  cube.style.bottom = cubeBottom + 'px';
  isFlying = true;
  setTimeout(() => isFlying = false, 200);
}

function createObstacle() {
  const gap = 120; // gap between top and bottom obstacle
  const heightTop = Math.random() * (container.clientHeight - gap - 40) + 20;
  const heightBottom = container.clientHeight - gap - heightTop;

  const obsTop = document.createElement('div');
  obsTop.classList.add('obstacle');
  obsTop.style.height = `${heightTop}px`;
  obsTop.style.top = '0px';
  obsTop.style.right = '0px';
  container.appendChild(obsTop);

  const obsBottom = document.createElement('div');
  obsBottom.classList.add('obstacle');
  obsBottom.style.height = `${heightBottom}px`;
  obsBottom.style.bottom = '0px';
  obsBottom.style.right = '0px';
  container.appendChild(obsBottom);

  const obsPair = { top: obsTop, bottom: obsBottom };
  obstacles.push(obsPair);

  const move = setInterval(() => {
    let rightTop = parseInt(obsTop.style.right);
    rightTop += 5;
    obsTop.style.right = rightTop + 'px';
    obsBottom.style.right = rightTop + 'px';

    // Collision detection
    const cubeRect = cube.getBoundingClientRect();
    const topRect = obsTop.getBoundingClientRect();
    const bottomRect = obsBottom.getBoundingClientRect();

    if (
      (cubeRect.right > topRect.left && cubeRect.left < topRect.right && cubeRect.top < topRect.bottom) ||
      (cubeRect.right > bottomRect.left && cubeRect.left < bottomRect.right && cubeRect.bottom > bottomRect.top)
    ) {
      endGame();
      clearInterval(move);
    }

    if (rightTop > container.clientWidth) {
      obsTop.remove();
      obsBottom.remove();
      obstacles = obstacles.filter(o => o !== obsPair);
      score++;
      scoreEl.textContent = 'Score: ' + score;
      clearInterval(move);
    }
  }, 20);
}

function endGame() {
  alert('Game Over! Score: ' + score);
  resetGame();
}

startBtn.addEventListener('click', startGame);
document.addEventListener('keydown', (e) => { if (e.code === 'Space') flyCube(); });
document.addEventListener('click', flyCube);

