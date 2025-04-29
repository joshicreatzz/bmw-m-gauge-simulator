let rpm = 0;
let gear = 0;
const maxRPM = 8000;
const redline = 7000;
const needle = document.getElementById('needle');
const rpmReadout = document.getElementById('rpm');
const gearDisplay = document.getElementById('gear');
const revSound = document.getElementById('rev-sound');
const shiftSound = document.getElementById('shift-sound');
const idleSound = document.getElementById('idle-sound');
idleSound.volume = 0.3;
idleSound.play();

function updateGauge() {
  const angle = (rpm / maxRPM) * 270 - 135;
  needle.style.transform = `rotate(${angle}deg)`;
  rpmReadout.textContent = `${rpm} RPM`;
  gearDisplay.textContent = gear === 0 ? 'N' : gear;
}

function revEngine() {
  if (rpm < maxRPM) {
    rpm += 500;
    revSound.currentTime = 0;
    revSound.play();
    if (rpm >= redline) {
      rpm = 1000;
      gear++;
      shiftSound.currentTime = 0;
      shiftSound.play();
    }
  }
  updateGauge();
}

function slowEngine() {
  if (rpm > 0) {
    rpm -= 500;
    if (rpm <= 1000 && gear > 1) {
      gear--;
      shiftSound.currentTime = 0;
      shiftSound.play();
    }
  }
  updateGauge();
}

document.addEventListener('keydown', e => {
  if (e.key === 'ArrowUp') {
    revEngine();
  } else if (e.key === 'ArrowDown') {
    slowEngine();
  }
});

updateGauge();
