function headerButtons(state = 'hide'){
  [...document.querySelectorAll('.hiddenHeader')].map((header) => {
    if(state == 'hide'){
      header.closest('tbody').querySelector('.hiddenHeaderButton').closest('table').style.display = 'none';
    }
    else if(state == 'show'){
      header.closest('tbody').querySelector('.hiddenHeaderButton').closest('table').style.display = 'block';
    }
  });
}

function getOptionValue(select, optionText){
  let found = false;
  let value = undefined;
  [...select.querySelectorAll('option')].map((option) => {
      console.log(option.innerText);
      if(option.innerText == optionText){
          found = true;
          value = option.value;
      }
  });
  return value;
}

function checkConditions(mode, inputs, selects, conditions, header){
  let isChecked = false;
  let isSelected = false;
  let conditionValues = [];

  selects.forEach(select => {
    conditions.forEach(condition => {
      if(getOptionValue(select, condition)){
        conditionValues.push(getOptionValue(select, condition));
      }
    });
  });
  
  inputs.forEach(input => {
    if(input.checked){
        isChecked = true;
    }
  });
  
  selects.forEach(input => {
    if([...conditionValues].includes(input.value)){
        isSelected = true;
    }
  });

  if(isChecked || isSelected){
    if(mode == 'showOnTrue'){
      hideShowHiddenHeader('show', header);
      return true;
    }else if (mode == 'hideOnTrue'){
      hideShowHiddenHeader('hide', header);
      return false;
    }
  }else{
    if(mode == 'showOnTrue'){
      hideShowHiddenHeader('hide', header);
      return false;
    }else if (mode == 'hideOnTrue'){
      hideShowHiddenHeader('show', header);
      return true;
    }
  }
}

function hiddenHeadeSetDrivers(){
  [...document.querySelectorAll('.hiddenHeader')].map((header) => {
    let buttonMode = document.querySelector('#labelID').getAttribute('buttonMode');
    let inputDriverArray = [];
    let selectDriverArray = [];
    let conditionArray = [] ;

    console.log(buttonMode);

    [...document.querySelector('#labelID').getAttribute('showCondition').split(' ')].map((condition) => {
      conditionArray.push(condition);
    });

    console.log(conditionArray);

    [...document.querySelector('#labelID').getAttribute('driver').split(' ')].map((driver) => {
      let element = document.querySelector(`#${driver}`).closest('tr').querySelector('input, select');
      try{
        if(element.tagName == 'INPUT'){
          inputDriverArray.push(element);
        }
      }catch(error){
        element = document.querySelector(`#${driver}`).closest('tbody').querySelector('input, select');
        if(element.tagName == 'SELECT'){
          selectDriverArray.push(element);
        }
      }
    }); 

    console.log(inputDriverArray);
    console.log(selectDriverArray);

    inputDriverArray.map((element) => {
      element.addEventListener('change', (event) => {
        checkConditions(buttonMode, inputDriverArray, selectDriverArray, conditionArray, header);
      });
      element.addEventListener('mouseleave', (event) => {
        checkConditions(buttonMode, inputDriverArray, selectDriverArray, conditionArray, header);
      });
    });

    selectDriverArray.map((element) => {
      element.addEventListener('change', (event) => {
        checkConditions(buttonMode, inputDriverArray, selectDriverArray, conditionArray, header);
      });
      element.addEventListener('mouseleave', (event) => {
        checkConditions(buttonMode, inputDriverArray, selectDriverArray, conditionArray, header);
      });
    });
   
    checkConditions(buttonMode, inputDriverArray, selectDriverArray, conditionArray, header);
  });
}

function hideShowHiddenHeader(hideShow = 'hide', header){  
  if(hideShow == 'hide'){
    header.closest('tbody').querySelector('.hiddenHeaderButton').closest('tbody').querySelector('input').checked = false;
    visibility('hide', '.hiddenHeader');
  }
  else if(hideShow == 'show'){
    header.closest('tbody').querySelector('.hiddenHeaderButton').closest('tbody').querySelector('input').checked = true;
    visibility('show', '.hiddenHeader');
  }
}

window.addEventListener('load', (event) =>{
  headerButtons();
  hiddenHeadeSetDrivers();
  console.log('Window onload event.');
});