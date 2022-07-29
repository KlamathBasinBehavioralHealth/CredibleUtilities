function selectionCheck(list){
    let selected = false;
    list.forEach(elem => {
        if (elem.type == 'radio' || elem.type == 'checkbox'){
            if (elem.checked){
                selected = true;
            }
        }
        else{
            if (elem.value != ''){
                selected = true;
            }
        }
    });
    return selected;
}