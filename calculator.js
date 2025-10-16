document.addEventListener('DOMContentLoaded', function() {
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

    const quantityInput = document.getElementById('quantity');
    const serviceTypeRadios = document.querySelectorAll('input[name="serviceType"]');
    const optionsGroup = document.getElementById('optionsGroup');
    const optionsSelect = document.getElementById('options');
    const propertyGroup = document.getElementById('propertyGroup');
    const propertyCheckbox = document.getElementById('property');
    const resultElement = document.getElementById('result');
    const calculateBtn = document.getElementById('calculateBtn');
    const errorDiv = document.getElementById('quantityError');

    const numberRegex = /^\d+$/;

    function validateInput() {
        const value = quantityInput.value.trim();
        
        if (value === '') {
            showError('Пожалуйста, введите количество');
            return false;
        }
        
        if (!numberRegex.test(value)) {
            showError('Введите корректное количество (только целые положительные числа)');
            return false;
        }
        
        const quantity = parseInt(value);
        if (quantity <= 0) {
            showError('Количество должно быть больше 0');
            return false;
        }
        
        hideError();
        return true;
    }

    function showError(message) {
        errorDiv.textContent = message;
        errorDiv.classList.remove('hidden');
        calculateBtn.disabled = true;
    }

    function hideError() {
        errorDiv.classList.add('hidden');
        calculateBtn.disabled = false;
    }

    function resetResult() {
        resultElement.textContent = 'Выполните расчет стоимости';
        resultElement.style.color = '#6c757d';
        resultElement.style.backgroundColor = '#f8f9fa';
    }

    function calculateTotal() {
        if (!validateInput()) {
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
        resultElement.style.color = '#155724';
        resultElement.style.backgroundColor = '#e8f5e9';
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
        
        resetResult();
    }

    quantityInput.addEventListener('input', validateInput);
    calculateBtn.addEventListener('click', calculateTotal);

    serviceTypeRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            updateFormVisibility();
            validateInput();
        });
    });

    optionsSelect.addEventListener('change', function() {
        validateInput();
        resetResult();
    });

    propertyCheckbox.addEventListener('change', function() {
        validateInput();
        resetResult();
    });
    updateFormVisibility();
    hideError();
    resetResult();
});