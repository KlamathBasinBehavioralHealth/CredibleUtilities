function restrictValidDates() {
    let recipientType = document.querySelector('#recipientSenderType').closest('table').querySelector('select');
    let payerValue = [...document.querySelector('#recipientSenderType').closest('table').querySelectorAll('option')].filter((option) => {
        return option.innerText === 'Payer';
    })[0].value;
    let providerValue = [...document.querySelector('#recipientSenderType').closest('table').querySelectorAll('option')].filter((option) => {
        return option.innerText === 'Provider';
    })[0].value;
    let otherValue = [...document.querySelector('#recipientSenderType').closest('table').querySelectorAll('option')].filter((option) => {
        return option.innerText === 'Other (details below)';
    })[0].value;
    let validByLaw = document.querySelector('#validByLaw').closest('tr');
    let validByLawInput = document.querySelector('#validByLaw').closest('tr').querySelector('input');
    let validByDate = document.querySelector('#validByDate').closest('tr');
    let validByDateInput = document.querySelector('#validByDate').closest('tr').querySelector('input');
	// || recipientType.value === providerValue
    if (recipientType.value === payerValue) {
        validByLawInput.style.pointerEvents = 'none';
        validByDateInput.style.pointerEvents = 'auto';
        validByLaw.hidden = false;
        validByDate.hidden = true;
        if (!validByLaw.querySelector('input').checked) {
            validByLaw.querySelector('input').click();
        }
    } else if (recipientType.value === otherValue) {
        validByLawInput.style.pointerEvents = 'auto';
        validByDateInput.style.pointerEvents = 'none';
        validByLaw.hidden = true;
        validByDate.hidden = false;
        if (!validByDate.querySelector('input').checked) {
            validByDate.querySelector('input').click();
        }
	visibility('show', '#validDateStart', true);
	visibility('show', '#validDateEnd', true);
    } else {
        validByLawInput.style.pointerEvents = 'auto';
        validByDateInput.style.pointerEvents = 'auto';
        validByLaw.hidden = false;
        validByDate.hidden = false;
    }
    fillValidDates();
}

function fillValidDates() {
    let recipientType = document.querySelector('#recipientSenderType').closest('table').querySelector('select');
    let payerValue = [...document.querySelector('#recipientSenderType').closest('table').querySelectorAll('option')].filter((option) => {
        return option.innerText === 'Payer';
    })[0].value;
    const oneYearInDays = 364;
    let date = new Date();
    let laterDate = new Date(date);
    laterDate.setDate(date.getDate() + oneYearInDays);
    let today = (date.getMonth() + 1) + '/' + date.getDate().toString().padStart(2, 0) + '/' + date.getFullYear().toString();
    let yearLater = (laterDate.getMonth() + 1) + '/' + laterDate.getDate().toString().padStart(2, 0) + '/' + laterDate.getFullYear().toString();
    let startDate = document.querySelector('#validDateStart').closest('table').querySelector('input');
    let endDate = document.querySelector('#validDateEnd').closest('table').querySelector('input');
    if (document.querySelector('#validByDate').closest('tr').querySelector('input').checked) {
		startDate.value = today;
		document.querySelector('#validDateStart').closest('tr').nextElementSibling.querySelector('input').readOnly = false;
		document.querySelector('#validDateStart').closest('tr').nextElementSibling.querySelector('input').nextElementSibling.style.visibility = 'visible';
		document.querySelector('#validDateEnd').closest('tr').nextElementSibling.querySelector('input').readOnly = false;
		document.querySelector('#validDateEnd').closest('tr').nextElementSibling.querySelector('input').nextElementSibling.style.visibility = 'visible';
		endDate.value = yearLater;
    } else if(document.querySelector('#validByLaw').closest('tr').querySelector('input').checked){
	   	if(recipientType.value === payerValue){
			startDate.value = '';
        	        endDate.value = '';
			visibility('hide', '#validDateStart', false);
			visibility('hide', '#validDateEnd', false);
		} else{
			visibility('show', '#validDateStart', true);
			visibility('show', '#validDateEnd', true);
			startDate.value = today;
			endDate.value = yearLater;
			document.querySelector('#validDateStart').closest('tr').nextElementSibling.querySelector('input').readOnly = true;
			document.querySelector('#validDateStart').closest('tr').nextElementSibling.querySelector('input').nextElementSibling.style.visibility = 'hidden';
			document.querySelector('#validDateEnd').closest('tr').nextElementSibling.querySelector('input').readOnly = true;
			document.querySelector('#validDateEnd').closest('tr').nextElementSibling.querySelector('input').nextElementSibling.style.visibility = 'hidden';
		}
	    	
	} else if ((!document.querySelector('#validByDate').closest('tr').querySelector('input').checked & !document.querySelector('#validByLaw').closest('tr').querySelector('input').checked) || recipientType.value === payerValue) {
        startDate.value = '';
        endDate.value = '';
    }
}
document.addEventListener('DOMContentLoaded', () => {
    fillValidDates();
    [...document.querySelectorAll('.validOptions')].forEach((validOption) => {
        validOption.closest('tr').querySelector('input').addEventListener('change', fillValidDates);
        validOption.closest('tr').querySelector('input').addEventListener('mouseleave', fillValidDates);
    });
    restrictValidDates();
    document.querySelector('#recipientSenderType').closest('table').querySelector('select').addEventListener('change', restrictValidDates);
    document.querySelector('#recipientSenderType').closest('table').querySelector('select').addEventListener('mouseleave', restrictValidDates);
});
