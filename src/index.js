const noChoice = document.querySelector('input[value="no"]');
const titleText = document.querySelector('.title-quiz');
const radioLabels = document.querySelectorAll('.quiz__pointer label');

noChoice.addEventListener('change', function() {
    if (this.checked) {
        titleText.textContent = 'Почему?';

        radioLabels.forEach(label => {
            label.style.display = 'none';
        });

    }
});
