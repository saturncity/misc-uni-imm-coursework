const localSec = document.getElementById('localSec');
const localMin = document.getElementById('localMin');
const localHour = document.getElementById('localHour');
const localTimeDisplay = document.getElementById('localTimeDisplay');
const localTimezoneDisplay = document.getElementById('localTimezoneDisplay');

const offsetSec = document.getElementById('offsetSec');
const offsetMin = document.getElementById('offsetMin');
const offsetHour = document.getElementById('offsetHour');
const offsetTimeDisplay = document.getElementById('offsetTimeDisplay');
const offsetTimezoneDisplay = document.getElementById('offsetTimezoneDisplay');
const offsetDaySup = document.getElementById('offsetDaySup');

const offsetSlider = document.getElementById("hourOffset");
const thirtyOffsetCheckbox = document.getElementById("thirtyMinOffset");
const fifteenOffsetCheckbox = document.getElementById("fifteenMinOffset");

function updateClock() {
    const now = new Date();
    const ms = now.getUTCMilliseconds();
    const s = now.getUTCSeconds() + ms / 1000;
    const m = now.getUTCMinutes() + s / 60;
    const h = now.getUTCHours() + m / 60;

    // Update local clock hands
    const localSecRotation = s * 6; // 360° / 60s = 6° per second
    const localMinRotation = m * 6; // 360° / 60m = 6° per minute
    const localHourRotation = (h % 12) * 30 + (m / 60) * 30; // Fractional hour based on minutes
    localSec.style.transform = `rotate(${localSecRotation}deg)`;
    localMin.style.transform = `rotate(${localMinRotation}deg)`;
    localHour.style.transform = `rotate(${localHourRotation}deg)`;

    // Update local time display
    const localHours = now.getHours();
    const localMinutes = now.getMinutes();
    const localTimezoneOffset = -now.getTimezoneOffset();
    const localOffsetHours = Math.floor(localTimezoneOffset / 60);
    const localOffsetMinutes = Math.abs(localTimezoneOffset % 60);
    const amPm = localHours >= 12 ? 'PM' : 'AM';
    const formatted12Hour = localHours % 12 || 12;
    localTimeDisplay.textContent = `${localHours.toString().padStart(2, '0')}:${localMinutes.toString().padStart(2, '0')} (${formatted12Hour}:${localMinutes.toString().padStart(2, '0')} ${amPm})`;
    localTimezoneDisplay.textContent = `Timezone: UTC${localOffsetHours >= 0 ? '+' : ''}${localOffsetHours}:${localOffsetMinutes.toString().padStart(2, '0')}`;

    // Calculate offset time
    let offsetHours = parseInt(offsetSlider.value) - 12;
    let offsetMinutes = (thirtyOffsetCheckbox.checked ? 30 : 0) + (fifteenOffsetCheckbox.checked ? 15 : 0);

    let adjustedMinutes = m + offsetMinutes;
    let adjustedHours = h + offsetHours + Math.floor(adjustedMinutes / 60);
    adjustedMinutes = adjustedMinutes % 60;

    let adjustedDays = Math.floor(adjustedHours / 24);
    adjustedHours = adjustedHours % 24;

    // Update offset clock hands
    const offsetSecRotation = s * 6;
    const offsetMinRotation = adjustedMinutes * 6;
    const offsetHourRotation = (adjustedHours % 12) * 30 + (adjustedMinutes / 60) * 30;
    offsetSec.style.transform = `rotate(${offsetSecRotation}deg)`;
    offsetMin.style.transform = `rotate(${offsetMinRotation}deg)`;
    offsetHour.style.transform = `rotate(${offsetHourRotation}deg)`;

    // Update offset time display
    const offsetHoursDisplay = adjustedHours >= 0 ? Math.floor(adjustedHours) : (24 + adjustedHours);
    const offsetMinutesDisplay = Math.floor(adjustedMinutes);
    const offsetAmPm = offsetHoursDisplay >= 12 ? 'PM' : 'AM';
    const formattedOffset12Hour = offsetHoursDisplay % 12 || 12;
    offsetTimeDisplay.innerHTML = `${offsetHoursDisplay.toString().padStart(2, '0')}:${offsetMinutesDisplay.toString().padStart(2, '0')} (${formattedOffset12Hour}:${offsetMinutesDisplay.toString().padStart(2, '0')} ${offsetAmPm})<sup>${adjustedDays === 0 ? '' : adjustedDays > 0 ? `+${adjustedDays}` : `${adjustedDays}`}</sup>`;

    // Update offset timezone display
    const totalOffsetHours = offsetHours + Math.floor(adjustedMinutes / 60);
    const totalOffsetMinutes = (offsetMinutes % 60 + 60) % 60;
    offsetTimezoneDisplay.textContent = `Timezone: UTC${totalOffsetHours >= 0 ? '+' : ''}${totalOffsetHours}:${totalOffsetMinutes.toString().padStart(2, '0')}`;
}

// Update clocks every 16ms for smooth movement
setInterval(updateClock, 16);
updateClock();
