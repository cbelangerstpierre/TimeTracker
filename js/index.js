import Main from "./main.js";

var s = new Main();
document.getElementById('alarmButton').addEventListener('click', () => {
    s.showAlarm();
})
document.getElementById('timerButton').addEventListener('click', () => {
    s.showTimer();
})
document.getElementById('stopwatchButton').addEventListener('click', () => {
    s.showStopwatch();
})
document.getElementById('playS').addEventListener('click', () => {
    s.stopwatch.playPauseImg();
    s.stopwatch.setTimerStart();
})
document.getElementById('resetS').addEventListener('click', () => {
    s.stopwatch.resetTime();
})
document.getElementById('playT').addEventListener('click', () => {
    s.timer.playPauseImg();
})
document.getElementById('resetT').addEventListener('click', () => {
    s.timer.resetTime();
})
document.getElementById('hoursInputT').addEventListener('input', () => {
    s.timer.onChangeInput();
})
document.getElementById('minutesInputT').addEventListener('input', () => {
    s.timer.onChangeInput();
})
document.getElementById('secondsInputT').addEventListener('input', () => {
    s.timer.onChangeInput();
})
document.getElementById('setResetButtonA').addEventListener('click', () => {
    s.alarm.setResetImg();
})
document.getElementById('monthsInputA').addEventListener('input', () => {
    s.alarm.onChangeInput();
})
document.getElementById('daysInputA').addEventListener('input', () => {
    s.alarm.onChangeInput();
})
document.getElementById('hoursInputA').addEventListener('input', () => {
    s.alarm.onChangeInput();
})
document.getElementById('minutesInputA').addEventListener('input', () => {
    s.alarm.onChangeInput();
})


