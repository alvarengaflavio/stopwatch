class Countdown {
  static validadeCountDown = ({ hours, minutes, seconds }) => {
    if (hours < 0 || minutes < 0 || seconds < 0) return false;
    if (hours > 24 || minutes > 60 || seconds > 60) return false;
    if (isNaN(hours) || isNaN(minutes) || isNaN(seconds)) return false;
    if (!hours && !minutes && !seconds) return false;
    if (hours === "" || minutes === "" || seconds === "") return false;
    return true;
  };

  static getCountDown = () => {
    const hours = parseInt(this.setHour.value);
    const minutes = parseInt(this.setMinute.value);
    const seconds = parseInt(this.setSecond.value);
    if (!this.validadeCountDown({ hours, minutes, seconds })) {
      alert("Invalid Timer values!");
      return false;
    }
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
}

function initializeCountdownVariables() {
  Countdown.setHour = document.querySelector("#hourCount");
  Countdown.setMinute = document.querySelector("#minuteCount");
  Countdown.setSecond = document.querySelector("#secondCount");
}
