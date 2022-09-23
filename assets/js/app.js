const main = () => {
  const timeDisplay = document.querySelector("#time-display");
  const startButton = document.querySelector("#startButton");
  const pauseButton = document.querySelector("#pauseButton");
  const resetButton = document.querySelector("#resetButton");
  const setButton = document.querySelector("#setButton");
  const zeroButton = document.querySelector("#zeroButton");

  const stopWatch = new StopWatch({
    start: startButton,
    pause: pauseButton,
    reset: resetButton,
    display: timeDisplay,
    set: setButton,
    zero: zeroButton,
  });

  initializeCountdownVariables();
  stopWatch.setButtonEvents();
  stopWatch.loadLocalStorage();
};
main();
