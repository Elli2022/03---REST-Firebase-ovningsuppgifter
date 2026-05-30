const exerciseCards = document.querySelectorAll('.exercise-card');
const exerciseCount = document.getElementById('exercise-count');
const footerYear = document.getElementById('footer-year');

if (exerciseCount) {
    exerciseCount.textContent = `${exerciseCards.length} exercises`;
}

if (footerYear) {
    footerYear.textContent = `Preserved lesson exercise • ${new Date().getFullYear()}`;
}
