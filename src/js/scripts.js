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

/* ------------------------------- */
/* Custom Select                   */
/* ------------------------------- */

// Get all specific custom select elements
const select = document.querySelector('.custom-select__visible');
const selectHidden = document.querySelector('.custom-select__hidden');
const selectOptions = document.querySelectorAll('.custom-select__option');
const selectedPlan = document.querySelector('.custom-select__visible-text');
const selectedPrice = document.querySelector('.custom-select__visible-price');
const selectedToggle = document.querySelector('.custom-select__toggle-icon');

// Toggle plan dropdown and rotate arrow
select.addEventListener('click', function () {
    selectedToggle.classList.toggle('rotate'); // Rotate the arrow icon
    selectHidden.classList.toggle('active'); // Show/hide the dropdown
});

// Loop through each option in the dropdown
selectOptions.forEach((option) => {
    option.addEventListener('click', function () {
        // Remove the 'selected' class from all options
        selectOptions.forEach((option) => option.classList.remove('selected'));

        // Add the 'selected' class to the clicked option
        this.classList.add('selected');

        // Close the dropdown after selecting an option
        selectHidden.classList.remove('active');
        selectedToggle.classList.remove('rotate'); // Reset the arrow icon

        // Update the visible selected plan and price
        selectedPlan.textContent = this.querySelector(
            '.custom-select__option-text'
        ).innerText;
        selectedPrice.textContent = this.querySelector(
            '.custom-select__option-price'
        ).innerText;

        // Update the data-value attribute on the custom-select container
        const selectedValue = this.getAttribute('data-value');
        this.closest('.custom-select').setAttribute(
            'data-value',
            selectedValue
        );
    });
});

/* ------------------------------- */
/* Form Validation                 */
/* ------------------------------- */

// Required field constants
const formName = document.getElementById('name');
const formEmail = document.getElementById('email');
const form = document.getElementById('sign-up');

function createError(element, message) {
    // Check if the error element already exists
    if (!element.parentElement.querySelector('.form__error')) {
        const span = document.createElement('span');
        const img = document.createElement('img');

        span.classList.add('form__error');
        img.setAttribute('src', '../assets/images/sign-up/icon-cross.svg');
        span.textContent = ` ${message}`; // Display custom error message next to the icon

        span.insertBefore(img, span.firstChild); // Insert icon before text
        element.parentElement.appendChild(span);
        element.parentElement.classList.add('form__alert');
    }
}

function removeError(element) {
    const errorElement = element.parentElement.querySelector('.form__error');
    if (errorElement) {
        errorElement.remove();
        element.parentElement.classList.remove('form__alert');
    }
}

// Validate name field (required)
function validateName() {
    if (formName.value === '' || formName.value === null) {
        createError(formName, ''); // No message displayed
        return false;
    } else {
        removeError(formName);
        return true;
    }
}

// Validate email field (required & format check)
function validateEmail() {
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (formEmail.value === '' || formEmail.value === null) {
        createError(formEmail, ''); // No message displayed
        return false;
    } else if (!formEmail.value.match(emailRegex)) {
        createError(formEmail, 'Please enter a valid email'); // Retain this message for invalid format
        return false;
    } else {
        removeError(formEmail);
        return true;
    }
}

// Validate the entire form on submit
function validateForm(event) {
    // Clear the default browser validation messages
    formName.setCustomValidity('');
    formEmail.setCustomValidity('');

    // Perform custom validation
    const isNameValid = validateName();
    const isEmailValid = validateEmail();

    // Prevent form submission if validation fails
    if (!isNameValid || !isEmailValid) {
        event.preventDefault();
    }
}

// Attach form submit event listener
form.addEventListener('submit', validateForm);

// Optional: Attach blur event listeners for real-time validation
formName.addEventListener('blur', validateName);
formEmail.addEventListener('blur', validateEmail);
