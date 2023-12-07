function defaultDropDown(target, condition){
    let options = target.querySelectorAll('option');
    let targetValue = undefined;
    try{
        targetValue = [...options].filter((option) => {
            return option.innerText === condition;
        })[0].value;
    }catch(error){
        console.log(error);
    }

    if(target.value === '' && targetValue !== undefined){
        target.value = targetValue;
    }
}

document.addEventListener('DOMContentLoaded', (event) => {
    [...document.querySelectorAll('.defaultDropDown')].forEach((div) => {
        try{
            let select = div.closest('table').querySelector('select');
            let condition = div.getAttribute('defaultAnswer');
            defaultDropDown(select, condition);
        }catch(error){
            console.log(error);
        }
    });
});