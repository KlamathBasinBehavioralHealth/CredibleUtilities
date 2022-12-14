let env = 'live';
let groupTest = false;
function checkGroup(){
    if (frameElement != null && !frameElement.classList.contains('frame')){
        if(parent.document.querySelector('frame[name=\'left\']').contentWindow.document.querySelector('select') != null){
            const clientCount = parent.document.querySelector('frame[name=\'left\']').contentWindow.document.querySelector('select').options.length - 1;
            if (clientCount > 1){
                return true;
            }
        }
    }
    else{
        if(parent.parent.document.querySelector('frame[name=\'left\']').contentWindow.document.querySelector('select') != null){
            const clientCount = parent.parent.document.querySelector('frame[name=\'left\']').contentWindow.document.querySelector('select').options.length - 1;
            if (clientCount > 1){
                return true;
            }
        }
    }
    return false
}

function isGroup(environment){
    let group = false;
    if (environment == 'test'){
        group = groupTest;
    }
    else{
        group = checkGroup();
    }

    return group;
}

function removeMdd(environment){
    if (isGroup(environment)){
        document.querySelectorAll('#mddDx, #phq9Score, #cssrsScore, .groupHide').forEach(indivItem => {
            indivItem.closest('table').closest('tr').remove();
        });
    }
}

setTimeout(() => {removeMdd(env)}, 2000);