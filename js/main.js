import Alarm from './alarm.js'
import Timer from './timer.js';
import Stopwatch from './stopwatch.js';


export default class Main {
    alarm = null;
    timer = null;
    stopwatch = null;

    constructor() {
        this.alarm = new Alarm();
        this.timer = new Timer();
        this.stopwatch = new Stopwatch();
    }
    
    showAlarm() {
        this.hideAll();
        this.alarm.html.alarm.style.display = 'flex';
        this.alarm.watching = true;
    }
    
    showTimer() {
        this.hideAll();
        this.timer.html.timer.style.display = 'flex';
        this.timer.watching = true;
    }
    
    showStopwatch() {
        this.hideAll();
        this.stopwatch.html.stopwatch.style.display = 'flex';
        this.stopwatch.watching = true;
    }

    hideAll() {
        this.timer.html.timer.style.display = 'none';
        this.alarm.html.alarm.style.display = 'none';
        this.stopwatch.html.stopwatch.style.display = 'none';
        this.stopwatch.watching = false;
        this.alarm.watching = false;
        this.timer.watching = false;
    }
}