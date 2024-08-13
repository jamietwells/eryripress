document.addEventListener('DOMContentLoaded', function() {
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('input', handleInputChange);
    });

    const elements = {
        amount: document.getElementById('amount'),
        postageOnly: document.getElementById('postage-only'),
        singleSided: document.getElementById('single-sided-full-colour'),
        doubleSided: document.getElementById('double-sided-full-colour'),
        insert: document.getElementById('insert'),
        freepost: document.getElementById('freepost')
    };

    function handleInputChange() {
        const postageOnlyChecked = elements.postageOnly.checked;

        for(const input of [ elements.singleSided, elements.doubleSided, elements.insert, elements.freepost]) {
            input.disabled = postageOnlyChecked;
        }

        calculateTotal();
    }

    function calculateTotal() {
        const amount = parseInt(elements.amount.value) || 0;
        const postageOnlyChecked = elements.postageOnly.checked;
        const singleSidedChecked = elements.singleSided.checked;
        const doubleSidedChecked = elements.doubleSided.checked;
        const insertChecked = elements.insert.checked;
        const freepostChecked = elements.freepost.checked;

        let total = amount * 0.64;

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

        document.getElementById('total').innerText = total.toLocaleString('en-GB', { style: 'currency', currency: 'GBP' });
    }
});
