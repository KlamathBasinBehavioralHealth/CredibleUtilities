let env = 'live';
let groupTest = false;
function checkGroup(){
    if (frameElement != null && !frameElement.classList.contains('frame')){
        try{
            if(parent.document.querySelector('frame[name=\'left\']').contentWindow.document.querySelector('#group_notes') != null){
                return true;
            }
        }catch(error){
            console.log(error);
        }
    }
    else{
        try{
            if(parent.parent.document.querySelector('frame[name=\'left\']').contentWindow.document.querySelector('#group_notes') != null){
                return true;
            }
        }catch(error){
            console.log(error);
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

setTimeout(() => {removeMdd(env)}, 3000);
