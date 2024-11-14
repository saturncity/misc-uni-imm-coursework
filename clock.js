const sec = document.getElementById('sec');
const min = document.getElementById('min');
const hour = document.getElementById('hour');

function update() {
    const now = new Date();
    const ms = now.getUTCMilliseconds();
    const s = now.getUTCSeconds();
    const m = now.getUTCMinutes();
    const h = now.getUTCHours();

    let offH = h + offsetSlider.value - 12;
    let offM = m +(thirtyOffsetCheckbox.checked ? 30 : 0) + (fifteenOffsetCheckbox.checked ? 15 : 0);
    if (offM >= 60) {
        offM -= 60;
        offH++;
    }

    sec.style.transform = `rotate(${(s+(ms/1000))/60}turn)`;
    min.style.transform = `rotate(${offM/60}turn)`;
    hour.style.transform = `rotate(${offH/12}turn)`;
}

let offsetSlider = document.getElementById("hourOffset")
let thirtyOffsetCheckbox = document.getElementById("thirtyMinOffset");
let fifteenOffsetCheckbox = document.getElementById("fifteenMinOffset");

update();
setInterval(update, 1);