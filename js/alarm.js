import { timeChange } from "./time.js";
import Sound from "./sound.js";


export default class Alarm {
    constructor() {
        this.html = {
            alarm: document.getElementById('alarm'),
            setResetImg: document.getElementById('setResetImgA'),
            setTime: document.getElementById('setTimeA'),
            text: document.getElementById('textA'),
            input: {
                year: document.getElementById('yearsInputA'),
                month: document.getElementById('monthsInputA'),
                day: document.getElementById('daysInputA'),
                hour: document.getElementById('hoursInputA'),
                minute: document.getElementById('minutesInputA')
            },
            date: document.getElementById('dateA')
        }
        this.watching = false;
        this.setting = true;
        this.html.input.year.value = new Date().getFullYear();
        this.html.input.month.value = new Date().getMonth() + 1;
        this.html.input.day.value = new Date().getDate();
        this.html.input.hour.value = new Date().getHours();
        this.html.input.minute.value = new Date().getMinutes();
        this.onChangeInput();
        this.mySound = new Sound('sounds/timer.mp3');
        this.alarmRinging = false;
    }

    setAlarm() {
        this.alarm = setTimeout(() => {
            this.mySound.play();
            this.mySound.loop();
            this.alarmRinging = true;
            clearTimeout(this.alarm);
        }, this.calculateTimeLeft());
    }

    updateHTML() {
        var months = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"];
        this.html.date.innerText = `${this.html.input.day.value} \
        ${months[this.html.input.month.value - 1]} \
        ${this.html.input.year.value} at \
        ${this.html.input.hour.value}:${this.html.input.minute.value}`;
    }

    setResetImg() {
        if ((this.setting && this.possibleDate()) || !this.setting) {
            this.setting = !this.setting;
            this.html.setResetImg.src = this.setting ? 'images/correct.png' : 'images/reset.png';
            if (this.setting) {
                this.html.text.style.display = 'none';
                this.html.setTime.style.display = 'flex';
                if (this.alarmRinging)
                    this.reset();
            } else {
                this.html.text.style.display = 'flex';
                this.html.setTime.style.display = 'none';
                this.updateHTML();
                this.setAlarm();
            }
        }
    }

    reset(){
        this.alarmRinging = false;
        this.mySound.stop();
        this.mySound.unloop();
        this.mySound.reset();
    }

    possibleDate() {
        if (this.html.input.month.value == 0 || this.html.input.day.value == 0)
            return false;
        return this.calculateTimeLeft() > 0;
    }

    calculateTimeLeft() {
        let year = this.html.input.year.value;
        let month = this.html.input.month.value;
        let day = this.html.input.day.value;
        let hour = this.html.input.hour.value;
        let minute = this.html.input.minute.value;
        return new Date(year, month - 1, day, hour, minute).getTime() -  new Date().getTime();
    }

    onChangeInput() {
        timeChange(this.html.input);
    }
}