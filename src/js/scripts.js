console.log('Hello, World!');

/* ------------------------------- */
/* Countdown Timer                 */
/* ------------------------------- */

const today = new Date();
const targetDate = today.getTime() + 90 * 24 * 60 * 60 * 1000;

// Define month names before using them
const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
];

// Cache countdown element references
const countdownHeading = document.querySelector('.countdown h2 span');
const countdownDay = document.getElementById('countdown-day');
const countdownHrs = document.getElementById('countdown-hrs');
const countdownMin = document.getElementById('countdown-min');
const countdownSec = document.getElementById('countdown-sec');

// Display the launch date in the countdown's <h2>
countdownHeading.textContent = formatDate(new Date(targetDate));

// Update the countdown every second
const countdownInterval = setInterval(updateCountdown, 1000);

function updateCountdown() {
    const currentTime = Date.now(); // use Date.now() for efficiency
    const timeRemaining = targetDate - currentTime;

    if (timeRemaining <= 0) {
        clearInterval(countdownInterval);
        document.getElementById('countdown').innerHTML =
            'Product has launched!';
    } else {
        // Reduce redundant modulus operations
        const day = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
        const hrs = Math.floor((timeRemaining / (1000 * 60 * 60)) % 24);
        const min = Math.floor((timeRemaining / (1000 * 60)) % 60);
        const sec = Math.floor((timeRemaining / 1000) % 60);

        // Update the DOM with formatted time
        countdownDay.innerText = formatTime(day);
        countdownHrs.innerText = formatTime(hrs);
        countdownMin.innerText = formatTime(min);
        countdownSec.innerText = formatTime(sec);
    }
}

function formatTime(time) {
    return time < 10 ? `0${time}` : time;
}

function formatDate(date) {
    const year = date.getFullYear();
    const month = date.getMonth(); // month already zero-indexed
    const day = date.getDate();

    return `${day} ${monthNames[month]} ${year}`;
}

// Initial call to update the countdown timer
updateCountdown();
