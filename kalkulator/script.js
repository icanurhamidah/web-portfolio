const display = document.querySelector('.display');
const operatorDisplay = document.querySelector('.operator-display');
const buttons = document.querySelectorAll('button');
let currentInput = '';
let previousInput = '';
let operation = null;
let hasil = false;

// Format number with commas
function formatNumber(number) {
    const parts = number.split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join('.');
}

// Update display with formatting
function updateDisplay(value) {
    if (value === 'Error') {
        display.classList.add('error');
        display.value = value;
    } else {
        display.classList.remove('error');
        display.value = formatNumber(value);
    }
}

function updateOperatorDisplay(op) {
    if (!op) {
        operatorDisplay.textContent = '';
        operatorDisplay.classList.remove('active');
        return;
    }
    
    const operatorSymbols = {
        '+': '+',
        '-': '−',
        '*': '×',
        '/': '÷',
        '%': '%'
    };
    
    operatorDisplay.textContent = operatorSymbols[op];
    operatorDisplay.classList.add('active');
}

// Handle button clicks
buttons.forEach(button => {
    button.addEventListener('click', () => {
        handleInput(button.dataset.value);
    });
});

// Add keyboard support
document.addEventListener('keydown', (e) => {
    e.preventDefault();
    const key = e.key;
    
    if ((key >= '0' && key <= '9') || key === '.') {
        handleInput(key);
    } else if (key === '+' || key === '-' || key === '*' || key === '/' || key === '%') {
        handleInput(key);
    } else if (key === 'Enter') {
        handleInput('=');
    } else if (key === 'Backspace') {
        handleInput('DEL');
    } else if (key === 'Escape') {
        handleInput('AC');
    }
});

function handleInput(value) {
    const button = document.querySelector(`button[data-value="${value}"]`);
    if (button) {
        button.classList.add('active');
        setTimeout(() => button.classList.remove('active'), 100);
    }

    if (!operation && previousInput && !currentInput && (!isNaN(value) || value === '.')) {
        currentInput = '';
        previousInput = '';
        updateOperatorDisplay(null);
    }

    if (!isNaN(value) || value === '.') {
        if (value === '.' && currentInput.includes('.')) return;
        currentInput += value;
        updateDisplay(currentInput);
    } else {
        switch(value) {
            case 'AC':
                currentInput = '';
                previousInput = '';
                operation = null;
                updateDisplay('0');
                updateOperatorDisplay(null);
                break;
                
            case 'DEL':
                currentInput = currentInput.slice(0, -1);
                updateDisplay(currentInput || '0');
                break;
                
            case '=':
                if(previousInput && currentInput && operation) {
                    currentInput = calculate(previousInput, currentInput, operation);
                    updateDisplay(currentInput);
                    previousInput = '';
                    operation = null;
                    updateOperatorDisplay(null);
                    hasil = true;
                }
                break;
                
            default:
                if(currentInput) {
                    if(previousInput && operation) {
                        currentInput = calculate(previousInput, currentInput, operation);
                        updateDisplay(currentInput);
                    }
                    previousInput = currentInput;
                    currentInput = '';
                    operation = value;
                    updateOperatorDisplay(value);
                }
        }
    }
}

function calculate(a, b, operation) {
    a = parseFloat(a);
    b = parseFloat(b);
    switch(operation) {
        case '+': return String(a + b);
        case '-': return String(a - b);
        case '*': return String(a * b);
        case '/': return b !== 0 ? String(a / b) : 'Error';
        case '%': return String(a % b);
        default: return b;
    }
}
