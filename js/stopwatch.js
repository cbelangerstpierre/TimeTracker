import { getMilliseconds, getSeconds, getMinutes, getHours } from "./time.js";


export default class Stopwatch {
    constructor() {
        this.paused = true;
        this.timerStart = 0;
        this.additionalTime = 0;
        this.html = {
            stopwatch: document.getElementById('stopwatch'),
            hours: document.getElementById('hoursS'),
            minutes: document.getElementById('minutesS'),
            seconds: document.getElementById('secondsS'),
            milliseconds: document.getElementById('millisecondsS'),
            playPauseImg: document.getElementById('playPauseImgS')
        };
        this.watching = false;
    }

    playPauseImg() {
        this.paused = !this.paused;
        this.html.playPauseImg.src = this.paused ? 'images/play.png' : 'images/pause.png';
    }

    setTimerStart() {
        if (!this.paused && this.timerStart == 0) {
            this.timerStart = new Date().getTime();
            var intervalS = setInterval(() => {
                if (!this.paused && this.watching){
                    this.updateTime();}
            }, 1)
        }
        else if (this.paused) {
            this.additionalTime += new Date().getTime() - this.timerStart;
            this.timerStart = 0;
        }
    }

    resetTime() {
        this.timerStart = 0;
        this.additionalTime = 0;
        this.html.hours.innerText = '00:';
        this.html.minutes.innerText = '00:';
        this.html.seconds.innerText = '00.';
        this.html.milliseconds.innerText = '000';
        if (!this.paused)
            this.playPauseImg();
    }

    updateTime() {
        let timer = new Date().getTime() - this.timerStart + this.additionalTime;
        this.html.milliseconds.innerText = `${getMilliseconds(timer)}`;
        this.html.seconds.innerText = `${getSeconds(timer)}.`;
        this.html.minutes.innerText = `${getMinutes(timer)}:`;
        this.html.hours.innerText = `${getHours(timer)}:`;
    }
}