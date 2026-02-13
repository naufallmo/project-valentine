const yesBtn = document.getElementById('yes');
const noBtn = document.getElementById('no');
const tease = document.getElementById('tease');
const question = document.getElementById('question');
const result = document.getElementById('result');

let yesSize = 18;
const texts = ["yakin?", "masa iya?", "aku tunggu loh"];
let textIndex = 0;

// No button - Run
noBtn.addEventListener('click', () => {
  yesSize += 5;
  yesBtn.style.fontSize = yesSize + 'px';
  
  const x = (Math.random() - 0.5) * 200;
  const y = (Math.random() - 0.5) * 150;
  noBtn.style.transform = `translate(${x}px, ${y}px)`;
  
  tease.textContent = texts[textIndex];
  textIndex = (textIndex + 1) % texts.length;
});

// No button - Tidak tersentuh (desktop)
if (window.innerWidth > 768) {
  noBtn.addEventListener('mouseenter', () => {
    const x = (Math.random() - 0.5) * 180;
    const y = (Math.random() - 0.5) * 130;
    noBtn.style.transform = `translate(${x}px, ${y}px)`;
  });
}

// Yes button Result
yesBtn.addEventListener('click', () => {
  question.classList.add('hidden');
  result.classList.remove('hidden');
  window.scrollTo({ top: result.offsetTop, behavior: 'smooth' });
  
  startCountdown();

  playBackgroundMusic();
});

function playBackgroundMusic() {
  const audio = new Audio();
  audio.src = 'music/penjagaHati.mp3';
  audio.volume = 0.4;
  audio.loop = true;

  audio.play().catch(() => {
    document.body.addEventListener('click', () => {
      audio.play();
    }, { once: true });
  });
}
// Countdown Timer
function startCountdown() {
  const anniversary = new Date('2026-03-05T00:00:00').getTime();
  
  function updateCountdown() {
    const now = new Date().getTime();
    const distance = anniversary - now;
    
    if (distance < 0) {
      document.getElementById('days').textContent = '0';
      document.getElementById('hours').textContent = '0';
      document.getElementById('minutes').textContent = '0';
      document.getElementById('seconds').textContent = '0';
      document.querySelector('.countdown-text').textContent = 'Happy Anniversary! 🎉💕';
      return;
    }
    
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    document.getElementById('days').textContent = days;
    document.getElementById('hours').textContent = hours;
    document.getElementById('minutes').textContent = minutes;
    document.getElementById('seconds').textContent = seconds;
  }
  
  updateCountdown();
  setInterval(updateCountdown, 1000);
}

// Background hati
const canvas = document.getElementById('bgCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

let scale = 8;
let angle = 0;

function drawHeart() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  ctx.save();
  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.scale(scale, -scale);
  
  ctx.beginPath();
  for (let t = 0; t <= Math.PI * 2; t += 0.01) {
    const x = 16 * Math.pow(Math.sin(t), 3);
    const y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
    
    if (t === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  
  ctx.closePath();
  ctx.strokeStyle = 'rgba(255, 50, 120, 0.5)';
  ctx.lineWidth = 0.3;
  ctx.shadowBlur = 15;
  ctx.shadowColor = '#ff2e63';
  ctx.stroke();
  ctx.restore();
  
  scale = 8 + Math.sin(angle) * 0.5;
  angle += 0.03;
  
  requestAnimationFrame(drawHeart);
}

drawHeart();