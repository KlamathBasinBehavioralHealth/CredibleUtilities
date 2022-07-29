let errCount = 0;

function errorMsg(element){
    const err = document.createElement('p');
    err.className = 'errMsg';
    if (element.parentElement != null){
        err.innerHTML = `Please complete <b><i>${element.parentElement.textContent.replace('*','')}</i></b>`;
    }
    err.style.color = 'red';
    let inputElements = [];
    if (element.closest('tr') != null && element.closest('tr').querySelector('div[questionSelector]') != null){
        const selector = element.closest('tr').querySelector('div[questionSelector]').getAttribute('questionSelector');
        inputElements = [...element.closest('body').querySelectorAll(selector)].map(x => x.closest('tr').querySelector('input, select, textarea'));
    }
    else if (element.closest('table') != null){
        inputElements = element.closest('table').querySelectorAll('input, select, textarea')
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
                inputElements.forEach(elem => {
                    if (elem.type == 'radio' || elem.type == 'checkbox'){
                    if (elem.checked){
                            noneSelected = false;
                        }
                    }
                    else{
                        if (elem.value != ''){
                            noneSelected = false;
                        }
                    }
                });
                if(noneSelected){
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
            if (font.closest('tr').querySelector('div[questionSelector]') != null){
                const selector = font.closest('tr').querySelector('div[questionSelector]').getAttribute('questionSelector');
                inputElements = [...document.querySelectorAll(selector)].map(x => x.closest('tr').querySelector('input, select, textarea'));
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
                else if (inputElements[0].value == '' && (inputElements[0].offsetParent != null || userChange == true )){
                    errorMsg(font);
                    isValid = false;
                }
            }
            else if (inputElements.length > 1){
                let noneSelected = true;
                inputElements.forEach(elem => {
                    if (elem.type == 'radio' || elem.type == 'checkbox'){
                        if (elem.checked){
                            noneSelected = false;
                        }
                    }
                    else{
                        if (elem.value != ''){
                            noneSelected = false;
                        }
                    }
                });
                if (noneSelected && font.offsetParent != null){
                    errorMsg(font);
                    isValid = false;
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
                        if (font.closest('tr').querySelector('div[questionSelector]') != null){
                            const selector = font.closest('tr').querySelector('div[questionSelector]').getAttribute('questionSelector');
                            inputElements = [...frame.contentWindow.document.querySelectorAll(selector)].map(x => x.closest('tr').querySelector('input, select, textarea'));
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
                            else if (inputElements[0].value == '' && (inputElements[0].offsetParent != null || userChange == true )){
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
                            inputElements.forEach(elem => {
                                if (elem.type == 'radio' || elem.type == 'checkbox'){
                                    if (elem.checked){
                                        noneSelected = false;
                                    }
                                }
                                else{
                                    if (elem.value != ''){
                                        noneSelected = false;
                                    }
                                }
                            });
                            if (noneSelected && (font.offsetParent != null || frame.contentWindow.userChange == true)){
                                errorMsg(font);
                                isValid = false;
                                if (frame.contentWindow.document.querySelector('#questions_container').hidden){
                                    frame.contentWindow.document.querySelector('.toolHead').click();
                                }
                                frame.style.height = idealFrameHeight(frame);
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