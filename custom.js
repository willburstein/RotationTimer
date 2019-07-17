let queueIndex = 0;
let timeRemaining = (startTime[0] * 60 * 1000) + (startTime[1] * 1000);
const writeable = document.getElementById("playing");
const timer = document.getElementById("time");
const audio = new Audio("alert.mp3");
const queue = prompt("Enter students (StudentA, StudentB, ...)", "Claire, Charlie, Alex, Adam, Ben, Caleb, Jack, Will, Jarret").split(", ");
const startTime = [prompt("Enter time interval per rotation in minutes", "30"), 0];
function setInner() {
  writeable.innerHTML = "Students " + (queue[queueIndex]) + ", " + (queue[queueIndex+1]) + ", and " + (queue[queueIndex+2]) + " are now playing";
}

document.getElementById("toggle").addEventListener("click", (e) => {
  e.preventDefault();
  const s = e.target;
  if (s.innerHTML == "Start") {
    audio.pause();
    startCycle();
    s.innerHTML = "Pause";
  }
  else {
    audio.play();
    clearInterval(i);
    s.innerHTML = "Start";
  }
});

function updateTimer() {
  let mins=0, secs=0;
  const raw = timeRemaining/60/1000;
  const dec = ("" + raw).split(".");
  if (dec.length == 2) {
    mins = dec[0];
    secs = parseInt(Math.round(parseFloat("." + dec[1]) * 60));
  }
  else {
    mins = raw;
  }
  timer.innerHTML = mins + 'm ' + secs + 's';
}
timer.innerHTML = startTime[0] + "m " + startTime[1] + "s";
setInner();
let i;
function startCycle() {
    i = setInterval(()=>{
    timeRemaining -= 1000;
    if (timeRemaining == 0) {
      queueIndex+=2;
      audio.currentTime = 0;
      audio.play();
      clearInterval(i);
      document.getElementById("toggle").innerHTML = "Start";
      timeRemaining = (startTime[0] * 60 * 1000) + (startTime[1] * 1000);
      setInner();
    }
    updateTimer();
  }, 1000);
}
