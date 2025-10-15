document.addEventListener('DOMContentLoaded', function() {
    // Элементы DOM
    const quantityInput = document.getElementById('quantity');
    const productSelect = document.getElementById('product');
    const calculateBtn = document.getElementById('calculateBtn');
    const resultDiv = document.getElementById('result');
    const errorDiv = document.getElementById('quantityError');
    
    // Регулярное выражение для проверки ввода (только целые положительные числа)
    const numberRegex = /^\d+$/;
    
    // Функция для проверки корректности ввода
    function validateInput() {
        const value = quantityInput.value.trim();
        
        if (value === '') {
            showError('Пожалуйста, введите количество товара');
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
    
    // Функция для отображения ошибки
    function showError(message) {
        errorDiv.textContent = message;
        errorDiv.classList.remove('hidden');
        calculateBtn.disabled = true;
    }
    
    // Функция для скрытия ошибки
    function hideError() {
        errorDiv.classList.add('hidden');
        calculateBtn.disabled = false;
    }
    
    // Функция для расчета стоимости
    function calculateCost() {
        if (!validateInput()) {
            return;
        }
        
        const quantity = parseInt(quantityInput.value);
        const price = parseInt(productSelect.value);
        const totalCost = quantity * price;
        
        // Форматирование числа с пробелами для тысяч
        const formattedCost = totalCost.toLocaleString('ru-RU');
        
        resultDiv.innerHTML = `Стоимость заказа: <span style="color: #28a745;">${formattedCost} руб.</span>`;
        resultDiv.classList.remove('hidden');
    }
    
    // Обработчики событий
    quantityInput.addEventListener('input', validateInput);
    calculateBtn.addEventListener('click', calculateCost);
    
    // Инициализация
    hideError();
});