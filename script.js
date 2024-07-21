const defaultText = document.getElementById("default-text");
const calculationsContainer = document.getElementById('calculations-container');

// Highlight selected radio input
document.querySelectorAll('.radio-inputs input[type="radio"]').forEach(input => {
    input.addEventListener('change', function () {
        document.querySelectorAll('.radio-inputs').forEach(div => {
            div.classList.remove('selected');
        });
    
        if (this.checked) {
            this.parentElement.classList.add('selected');
        }    
    });
});

// Calculate mortgage payments
document.getElementById('calculate-btn').addEventListener('click', () => {
    const amount = parseFloat(document.getElementById('mortgage-amount').value);
    const term = parseFloat(document.getElementById('mortgage-term').value);
    const rate = parseFloat(document.getElementById('interest-rate').value) / 100;
    const mortgageType = document.querySelector('input[name="mortgage-type"]:checked');

    let isValid = true;

    // Remove error classes
    document.querySelectorAll('.form-flex').forEach(el => {
        el.classList.remove('error');
    });

    // Validate mortgage amount
    if (isNaN(amount) || amount <= 0) {
        document.getElementById('amount-alert').style.display = 'block';
        document.getElementById('mortgage-amount-main').classList.add('error');
        isValid = false;
    } else {
        document.getElementById('amount-alert').style.display = 'none';
    }

    // Validate mortgage term
    if (isNaN(term) || term <= 0) {
        document.getElementById('term-alert').style.display = 'block';
        document.getElementById('mortgage-term-main').classList.add('error');
        isValid = false;
    } else {
        document.getElementById('term-alert').style.display = 'none';
    }

    // Validate interest rate
    if (isNaN(rate) || rate <= 0) {
        document.getElementById('rate-alert').style.display = 'block';
        document.getElementById('interest-rate-main').classList.add('error');
        isValid = false;
    } else {
        document.getElementById('rate-alert').style.display = 'none';
    }

    // Validate mortgage type
    if (!mortgageType) {
        document.getElementById('type-alert').style.display = 'block';
        document.querySelectorAll('.radio-inputs').forEach(el => {
            el.classList.add('error');
        });
        isValid = false;
    } else {
        document.getElementById('type-alert').style.display = 'none';
    }

    // Calculate and display results if valid
    if (isValid) {
        let monthlyPayment = 0;
        let totalPayment = 0;

        defaultText.classList.add('hide');
        calculationsContainer.classList.add('show');

        if (mortgageType.value === 'repayment') {
            const monthlyRate = rate / 12;
            const n = term * 12;
            monthlyPayment = (amount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -n));
            totalPayment = monthlyPayment * n;
        } else if (mortgageType.value === 'interest-only') {
            monthlyPayment = (amount * rate) / 12;
            totalPayment = monthlyPayment * term * 12;
        }

        document.getElementById('result').innerText = `$${monthlyPayment.toFixed(2)}`;
        document.getElementById('term-result').innerText = `$${totalPayment.toFixed(2)}`;
    } else {
        document.getElementById('result').innerText = '';
        document.getElementById('term-result').innerText = '';

        defaultText.classList.remove('hide');
        calculationsContainer.classList.remove('show');
    }
});

// Clear form and results
document.getElementById('clear-btn').addEventListener('click', () => {
    document.getElementById('mortgage-form').reset();
    document.getElementById('result').innerText = '';
    document.getElementById('term-result').innerText = '';
    
    document.querySelectorAll('.form-alert').forEach(alert => {
        alert.style.display = 'none';
    });

    defaultText.classList.remove('hide');
    calculationsContainer.classList.remove('show');

    document.querySelectorAll('.radio-inputs').forEach(div => {
        div.classList.remove('error');
    });
});

// Hide all form alerts initially
document.querySelectorAll('.form-alert').forEach(alert => {
    alert.style.display = 'none';
});
