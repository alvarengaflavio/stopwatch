class Countdown {
  static validadeCountDown = ({ hours, minutes, seconds }) => {
    if (hours < 0 || minutes < 0 || seconds < 0) return false;
    if (hours > 24 || minutes > 60 || seconds > 60) return false;
    if (isNaN(hours) || isNaN(minutes) || isNaN(seconds)) return false;
    if (!hours && !minutes && !seconds) return false;
    if (hours === "" || minutes === "" || seconds === "") return false;
    return true;
  };

  static messageToast = (message) => {
    this.setToast.innerText = message;
    this.setToast.classList.toggle("active");
    setTimeout(() => {
      this.setToast.classList.toggle("active");
    }, 3000);
  };

  static getCountDown = (isRunning = false) => {
    if (isRunning) {
      this.messageToast("Please Stop Timer...");
      return false;
    }
    const hours = parseInt(this.setHour.value);
    const minutes = parseInt(this.setMinute.value);
    const seconds = parseInt(this.setSecond.value);
    if (!this.validadeCountDown({ hours, minutes, seconds })) {
      this.messageToast("Invalid Timer Value!");
      return false;
    }
    this.messageToast("Alarm Setted! Press Start");
    return { hours, minutes, seconds };
  };

  static validadeNumber = (value) => {
    if (isNaN(value)) return false;
    if (value < 0) return false;
    if (value === "") return false;
    return true;
  };

  static stepUp = (document) => {
    const number = parseInt(document.value);
    !this.validadeNumber(number)
      ? (document.value = 0)
      : number < 60
      ? document.value++
      : (document.value = 0);
  };

  static stepDown = (document) => {
    const number = parseInt(document.value);
    !this.validadeNumber(number)
      ? (document.value = 0)
      : number > 0
      ? document.value--
      : (document.value = 0);
  };

  static zeroDisplay = () => {
    this.setHour.value = 0;
    this.setMinute.value = 0;
    this.setSecond.value = 0;
  };
}

function initializeCountdownVariables() {
  Countdown.setHour = document.querySelector("#hourCount");
  Countdown.setMinute = document.querySelector("#minuteCount");
  Countdown.setSecond = document.querySelector("#secondCount");
  Countdown.setToast = document.querySelector("#msgToast");
}
