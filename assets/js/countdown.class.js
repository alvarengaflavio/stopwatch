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
}

function initializeCountdownVariables() {
  Countdown.setHour = document.querySelector("#hourCount");
  Countdown.setMinute = document.querySelector("#minuteCount");
  Countdown.setSecond = document.querySelector("#secondCount");
}
