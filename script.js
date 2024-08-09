document.addEventListener('DOMContentLoaded', function() {
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('input', handleInputChange);
    });

    function handleInputChange() {
        const amount = parseInt(document.getElementById('amount').value) || 0;
        const volunteerAmount = parseInt(document.getElementById('volunteer-amount').value) || 0;
        const postageOnlyChecked = document.getElementById('postage-only').checked;
        const eryriAmount = amount - volunteerAmount;

        for(const input of [ 'single-sided-full-colour', 'double-sided-full-colour', 'insert', 'freepost']) {
            document.getElementById(input).disabled = postageOnlyChecked;
        }

        document.getElementById('eryri-amount').value = eryriAmount;

        calculateTotal();
    }

    function calculateTotal() {
        const amount = parseInt(document.getElementById('amount').value) || 0;
        const postageOnlyChecked = document.getElementById('postage-only').checked;
        const singleSidedChecked = document.getElementById('single-sided-full-colour').checked;
        const doubleSidedChecked = document.getElementById('double-sided-full-colour').checked;
        const insertChecked = document.getElementById('insert').checked;
        const freepostChecked = document.getElementById('freepost').checked;
        const volunteerAmount = parseInt(document.getElementById('volunteer-amount').value) || 0;
        const eryriAmount = amount - volunteerAmount;

        let total = 0;

        if (!postageOnlyChecked) {
            if (singleSidedChecked) {
                total += amount * 0.26;
            }
            else if (doubleSidedChecked) {
                total += amount * 0.28;
            }

            if (insertChecked) {
                total += amount * 0.04;
            }
    
            if (freepostChecked) {
                total += amount * 0.03;
            }
        }

        total += eryriAmount * 0.64;

        if (volunteerAmount > 0) {
            total += 39.99;
        }

        document.getElementById('total').innerText = `£${total.toFixed(2)}`;
    }
});
