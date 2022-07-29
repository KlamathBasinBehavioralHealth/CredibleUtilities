/* Event validation */
function pasteVal(e, regex){
    const clip = e.clipboardData || window.clipboardData;
    if (!regex.test(clip.getData('Text'))){
        e.preventDefault();
    }
}

function keypressVal(e, regex){
    if (!regex.test(e.key)){
        e.preventDefault();
    }
}

function onblurVal(e, regex, msg){
    if (!regex.test(e.target.value)){
        inlineError(e.target, (x) => regex.test(x), msg);
    }
    else{
        if (e.target.hasAttribute('data-value')){
            e.target.setAttribute('data-value', e.target.value);
        }
    }
}

function setDatePickerOption(element, option, value){
    $('#' + element.id).datepicker('option', option, value).datepicker('refresh');
}

function setDateRange(date){
    const startInc = parseInt(date.getAttribute('startDate'));
    const endInc = parseInt(date.getAttribute('endDate'));

    const startIncValid = !isNaN(startInc);
    const endIncValid = !isNaN(endInc);
    
    if (date.hasAttribute('startDate') && startIncValid){
        setDatePickerOption(date, 'minDate', date.getAttribute('startDate'));
        if (date.hasAttribute('endDate') && endIncValid && (startInc <= endInc)){ 
            setDatePickerOption(date, 'maxDate', date.getAttribute('endDate'));
        }
    }
    else if (date.hasAttribute('endDate') && endIncValid){
        setDatePickerOption(date, 'maxDate', date.getAttribute('endDate'));
    }
}

function dateRangeVal(e){
    const startInc = parseInt(e.target.getAttribute('startDate'));
    const endInc = parseInt(e.target.getAttribute('endDate'));
    const startDate = new Date();
    const endDate = new Date();

    if (e.target.hasAttribute('startDate')){
        startDate.setDate(startDate.getDate() + startInc);
        if (e.target.hasAttribute('endDate')){
            endDate.setDate(endDate.getDate() + endInc);
            if (!(startDate.valueOf() <= Date.parse(e.target.value) && Date.parse(e.target.value) <= endDate.valueOf())){
                let errString = `<b>Invalid date!</b> Date must be from ${startDate.toLocaleDateString({ month: '2-digit',day: '2-digit',year: 'numeric' })} to ${endDate.toLocaleDateString({ month: '2-digit',day: '2-digit',year: 'numeric' })}`;
                inlineError(e.target, (x) => { startDate.valueOf() <= Date.parse(x.value) && Date.parse(e.target.value) <= endDate.valueOf() }, errString);
            }
        }
        else if (Date.parse(e.target.value) <= startDate.valueOf()){
            let errString = `<b>Invalid date!</b> Date must be after ${startDate.toLocaleDateString({ month: '2-digit', day: '2-digit', year: 'numeric' })}`;
            inlineError(e.target, (x) => { startDate.valueOf() <= Date.parse(x.value) }, errString);
        }
    }
    else if(e.target.hasAttribute('endDate')){
        endDate.setDate(endDate.getDate() + endInc);
        if (endDate.valueOf() <= Date.parse(e.target.value)){
            let errString = `<b>Invalid date!</b> Date must be before ${endDate.toLocaleDateString({ month: '2-digit',day: '2-digit',year: 'numeric' })}`;
            inlineError(e.target, (x) => { Date.parse(x.value) <= endDate.valueOf() }, errString);
        }
    }
}

/* Input type validation */

function numTypeInputVal(context) {
    const numRegex = /[\d]+$/;
    context.querySelectorAll('input[type=\'number\']').forEach((numInput) => {
        numInput.min = 0;
        numInput.onkeypress = (e) => { keypressVal(e, numRegex); };
        numInput.onpaste = (e) => { pasteVal(e, numRegex); };
    });
}

function dateInputVal(context) {
    const dateFields = context.querySelectorAll('.hasDatepicker');
    const inputRegex = /[\d\/]+$/;
    const completeRegex = /(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[0-1])\/(19[0-9][0-9]|20[0-3][0-9])+$/;

    dateFields.forEach((date) => {
        setTimeout(() => setDateRange(date), 2000);
        
        date.maxLength = 10;
        date.onkeypress = (e) => {
            keypressVal(e, inputRegex);
        };

        date.onpaste = (e) => {
            pasteVal(e, completeRegex);
        };

        date.onblur = (e) => {
            onblurVal(e, completeRegex, '<b>Invalid date!</b> Please enter a date in format MM/DD/YYYY');
            dateRangeVal(e); 
        };
    });
}

function numTextInputVal(context) {
    const numRegex = /[\d]+$/;
    context.querySelectorAll('input[maxlength]').forEach((numInput) => {
        if (numInput.maxLength < 10){
            numInput.onkeypress = (e) => { keypressVal(e, numRegex); };
            numInput.onpaste = (e) => { pasteVal(e, numRegex); };
        }
    });
}

function inlineError(element, condition, msg){
    const err = document.createElement('p');
    err.className = 'errMsg';
    err.innerHTML = msg;
    err.style.color = 'red';


    element.style.border = '2px solid red';
    element.style.borderRadius = '0.25em';

    element.onchange = (e) => {
        if (condition){
            e.target.style.border = '1px solid #8f8f9d';
            if (e.target.parentElement.querySelector('.errMsg') != null){
                e.target.parentElement.querySelector('.errMsg').remove();
            }
        }
    };

    if (element.parentElement.querySelector('.errMsg') == null){
        element.parentElement.appendChild(err);
    }
}

function deployInlineValidation(){
    const frames = document.querySelectorAll('.frame');
    frames.forEach((frame) => {
        numTypeInputVal(frame.contentWindow.document);
        dateInputVal(frame.contentWindow.document);
        numTextInputVal(frame.contentWindow.document);
    });
}