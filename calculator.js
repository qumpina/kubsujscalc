const basePrices = {
    basic: 1000,
    premium: 2000,
    custom: 1500
};

const optionPrices = {
    standard: 0,
    express: 500,
    vip: 1000
};

const propertyPrice = 300;

function initCalculator() {
    console.log('Initializing calculator...');
    
    const quantityInput = document.getElementById('quantity');
    const serviceTypeRadios = document.querySelectorAll('input[name="serviceType"]');
    const optionsGroup = document.getElementById('optionsGroup');
    const optionsSelect = document.getElementById('options');
    const propertyGroup = document.getElementById('propertyGroup');
    const propertyCheckbox = document.getElementById('property');
    const resultElement = document.getElementById('result');
    const errorDiv = document.getElementById('quantityError');

    if (!quantityInput || !optionsGroup || !propertyGroup) {
        console.error('Required elements not found');
        return;
    }

    const numberRegex = /^\d+$/;

    function validateInput() {
        const value = quantityInput.value.trim();
        
        if (value === '') {
            showError('Пожалуйста, введите количество');
            quantityInput.classList.add('input-invalid');
            quantityInput.classList.remove('input-valid');
            return false;
        }
        
        if (!numberRegex.test(value)) {
            showError('Введите корректное количество (только целые положительные числа)');
            quantityInput.classList.add('input-invalid');
            quantityInput.classList.remove('input-valid');
            return false;
        }
        
        const quantity = parseInt(value);
        if (quantity <= 0) {
            showError('Количество должно быть больше 0');
            quantityInput.classList.add('input-invalid');
            quantityInput.classList.remove('input-valid');
            return false;
        }
        
        hideError();
        quantityInput.classList.remove('input-invalid');
        quantityInput.classList.add('input-valid');
        return true;
    }

    function showError(message) {
        errorDiv.textContent = message;
        errorDiv.classList.remove('hidden');
    }

    function hideError() {
        errorDiv.classList.add('hidden');
    }

    function calculateTotal() {
        if (!validateInput()) {
            resultElement.textContent = 'Введите корректное количество';
            resultElement.classList.remove('calculated');
            return;
        }
        
        const quantity = parseInt(quantityInput.value);
        const selectedType = document.querySelector('input[name="serviceType"]:checked').value;
        const selectedOption = optionsSelect.value;
        const hasProperty = propertyCheckbox.checked;

        let total = basePrices[selectedType] * quantity;

        if (selectedType === 'premium') {
            total += optionPrices[selectedOption] * quantity;
        }

        if (selectedType === 'custom' && hasProperty) {
            total += propertyPrice * quantity;
        }

        resultElement.textContent = `Общая стоимость: ${total.toLocaleString('ru-RU')} руб.`;
        resultElement.classList.add('calculated');
    }

    function updateFormVisibility() {
        const selectedType = document.querySelector('input[name="serviceType"]:checked').value;
        
        optionsSelect.value = 'standard';
        propertyCheckbox.checked = false;

        switch(selectedType) {
            case 'basic':
                optionsGroup.classList.add('hidden');
                propertyGroup.classList.add('hidden');
                break;
            case 'premium':
                optionsGroup.classList.remove('hidden');
                propertyGroup.classList.add('hidden');
                break;
            case 'custom':
                optionsGroup.classList.add('hidden');
                propertyGroup.classList.remove('hidden');
                break;
        }
        
        calculateTotal();
    }

    function handleInput() {
        validateInput();
        calculateTotal();
    }

    quantityInput.addEventListener('input', handleInput);
    quantityInput.addEventListener('blur', handleInput);

    serviceTypeRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            updateFormVisibility();
            handleInput();
        });
    });

    optionsSelect.addEventListener('change', handleInput);
    propertyCheckbox.addEventListener('change', handleInput);

    updateFormVisibility();
    hideError();
    calculateTotal();
    
    console.log('Calculator initialized successfully');
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCalculator);
} else {
    initCalculator();
}