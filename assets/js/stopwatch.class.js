class StopWatch {
  constructor({ start, pause, reset, display }) {
    this.start = 0;
    this.epasedTime = 0;
    this.currentTime = 0;
    this.paused = true;
    this.interval = null;
    this.isRunning = false;
    this.hours = 0;
    this.minutes = 0;
    this.seconds = 0;
    this.startButton = start;
    this.pauseButton = pause;
    this.resetButton = reset;
    this.timeDisplay = display;
  }

  updateTime() {
    this.currentTime = Date.now();
    this.epasedTime = this.currentTime - this.start;
    this.hours = Math.floor(this.epasedTime / 3600000);
    this.minutes = Math.floor((this.epasedTime % 3600000) / 60000);
    this.seconds = Math.floor((this.epasedTime % 60000) / 1000);

    this.timeDisplay.textContent = `${pad(this.hours)}:${pad(
      this.minutes
    )}:${pad(this.seconds)}`;

    function pad(number) {
      return number < 10 ? "0" + number : number;
    }
  }

  startTime() {
    if (this.paused) {
      this.paused = false;
      this.start = Date.now() - this.epasedTime;
      this.interval = setInterval(() => {
        this.updateTime();
      }, 1000);
      this.isRunning = true;
    }
  }

  pauseTime() {
    if (!this.paused) {
      this.paused = true;
      clearInterval(this.interval);
      this.isRunning = false;
    }
  }

  resetTime() {
    clearInterval(this.interval);
    this.start = 0;
    this.epasedTime = 0;
    this.currentTime = 0;
    this.paused = true;
    this.isRunning = false;
    this.hours = 0;
    this.minutes = 0;
    this.seconds = 0;
    this.timeDisplay.textContent = "00:00:00";
  }

  setButtonEvents() {
    this.startButton.addEventListener("click", () => {
      this.startTime();
    });
    this.pauseButton.addEventListener("click", () => {
      this.pauseTime();
    });
    this.resetButton.addEventListener("click", () => {
      this.resetTime();
    });
  }
}
