document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('calculator-form');
    const resultElement = document.getElementById('result-value');
    const runButton = document.getElementById('run-button');

    runButton.addEventListener('click', () => {
        // Get input values
        const value1 = parseFloat(document.getElementById('value1').value);
        const value2 = parseFloat(document.getElementById('value2').value);
        const operation = document.getElementById('operation').value;

        // Perform calculation
        let result;
        switch (operation) {
            case 'add':
                result = value1 + value2;
                break;
            case 'subtract':
                result = value1 - value2;
                break;
            case 'multiply':
                result = value1 * value2;
                break;
            case 'divide':
                if (value2 !== 0) {
                    result = value1 / value2;
                } else {
                    result = 'Error: Division by zero';
                }
                break;
            default:
                result = 'Invalid operation';
        }

        // Display result
        resultElement.textContent = result;
    });
});
