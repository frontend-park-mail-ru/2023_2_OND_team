/**
 * Создается компонент с лейблом и полем ввода.
 * @param {string} labelText - Текст лейбла.
 * @param {string} inputType - Тип поля ввода.
 * @param {string} inputPlaceholder - placeholder для поля ввода.
 * @returns {HTMLDivElement} - Элемент, содержащий лейбл и поле ввода.
 */
export function createLabeledInput(labelText, inputType, inputPlaceholder) {
    const label = document.createElement('label');
    label.textContent = labelText;

    const input = document.createElement('input');
    input.type = inputType;
    input.placeholder = inputPlaceholder;

    const inputContainer = document.createElement('div');
    inputContainer.classList.add('labeled-input');
    inputContainer.appendChild(label);
    inputContainer.appendChild(input);

    return inputContainer;
}
