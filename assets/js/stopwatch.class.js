class StopWatch {
  constructor({ start, pause, reset, display, set, zero }) {
    this.start = 0;
    this.epasedTime = 0;
    this.currentTime = 0;
    this.paused = true;
    this.interval = null;
    this.isRunning = false;
    this.startButton = start;
    this.pauseButton = pause;
    this.resetButton = reset;
    this.setButton = set;
    this.zeroButton = zero;
    this.timeDisplay = display;
    this.time = { hours: 0, minutes: 0, seconds: 0 };
    this.countdown = { totalSeconds: 0, seconds: 0, tag: false };
  }

  updateTime() {
    this.currentTime = Date.now();
    this.epasedTime = this.currentTime - this.start;
    this.handleLocalStorageChange();

    if (!this.countdown.tag) {
      this.time.hours = Math.floor(this.epasedTime / 3600000);
      this.time.minutes = Math.floor((this.epasedTime % 3600000) / 60000);
      this.time.seconds = Math.floor((this.epasedTime % 60000) / 1000);

      this.displayTime(this.time);
      return;
    }

    const seconds = Math.floor(this.epasedTime / 1000);
    this.countdown.seconds = this.countdown.totalSeconds - seconds;
    if (this.countdown.seconds < 0) {
      this.soundAlarm();
      this.resetButton.click();
      return;
    }
    this.time.hours = Math.floor(this.countdown.seconds / 3600);
    this.time.minutes = Math.floor((this.countdown.seconds % 3600) / 60);
    this.time.seconds = Math.floor(this.countdown.seconds % 60);

    this.displayTime(this.time);
  }

  displayTime({ hours, minutes, seconds }) {
    function pad(number) {
      return number < 10 ? "0" + number : number;
    }

    this.timeDisplay.textContent = `${pad(hours)}:${pad(minutes)}:${pad(
      seconds
    )}`;
  }

  startTime() {
    if (!this.paused) return;
    this.setActiveElement(this.startButton);
    this.setNotActiveElement(this.pauseButton);
    this.startButton.innerText = "Resume";
    this.paused = false;
    this.countdown.tag
      ? (this.start = Date.now())
      : (this.start = Date.now() - this.epasedTime);
    this.interval = setInterval(() => {
      this.updateTime();
    }, 100);
    this.isRunning = true;
  }

  pauseTime() {
    if (!this.paused) {
      this.paused = true;
      this.setActiveElement(this.pauseButton);
      this.setNotActiveElement(this.startButton);
      clearInterval(this.interval);
      this.isRunning = false;
      /* if countdown is set, reset the total seconds to the current seconds */
      this.countdown.tag
        ? (this.countdown.totalSeconds = this.countdown.seconds)
        : "";
    }
  }

  resetTime() {
    clearInterval(this.interval);
    this.setNotActiveElement(this.setButton);
    this.setNotActiveElement(this.startButton);
    this.setNotActiveElement(this.pauseButton);
    this.deleteLocalStorage();
    this.start = 0;
    this.epasedTime = 0;
    this.currentTime = 0;
    this.paused = true;
    this.isRunning = false;
    this.countdown.tag = false;
    this.time.hours = 0;
    this.time.minutes = 0;
    this.time.seconds = 0;
    this.startButton.innerText = "Start";
    this.timeDisplay.textContent = "00:00:00";
  }

  setCountdown({ hours, minutes, seconds }) {
    if (this.isRunning) return;
    this.resetTime();
    const countdown = { hours, minutes, seconds };
    this.time = { ...countdown };
    this.countdown.totalSeconds = hours * 3600 + minutes * 60 + seconds;
    this.countdown.seconds = this.countdown.totalSeconds;
    this.countdown.tag = true;
    this.startButton.innerText = "Start";
    this.setActiveElement(this.setButton);
    this.displayTime(this.time);
  }

  setActiveElement(element) {
    if (element.classList.contains("active")) return;
    element.classList.add("active");
  }

  setNotActiveElement(element) {
    if (element.classList.contains("active"))
      element.classList.remove("active");
  }

  playSoundWithDelay(audio, ms, volume) {
    setTimeout(() => {
      audio.volume = volume;
      audio.play();
    }, ms);
  }

  soundAlarm() {
    const pacman = new Audio(
      "http://soundfxcenter.com/video-games/pacman/8d82b5_Pacman_Opening_Song_Sound_Effect.mp3"
    );
    const soundList = [pacman, pacman, pacman];
    soundList.map((sound, index) => {
      this.playSoundWithDelay(sound, index * 6500, 0.4 + index * 0.3);
    });
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
    this.setButton.addEventListener("click", () => {
      const setTime = Countdown.getCountDown(this.isRunning);
      if (!setTime) return;
      this.setCountdown(setTime);
    });
    this.zeroButton.addEventListener("click", () => {
      Countdown.zeroDisplay();
    });
  }

  /////////////////////////////// persistent clock area ///////////////////////////
  getCountDown() {
    return {
      epasedTime: this.epasedTime,
      time: this.time,
      countdown: this.countdown,
    };
  }

  handleLocalStorageChange() {
    localStorage.setItem("alvaStopwatch", JSON.stringify(this.getCountDown()));
  }

  loadLocalStorage() {
    const stopWatchLocal = localStorage.getItem("alvaStopwatch");
    if (!stopWatchLocal) return;
    const stopWatch = JSON.parse(stopWatchLocal);
    this.setLocalToStopwatch(stopWatch);
    this.displayTime(this.time);

    stopWatch.countdown.tag && this.setCountdown(stopWatch.time);

    this.startTime();
  }

  setLocalToStopwatch(localStopWatch) {
    this.epasedTime = localStopWatch.epasedTime;
    this.time = localStopWatch.time;
    this.countdown = localStopWatch.countdown;
  }

  deleteLocalStorage() {
    localStorage.removeItem("alvaStopwatch");
  }
}
