const main = () => {
  const timeDisplay = document.querySelector("#time-display");
  const startButton = document.querySelector("#startButton");
  const pauseButton = document.querySelector("#pauseButton");
  const resetButton = document.querySelector("#resetButton");
  const setButton = document.querySelector("#setButton");

  const stopWatch = new StopWatch({
    start: startButton,
    pause: pauseButton,
    reset: resetButton,
    display: timeDisplay,
    set: setButton,
  });

  stopWatch.setButtonEvents();
};
main();
