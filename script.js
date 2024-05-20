document.addEventListener('DOMContentLoaded', function() {
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('input', handleInputChange);
    });

    function handleInputChange() {
        const amount = parseInt(document.getElementById('amount').value) || 0;
        const volunteerAmount = parseInt(document.getElementById('volunteer-amount').value) || 0;
        const eryriAmount = amount - volunteerAmount;

        document.getElementById('eryri-amount').value = eryriAmount;

        calculateTotal();
    }

    function calculateTotal() {
        const amount = parseInt(document.getElementById('amount').value) || 0;
        const printChecked = document.getElementById('print').checked;
        const postChecked = document.getElementById('post').checked;
        const singleSidedChecked = document.getElementById('single-sided-full-colour').checked;
        const doubleSidedChecked = document.getElementById('double-sided-full-colour').checked;
        const insertChecked = document.getElementById('insert').checked;
        const freepostChecked = document.getElementById('freepost').checked;
        const volunteerAmount = parseInt(document.getElementById('volunteer-amount').value) || 0;
        const eryriAmount = amount - volunteerAmount;

        let total = 0;

        if (printChecked) {
            if (singleSidedChecked) {
                total += amount * 0.19;
            } else if (doubleSidedChecked) {
                total += amount * 0.21;
            }
        }

        if (insertChecked) {
            total += amount * 0.04;
        }

        if (freepostChecked) {
            total += amount * 0.03;
        }

        if (postChecked) {
            total += eryriAmount * 0.45;
        }

        if (volunteerAmount > 0) {
            total += 39.99;
        }

        document.getElementById('total').innerText = `£${total.toFixed(2)}`;
    }
});
