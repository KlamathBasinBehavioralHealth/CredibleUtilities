let errCount = 0;

function errorMsg(element){
    const err = document.createElement('p');
    err.className = 'errMsg';
    if (element.parentElement != null){
        err.innerHTML = `Please complete <b><i>${element.parentElement.textContent.replace('*','')}</i></b>`;
    }
    err.style.color = 'red';
    let inputElements = [];
    let allRequired = false;
    if (element.closest('tr') != null && element.closest('tr').querySelector('div[questionSelector]') != null){
        const labelElement = element.closest('tr').querySelector('div[questionSelector]');
        const selector = labelElement.getAttribute('questionSelector');
        inputElements = [...element.closest('body').querySelectorAll(selector)].map(x => x.closest('tr').querySelector('input, select, textarea'));
        if (labelElement.hasAttribute('allRequired')){
            allRequired = true;
        }
    }
    else if (element.closest('table') != null){
        inputElements = element.closest('table').querySelectorAll('input, select, textarea');
    }
    inputElements = [...inputElements].filter(x => x.type != 'button');
    if (inputElements.length == 1){
        const elem = inputElements[0];

        elem.style.border = '2px solid red';
        elem.style.borderRadius = '0.25em';
        elem.onchange = (e) => {
            if (inputElements.length == 1){
                if (e.target.value != '' || e.target.getAttribute('data-value') != ''){
                    e.target.style.border = '1px solid #8f8f9d';
                    if (e.target.closest('table').querySelector('.errMsg') != null){
                        e.target.closest('table').querySelector('.errMsg').remove();
                        errCount -= 1;
                    }
                }
                else{
                    errorMsg(element);
                }
            }
        };

        const observer = new MutationObserver((mutationsList, observer) =>{
            if (elem.value != '' || elem.getAttribute('data-value') != ''){
                elem.style.border = '1px solid #8f8f9d';
                if (elem.closest('table').querySelector('.errMsg') != null){
                    elem.closest('table').querySelector('.errMsg').remove();
                    errCount -= 1;
                }
            }
            else{
                errorMsg(element);
            }
        });
        const config = {attributes: true, childList: true, subtree: true};
        observer.observe(elem, config);

        if (inputElements[inputElements.length - 1].closest('table').querySelector('.errMsg') == null){
            inputElements[inputElements.length - 1].closest('table').appendChild(err);
            errCount += 1;
            if (errCount == 1){
                inputElements[0].focus();
            }
        }
    }
    else if (inputElements.length > 1){
        inputElements.forEach(elem => {
            elem.style.outline = '2px solid red';
            elem.style.borderRadius = '0.25em';
        });
        inputElements.forEach(inp => {
            inp.closest('tr').onclick = (e) => {
                let noneSelected = true;
                let selectedCount = 0;
                inputElements.forEach(elem => {
                    if (elem.type == 'radio' || elem.type == 'checkbox'){
                    if (elem.checked){
                            noneSelected = false;
                            selectedCount += 1;
                        }
                    }
                    else{
                        if (elem.value != ''){
                            noneSelected = false;
                            selectedCount += 1;
                        }
                    }
                });
                if (allRequired && inputElements.length != selectedCount){
                    errorMsg(element);
                }
                else if(noneSelected){
                    errorMsg(element);
                }
                else{
                    inputElements.forEach(elem => {
                        elem.style.outline = 'none';
                    });
                    if (inputElements[inputElements.length - 1].closest('table').closest('td').querySelector('.errMsg') != null){
                        inputElements[inputElements.length - 1].closest('table').closest('td').querySelector('.errMsg').remove();
                        errCount -= 1;
                    }
                }
            }
        });
        if (inputElements[inputElements.length - 1].closest('table').closest('td').querySelector('.errMsg') == null){
            inputElements[inputElements.length - 1].closest('table').closest('td').appendChild(err);
            errCount += 1;
            if (errCount == 1){
                inputElements[inputElements.length - 1].focus();
            }
        }
    }
}

function validation() {
    let isValid = true;
    if (document.querySelectorAll('font[color=\'red\'], .redAsterisk').length > 0){
        document.querySelectorAll('font[color=\'red\'], .redAsterisk').forEach(font => {
            let inputElements;
            let allRequired = false;
            if (font.closest('tr').querySelector('div[questionSelector]') != null){
                const labelElement = font.closest('tr').querySelector('div[questionSelector]');
                const selector = labelElement.getAttribute('questionSelector');
                inputElements = [...document.querySelectorAll(selector)].map(x => x.closest('tr').querySelector('input, select, textarea'));
                if (labelElement.hasAttribute('allRequired')){
                    allRequired = true;
                }
            }
            else{
                inputElements = font.closest('table').querySelectorAll('input, select, textarea');
            }
            inputElements = [...inputElements].filter(x => x.type != 'button');
            if (inputElements.length == 1){
                if (inputElements[0].hasAttribute('data-value') && inputElements[0].getAttribute('data-value') == '' && inputElements[0].value == ''){
                    errorMsg(font);
                    isValid = false;
                }
                else if (inputElements[0].value == '' && (inputElements[0].offsetParent != null || userChange == true)){
                    errorMsg(font);
                    isValid = false;
                }
            }
            else if (inputElements.length > 1){
                let noneSelected = true;
                let selectedCount = 0;
                inputElements.forEach(elem => {
                    if (elem.type == 'radio' || elem.type == 'checkbox'){
                        if (elem.checked){
                            noneSelected = false;
                            selectedCount += 1;
                        }
                    }
                    else{
                        if (elem.value != ''){
                            noneSelected = false;
                            selectedCount += 1;
                        }
                    }
                });
                if (allRequired){
                    if (inputElements.length != selectedCount && font.offsetParent != null){
                        errorMsg(font);
                        isValid = false;
                    }
                }
                else{
                    if (noneSelected && font.offsetParent != null){
                        errorMsg(font);
                        isValid = false;
                    }
                }
            }
        });
    }
    if (document.querySelectorAll('.frame').length > 0){
        document.querySelectorAll('.frame').forEach(frame => {
            if (frame.contentWindow.userChange){
                if (frame.contentWindow.document.querySelectorAll('font[color=\'red\'], .redAsterisk').length > 0){
                    frame.contentWindow.document.querySelectorAll('font[color=\'red\'], .redAsterisk').forEach(font => {
                        let inputElements;
                        let allRequired = false;
                        if (font.closest('tr').querySelector('div[questionSelector]') != null){
                            const labelElement = font.closest('tr').querySelector('div[questionSelector]');
                            const selector = labelElement.getAttribute('questionSelector');
                            inputElements = [...frame.contentWindow.document.querySelectorAll(selector)].map(x => x.closest('tr').querySelector('input, select, textarea'));
                            if (labelElement.hasAttribute('allRequired')){
                                allRequired = true;
                            }
                        }
                        else{
                            inputElements = font.closest('table').querySelectorAll('input, select, textarea');
                        }
                        inputElements = [...inputElements].filter(x => x.type != 'button');
                        if (inputElements.length == 1){
                            if (inputElements[0].hasAttribute('data-value') && inputElements[0].getAttribute('data-value') == '' && inputElements[0].value == ''){
                                errorMsg(font);
                                isValid = false;
                                if (frame.contentWindow.document.querySelector('#questions_container').hidden){
                                    frame.contentWindow.document.querySelector('.toolHead').click();
                                }
                                frame.style.height = idealFrameHeight(frame);
                            }
                            else if (inputElements[0].value == '' && (inputElements[0].offsetParent != null || frame.contentWindow.userChange == true )){
                                errorMsg(font);
                                isValid = false;
                                if (frame.contentWindow.document.querySelector('#questions_container').hidden){
                                    frame.contentWindow.document.querySelector('.toolHead').click();
                                }
                                frame.style.height = idealFrameHeight(frame);
                            }
                        }
                        else if (inputElements.length > 1){
                            let noneSelected = true;
                            let selectedCount = 0;
                            inputElements.forEach(elem => {
                                if (elem.type == 'radio' || elem.type == 'checkbox'){
                                    if (elem.checked){
                                        noneSelected = false;
                                        selectedCount += 1;
                                    }
                                }
                                else{
                                    if (elem.value != ''){
                                        noneSelected = false;
                                        selectedCount += 1;
                                    }
                                }
                            });
                            if (allRequired){
                                if (inputElements.length != selectedCount && (font.offsetParent != null || frame.contentWindow.userChange == true)){
                                    errorMsg(font);
                                    isValid = false;
                                    if (frame.contentWindow.document.querySelector('#questions_container').hidden){
                                        frame.contentWindow.document.querySelector('.toolHead').click();
                                    }
                                    frame.style.height = idealFrameHeight(frame);
                                }
                            }
                            else{
                                if (noneSelected && (font.offsetParent != null || frame.contentWindow.userChange == true)){
                                    errorMsg(font);
                                    isValid = false;
                                    if (frame.contentWindow.document.querySelector('#questions_container').hidden){
                                        frame.contentWindow.document.querySelector('.toolHead').click();
                                    }
                                    frame.style.height = idealFrameHeight(frame);
                                }
                            }
                        }
                    });
                }
            }
        });
    }
    let errorMsgs = [...document.querySelectorAll('.errMsg')];
    document.querySelectorAll('.frame').forEach(frame => {
        errorMsgs = [...errorMsgs, ...frame.contentDocument.querySelectorAll('.errMsg')]
    });
    if (errorMsgs.length > 0){
        isValid = false;
    }
    return isValid;
}

function addStyling() {
    const css = document.createElement('style');
    css.textContent = `body{ width: 98vw; } /* IFRAMES */ .frameContainer{ width: 98vw; height: auto; margin-left: -2.75em; overflow-y: hidden; } .frame{ border: none; width: 100%; height: 100vh; overflow-y: hidden; } /* SUBMIT BUTTONS */ #buttonWrapper{ width: 100vw; max-width: 100%; margin-top: 2em; } #buttonContainer{ width: 25%; margin: 0px 37.5% 0px calc(37.5% - 30px); display: flex; flex-direction: row; column-gap: 1.5em; } #saveProgress, #complete{ margin: 0; width: 8.25em !important; font-size: 0.8em !important; } @media screen and (max-width: 800px){ #buttonContainer{ flex-direction: column; row-gap: 1.25em; } }`;
    document.head.appendChild(css);
}

let globalIsValid = true;

/* Async wizardry */
async function unrequireAll() {
  const promises = [];
  if (document.querySelectorAll('.frame').length > 0) {
    document.querySelectorAll('.frame').forEach((frame) => {
      frame.contentWindow.document.querySelector('form').noValidate = true;
      [...frame.contentWindow.document.querySelectorAll('div[requireCheckbox=true]')].forEach(element => {
        element.removeAttribute('requireCheckbox');
       });
      const reqFlags =
        frame.contentWindow.document.querySelectorAll('[required]');
      reqFlags.forEach((req) => {
        req.removeAttribute('required');
      });
      promises.push(
        new Promise((resolve, reject) => {
          if (
            frame.contentWindow.document.querySelectorAll('[required]')
              .length == 0
          ) {
            resolve();
          }
        })
      );
    });
  } else {
    document.querySelectorAll('[required]').forEach((req) => {
      req.removeAttribute('required');
    });
    promises.push(
      new Promise((resolve, reject) => {
        if (document.querySelectorAll('[required]').length == 0) {
          resolve();
        }
      })
    );
  }
  return Promise.all(promises);
}

async function submitFrames(){
    const frames = document.querySelectorAll('.frame');
    const promises = [...frames].map(async (frame) => {
        if (frame.contentWindow.userChange){
            await forceTemplateSubmit().catch((error) => {
                console.log(error);
            });
            return new Promise((resolve, reject) => { frame.contentWindow.document.querySelector('#oldComplete').click(); frame.onload = resolve; })
        }
    });

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

if(typeof waitForIt !== 'function'){
    function waitForIt (target){
        return new Promise((resolve) => {
            
            if(target !== null && target !== undefined){
                console.log(target);
                return resolve(target);
            }
            
            const observer = new MutationObserver(mutations => {
                if (target !== null && target !== undefined) {
                    observer.disconnect();
                    console.log(target);
                    resolve(target);
                }
            });

            observer.observe(document.body, {
                childList: true,
                subtree: true
            });
        });
    }  
}

async function forceTemplateSubmit(){
    return new Promise(async (resolve, reject) => {
        try{
            overrideTemplateValidator();
            document.querySelector('#txPlanModule').contentDocument.querySelector('#ctl00_cph_btnSave').click();
            document.querySelector('#txPlanModule').addEventListener('load',async () => {
                await waitForIt(document.querySelector('#txPlanModule').contentDocument.querySelector('#ctl00_cph_btnNewTX2'));
                return resolve('Found it');
            });
        }catch(error){
            console.log(error);
            reject('Doom');
        }
    });
}

async function formSubmit(){
    if (document.querySelectorAll('.frame').length > 0){
        unrequireAll().then(() => {
            submitFrames().then(() => {
                deleteFrames().then(() => {
                    document.querySelector('#input').submit();
                    /*let form = document.querySelector('form');

                    // Create the submit button
                    let submitBtn = document.createElement('button');
                    submitBtn.type = 'submit';
                    submitBtn.textContent = 'Submit'; // Button label
                    submitBtn.id = 'dynamicSubmitBtn';

                    // OPTIONAL: Clear default or attached behaviors
                    submitBtn.onclick = null;
                    submitBtn.removeAttribute('onclick');

                    // Append it to the form (or wherever you want)
                    form.appendChild(submitBtn);  

                    //Submit the form
                    document.querySelector('#dynamicSubmitBtn').click();*/
                });
            });
        });
    }
    else{
        await forceTemplateSubmit().catch((error) => {
            console.log(error);
        });
        unrequireAll(document).then(async () => {
            document.querySelector('#oldComplete').click();
            /* let form = document.querySelector('form');

            // Create the submit button
            let submitBtn = document.createElement('button');
            submitBtn.type = 'submit';
            submitBtn.textContent = 'Submit'; // Button label
            submitBtn.id = 'dynamicSubmitBtn';

            // OPTIONAL: Clear default or attached behaviors
            submitBtn.onclick = null;
            submitBtn.removeAttribute('onclick');

            // Append it to the form (or wherever you want)
            form.appendChild(submitBtn);  

            //Submit the form
            document.querySelector('#dynamicSubmitBtn').click(); */
        });
    }
}

async function formSubmitSaveProgress(){
    if (document.querySelectorAll('.frame').length > 0){
        unrequireAll().then(() => {
            submitFrames().then(() => {
                deleteFrames().then(() => {
                    document.querySelector('#input').submit();
                    /*let form = document.querySelector('form');

                    // Create the submit button
                    let submitBtn = document.createElement('button');
                    submitBtn.type = 'submit';
                    submitBtn.textContent = 'Submit'; // Button label
                    submitBtn.id = 'dynamicSubmitBtn';

                    // OPTIONAL: Clear default or attached behaviors
                    submitBtn.onclick = null;
                    submitBtn.removeAttribute('onclick');

                    // Append it to the form (or wherever you want)
                    form.appendChild(submitBtn);  

                    //Submit the form
                    document.querySelector('#dynamicSubmitBtn').click();*/
                });
            });
        });
    }
    else{
        await forceTemplateSubmit().catch((error) => {
            console.log(error);
        });
        unrequireAll(document).then(async () => {
            //document.querySelector('#oldComplete').click();
            let form = document.querySelector('form');

            // Create the submit button
            let submitBtn = document.createElement('button');
            submitBtn.type = 'submit';
            submitBtn.textContent = 'Submit'; // Button label
            submitBtn.id = 'dynamicSubmitBtn';

            // OPTIONAL: Clear default or attached behaviors
            submitBtn.onclick = null;
            submitBtn.removeAttribute('onclick');

            // Append it to the form (or wherever you want)
            form.appendChild(submitBtn);  

            //Submit the form
            document.querySelector('#dynamicSubmitBtn').click();
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

/*Locate Right Frame regardless of page*/
function findFrameByName(win, targetName) {
  // Check current frame
  if (win.name === targetName) {
    return win;
  }

  // Search child frames
  for (let i = 0; i < win.frames.length; i++) {
    try {
      const found = findFrameByName(win.frames[i], targetName);
      if (found) {
        return found; // ✅ Return immediately if found
      }
    } catch (e) {
      // Cross-origin frame; skip
      continue;
    }
  }

  // Not found in this branch
  return null;
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
        
        let rightFrame = findFrameByName(window.top, 'right');

        try{
            let childFrames = rightFrame.document.querySelectorAll('iframe');

            for(let i = 0; i < childFrames.length; i++){
                try{
                    childFrames[i].contentDocument.querySelector('form').removeEventListener('submit', checkRequiredCheckboxes);
                }catch(error){
                    console.log(error);
                    try{
                        document.querySelector('form').removeEventListener('submit', checkRequiredCheckboxes);
                    }catch(error){
                        console.log(error);
                    }                
                }
            }
        }catch(error){
            console.log(error);
            try{
                document.querySelector('form').removeEventListener('submit', checkRequiredCheckboxes);
            }catch(error){
                console.log(error);
            }
        }
        
        /*try{
            document.querySelector('form').removeEventListener('submit', checkRequiredCheckboxes);
        }catch(error){
            console.log(error);
        }*/
        
        /*let form = document.querySelector('form');

        // Create the submit button
        let submitBtn = document.createElement('button');
        submitBtn.type = 'submit';
        submitBtn.textContent = 'Submit'; // Button label
        submitBtn.id = 'dynamicSubmitBtn';

        // OPTIONAL: Clear default or attached behaviors
        submitBtn.onclick = null;
        submitBtn.removeAttribute('onclick');

        // Append it to the form (or wherever you want)
        form.appendChild(submitBtn);  

        //Submit the form
        document.querySelector('#dynamicSubmitBtn').click();*/    
        formSubmitSaveProgress();
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
    buttonWrapper.style.position = 'sticky';
    buttonWrapper.style.bottom = '0px';

    if ((frameElement != null && !frameElement.classList.contains('frame')) || getURLQueryStringParameter('formbuilder') == '1'){
        buttonWrapper.insertBefore(buttonContainer, oldComplete);
        buttonContainer.appendChild(saveProgress);
        buttonContainer.appendChild(complete);
    }
    window.onbeforeunload = () => { console.log(document.querySelector('.toolHead').textContent); };
}

document.addEventListener('DOMContentLoaded', () => { createSubmitButtons(); addStyling(); } );