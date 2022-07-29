function hideScreeningQs(performSelector, hideBool){
    const performQ = document.querySelector(performSelector).closest('table').closest('tr');
    const tbody = performQ.closest('tbody');

    const screeningQs =  [...tbody.children].filter(x => x != performQ);

    screeningQs.map(x => x.hidden = hideBool);
}

function clickHandler(e, performSelector){
    if (e.target.closest('tr').textContent == 'Perform'){
        hideScreeningQs(performSelector, false);
    }
    else{
        hideScreeningQs(performSelector, true);
    }
}

function deployPerformEvent(performSelector){
    const inputs = document.querySelector(performSelector).closest('table').querySelectorAll('input');

    inputs.forEach(input => {
        input.onclick = (e) => {
            clickHandler(e, performSelector);
        };
    });

    inputs[1].click();
}

setTimeout(() => { deployPerformEvent('#acePerform') }, 1000);