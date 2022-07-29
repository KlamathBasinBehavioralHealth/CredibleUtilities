let mainHref;
function setHref(context, formName, submitBool){
    const navTree = context.querySelector('a.form_yellow').closest('tbody');
    navTree.querySelectorAll('a').forEach(link => {
        if (link.textContent != formName){
            if (submitBool){
                link.href = refList[camelCase(link.textContent)];
            }
            else{
                link.href = 'javascript:void(0)';
            }
        }
        else{
            if (submitBool){
                link.href = mainHref;
            }
            else{
                mainHref = link.href;
                link.href = 'javascript:void(0)';
            }
        }
    });
}

function hideSubforms(context, folderText, bool){
    const subformParent = findLinkFromText(folderText, context).parentElement;
    if (bool){
        subformParent.hidden = true;
    }
    else{
        subformParent.hidden = false;
    }
}

function setLinks(context, folderText){
    const links = findLinkFromText(folderText, context).parentElement.querySelectorAll('a.form_yellow');
    links.forEach(link => {
        link.onclick = (e) => {
            const frame = document.querySelector('#' + camelCase(link.textContent));
            frame.scrollIntoView();
            if (frame.contentWindow.document.querySelector('#questions_container').hidden){
                frame.contentWindow.document.querySelector('.toolHead').click();
            }
        };
    });
}