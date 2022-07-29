let globalIsValid = true;

/* Async wizardry */
async function unrequireAll(){
    const promises = [];
    if (document.querySelectorAll('.frame').length > 0){
        document.querySelectorAll('.frame').forEach(frame => {
            const reqFlags = frame.contentWindow.document.querySelectorAll('[required]');
            reqFlags.forEach(req => {
                req.removeAttribute('required');
            });
            promises.push(new Promise((resolve, reject) => { 
                if (frame.contentWindow.document.querySelectorAll('[required]').length == 0){
                    resolve();
                }
            }));
        });
    }
    else{
        document.querySelectorAll('[required]').forEach(req => {
            req.removeAttribute('required');
        });
        promises.push(new Promise((resolve, reject) => {
            if (document.querySelectorAll('[required]').length == 0){
                resolve();
            }
        }));
    }

    return Promise.all(promises);
}

async function submitFrames(){
    const frames = document.querySelectorAll('.frame');
    const promises = [...frames].map((frame) => {
        if (frame.contentWindow.userChange){
            return new Promise((resolve, reject) => { frame.contentWindow.document.querySelector('#oldComplete').click(); frame.onload = resolve; })
        }
    });

    setHref(parent.document.querySelector('frame[name=\'left\']').contentDocument, 'TIC EVAL', true);
    hideSubforms(parent.document.querySelector('frame[name=\'left\']').contentDocument, 'Eval Subforms', true);

    return Promise.all(promises);
}

async function deleteFrames(){
    const frames = document.querySelectorAll('.frame');
    const promises = [...frames].map(frame => {
        frame.remove();
        waitForDelete(document, '#' + frame.id);
    });

    return  Promise.all(promises);
}

function formSubmit(){
    if (document.querySelectorAll('.frame').length > 0){
        unrequireAll().then(() => {
            submitFrames().then(() => {
                deleteFrames().then(() => {
                    document.querySelector('#input').submit();
                });
            });
        });
    }
    else{
        unrequireAll(document).then(() => {
            document.querySelector('#oldComplete').click();
        });
    }
}

/* Assign id and hide old complete. Create new complete and trigger validation and submit on click */
function completeButton(){
    const oldComplete = document.querySelector('input[name=\'Complete\']');
    oldComplete.id = 'oldComplete';
    oldComplete.hidden = true;
    oldComplete.disabled = false;

    const complete = document.createElement('input');
    complete.type = 'button';
    complete.id = 'complete';
    complete.value = 'Complete';
    complete.onclick = (e) => {
        e.preventDefault();
        const isValidSubmit = validation() && globalIsValid;
        if (isValidSubmit){
            formSubmit();
        }
    };
    return complete;
}

/* Create save progress button and trigger formSubmit() on click */
function saveProgressButton(){
    const saveProgress = document.createElement('input');
    saveProgress.id = 'saveProgress';
    saveProgress.type = 'submit';
    saveProgress.name = 'Save Progress';
    saveProgress.value = 'Save Progress';
    saveProgress.onclick = (e) => {
        e.preventDefault();
        formSubmit();
    };
    return saveProgress;
}

/* Create submit buttons and wrap in containers for positioning. Handle different situations where they need to be created */
function createSubmitButtons(){
    const form = document.querySelector('#input');
    form.setexit.value = 1;

    const complete = completeButton();

    const saveProgress = saveProgressButton();

    const oldComplete = document.querySelector('#oldComplete');

    const buttonContainer = document.createElement('div');
    buttonContainer.id = 'buttonContainer';

    const buttonWrapper = oldComplete.parentElement;
    buttonWrapper.id = 'buttonWrapper';

    if ((frameElement != null && !frameElement.classList.contains('frame')) || getURLQueryStringParameter('formbuilder') == '1'){
        buttonWrapper.insertBefore(buttonContainer, oldComplete);
        buttonContainer.appendChild(saveProgress);
        buttonContainer.appendChild(complete);
    }
    window.onbeforeunload = () => { console.log(document.querySelector('.toolHead').textContent); };
}

/* Catch any complete buttons where the subforms don't have submit button functionality */
function hideSubCompletes(){
	const frames = document.querySelectorAll('.frame');
	frames.forEach(frame => {
        const oldComplete = frame.contentWindow.document.querySelector('input[name=\'Complete\']');
        oldComplete.id = 'oldComplete';
        oldComplete.hidden = true;
        frame.contentWindow.document.querySelector('#input').setexit.value = 1;
        frame.contentWindow.onbeforeunload = (e) => {console.log(`${frame.id} submitted`)};
	});
}