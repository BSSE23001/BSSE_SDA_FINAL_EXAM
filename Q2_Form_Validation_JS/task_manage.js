document.addEventListener('DOMContentLoaded', () => {
    const orderForm = document.getElementById('task-form');
    orderForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if(ValidateUserForm()) {
            const formData = new FormData(orderForm);
            insertOrder(formData);
        }
    });

    const order_inputs = orderForm.querySelectorAll('input[required]');
    order_inputs.forEach(input => {
        input.addEventListener('blur', ValidateField);
        input.addEventListener('input', clearError);
    })
});

function ValidateUserForm() {
    let isValid = true;
    const form = document.getElementById('task-form');

    const requiredInputs = form.querySelectorAll('input[required]');
    requiredInputs.forEach(input => {
        if(!ValidateField({target: input})) {
            isValid = false;
        }
    });

    const email = document.getElementById('email').value;
    if(email && !validateEmail(email)) {
        showFieldError('email', 'Please Enter a Valid Email');
        isValid = false;
    }

    return isValid;
}

function ValidateField(e) {
    const field = e.target;
    const value = field.value.trim();
    const fieldName = field.id;

    if(field.required && !value) {
        showFieldError(fieldName, 'This Field Is Required');
        return false;
    }

    if(fieldName === 'email') {
        if (value && !validateEmail(value)) {
            showFieldError(fieldName, 'Please enter a valid email address');
            return false;
        }
    }
    clearError(e);
    return true;
}

function validateEmail(email) {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email));
}

function showFieldError(fieldName, message) {
    const field = document.getElementById(fieldName);
    const errorElement = document.getElementById(`${fieldName}-error`);
    errorElement.textContent = message;
    errorElement.style.display = 'block';
}

function clearError(e) {
    const field = e.target;
    const fieldName = field.name || field.id;
    const errorElement = document.getElementById(`${fieldName}-error`);
    if (errorElement) {
        errorElement.style.display = 'none';
    }
}

function insertOrder(formData) {
    showMessage("Data Inserted", 'success');
}

function showMessage(message, type) {
    const messageDiv = document.getElementById('message');
    messageDiv.textContent = message;
    messageDiv.className = `message ${type}`;
    messageDiv.style.display = 'block';

    setTimeout(() => {
        messageDiv.style.display = 'none';
    }, 5000);
}