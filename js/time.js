export function getMilliseconds(time) {
    return String(time % 1000).padStart(3, '0');
}

export function getSeconds(time) {
    return String(Math.floor(time / 1000) % 60).padStart(2, '0');
}

export function getMinutes(time) {
    return String(Math.floor(time / 60000) % 60).padStart(2, '0');
}

export function getHours(time) {
    return String(Math.floor(time / 3600000)).padStart(2, '0');
}

export function timeChange(arr) {
    for (let e in arr) {
        let val = arr[e];
        if (val.value != "") {
            if (parseInt(val.value) > parseInt(val.max)) {
                val.value = val.max;
            } else if (parseInt(val.value) < parseInt(val.min)) {
                val.value = val.min;
            }
        } else {
            val.value = '0';
        }
        if (parseInt(val.value == NaN))
            val.value = '00';
        else
            val.value = (parseInt(val.value) < 10 ? '0' : '') + parseInt(val.value);
    }
}
