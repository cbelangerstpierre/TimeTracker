import Sound from "./sound.js";
import { timeChange, getSeconds, getMinutes, getHours } from "./time.js";


export default class Timer {
    constructor() {
        this.html = {
            timer: document.getElementById('timer'),
            playPauseImg: document.getElementById('playPauseImgT'),
            setTime: document.getElementById('setTime'),
            time: document.getElementById('timeT'),
            input: {
                hours: document.getElementById('hoursInputT'),
                minutes: document.getElementById('minutesInputT'),
                seconds: document.getElementById('secondsInputT')
            },
            eachTime: {
                hours: document.getElementById('hoursT'),
                minutes: document.getElementById('minutesT'),
                seconds: document.getElementById('secondsT')
            }
        };
        this.watching = true;
        this.mySound = new Sound('sounds/timer.mp3');
        this.paused = true;
        this.timerStarted = false;
        this.alarm;
        this.time;
        this.startingTime;
        this.coutdowm;
        this.additionalTime = 0;
        this.timerFinished = 0;
        // this.dei = setInterval(() => {
        //     console.log(this.calculateTimeLeft())
        // }, 100);
    }

    playPauseImg() {
        if (!this.timerFinished) {
            this.paused = !this.paused;
            this.html.playPauseImg.src = this.paused ? 'images/play.png' : 'images/pause.png';
            this.showTimer();
            if (this.paused)
                this.pauseTimer();
            else
                this.setTimerStart();
        }
    }

    showTimer() {
        this.html.setTime.style.display = 'none';
        this.html.time.style.display = 'flex';
    }

    pauseTimer() {
        clearTimeout(this.alarm);
        clearInterval(this.coutdown);
        this.additionalTime = this.time - this.calculateTimeLeft();
    }

    setTimerStart() {
        this.time = parseInt(this.html.input.hours.value) * 3600000 + parseInt(this.html.input.minutes.value) * 60000 + parseInt(this.html.input.seconds.value) * 1000;
        this.startingTime = new Date().getTime();
        this.timerStarted = true;
        this.alarm = setTimeout(() => {
            this.mySound.reset();
            this.mySound.play();
            this.mySound.loop();
            this.timerFinished = true;
        }, this.calculateTimeLeft());

        this.coutdown = setInterval(() => {
            if (this.calculateTimeLeft() < 0)
                clearInterval(this.coutdown);
            else {
                this.updateTimer();
            }
        }, 10)

        this.updateTimer();

    }

    updateTimer() {
        let timeLeft = this.calculateTimeLeft();

        this.html.eachTime.seconds.innerText = `${getSeconds(timeLeft)}`;
        this.html.eachTime.minutes.innerText = `${getMinutes(timeLeft)}:`;
        this.html.eachTime.hours.innerText = `${getHours(timeLeft)}:`;
    }
    
    calculateTimeLeft() {
        let t = this.time - (new Date().getTime() - this.startingTime + this.additionalTime);
        if (t < 0)
            t = 0;
        return t;
    }

    resetTime() {
        this.timerFinished = false;
        this.mySound.stop();
        this.mySound.unloop();
        if (!this.paused)
            this.playPauseImg();
        this.html.setTime.style.display = 'flex';
        this.timerStarted = false;
        if (this.alarm != undefined) {
            clearTimeout(this.alarm);
            this.alarm = undefined;
        }
        this.html.time.style.display = 'none';
        this.additionalTime = 0;
        this.time = undefined;
        this.startingTime = undefined;
    }

    onChangeInput() {
        timeChange(this.html.input);
    }
}