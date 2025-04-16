import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const input = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('button[data-start]');
const daysValue = document.querySelector('.value[data-days]');
const hoursValue = document.querySelector('.value[data-hours]');
const minutesValue = document.querySelector('.value[data-minutes]');
const secondsValue = document.querySelector('.value[data-seconds]');
let userSelectedDate;
let timer;
let intervalValue;

input.classList.add('textInput');
startBtn.classList.add('buttonList');
document.addEventListener('DOMContentLoaded', () => (startBtn.disabled = true));

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    userSelectedDate = selectedDates[0];
    timer = selectedDates[0] - new Date();
    if (selectedDates[0] - new Date() < 0) {
      iziToast.show({
        message: 'Please choose a date in the future',
        position: 'bottomRight',
      });
      startBtn.disabled = true;
      return;
    } else {
      userSelectedDate = selectedDates[0];
      startBtn.disabled = false;
    }
  },
};
flatpickr(input, options);

startBtn.addEventListener('click', handleClick);

function handleClick(event) {
  input.disabled = true;
  startBtn.disabled = true;
  timerCountdown(convertMs(timer));

  intervalValue = setInterval(() => {
    const currentTime = Date.now();
    let deltaTime = userSelectedDate - currentTime;
    const time = convertMs(deltaTime);
    if (deltaTime <= 999) {
      clearInterval(intervalValue);
      input.disabled = false;
    }
    timerCountdown(time);
  }, 1000);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function timerCountdown({ days, hours, minutes, seconds }) {
  daysValue.textContent = addLeadingZero(days);
  hoursValue.textContent = addLeadingZero(hours);
  minutesValue.textContent = addLeadingZero(minutes);
  secondsValue.textContent = addLeadingZero(seconds);
}
