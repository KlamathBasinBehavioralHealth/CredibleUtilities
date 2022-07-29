function noteRequired(e, bool){
    let taContainer = null;
    if (e.target.closest('table').closest('tr').nextElementSibling != null){
        taContainer = e.target.closest('table').closest('tr').nextElementSibling;
    }
    else if (e.target.closest('table').closest('tr').closest('table').closest('tr').nextElementSibling != null){
        taContainer = e.target.closest('table').closest('tr').closest('table').closest('tr').nextElementSibling;
    }
    const ta = taContainer.querySelector('textarea');
    const taRight = taContainer.querySelector('td[valign]');
    if (bool){
        const asterisk = document.createElement('div');
        asterisk.className = 'redAsterisk';
        asterisk.style.color = 'red';
        asterisk.style.display = 'inline';
        asterisk.textContent = '*';

        if (taRight.querySelector('.redAsterisk') == null){
            ta.required = true;
            taRight.insertBefore(asterisk, taRight.querySelector('br'));
        }
    }
    else{
        if (taRight.querySelector('.redAsterisk') != null){
            taRight.querySelector('.redAsterisk').remove();
            ta.required = false;
        }
    }
}

function handleEvent(e, singleTextArea){
    if (singleTextArea){
                    
        if (selectionCheck(elem.closest('table').querySelectorAll('input[data-notes=\'show\']'))){
            noteRequired(e, true);
        }
        else{
            noteRequired(e, false);
        }
    }
    else{
        noteRequired(e, e.target.checked);
    }
}

function deployNoteRequirement(selector, singleTextArea){
    document.querySelectorAll(selector).forEach(elem => {
        if (elem.closest('tr').querySelector('input[data-notes=\'show\']') != null){
            const checkbox = elem.closest('tr').querySelector('input[data-notes=\'show\']');

            checkbox.onload = (e) => {
                setTimeout(()=> {handleEvent(e, singleTextArea)},1000);
            };

            checkbox.onclick = (e) => {
                handleEvent(e, singleTextArea);
            };
        }
    });
}

setTimeout(() => {deployNoteRequirement('.intervention', false)}, 1000);