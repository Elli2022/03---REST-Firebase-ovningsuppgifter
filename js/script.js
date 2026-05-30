const exerciseCards = document.querySelectorAll('.exercise-card');
const exerciseCount = document.getElementById('exercise-count');
const footerYear = document.getElementById('footer-year');

if (exerciseCount) {
    exerciseCount.textContent = `${exerciseCards.length} ovningar`;
}

if (footerYear) {
    footerYear.textContent = `Bevarad lektionsovning • ${new Date().getFullYear()}`;
}
