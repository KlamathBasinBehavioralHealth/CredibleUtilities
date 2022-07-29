function selectDropdownOption(e, selector, dropdownSelector){
    const currentChecked = e.target.closest('tr').querySelector(selector);
    const checkboxIndex = [...document.querySelectorAll(selector)].indexOf(currentChecked);
    const dropdown = document.querySelector(dropdownSelector).closest('table').querySelector('select');
    const valueList = [...dropdown].filter(x => x.value).map(x => x.value);

    if (e.target.checked){ 
        dropdown.value = valueList[checkboxIndex];
    }
    else{
        dropdown.value = '';
    }
}

function deployDropdownSelector(selector, dropdownSelector){
    document.querySelectorAll(selector).forEach((elem) => {
        if (elem.closest('tr').querySelector('input') != null){
            const input = elem.closest('tr').querySelector('input');
            input.onclick = (e) => {
                exclusiveCheckbox(e);
                selectDropdownOption(e, selector, dropdownSelector);
            };
        }
    });
}