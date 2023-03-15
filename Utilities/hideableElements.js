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

function checkConditionsHeader(mode, inputs, selects, conditions, header){
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

function hideableHeaderSetDrivers(){
  [...document.querySelectorAll('.hideableHeader')].map((header) => {
    let mode = document.querySelector(header).getAttribute('mode');
    let inputDriverArray = [];
    let selectDriverArray = [];
    let conditionArray = [] ;

    [...document.querySelector(header).getAttribute('condition').split(' ')].map((condition) => {
      conditionArray.push(condition);
    });

    [...document.querySelector(header).getAttribute('driver').split(' ')].map((driver) => {
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

    inputDriverArray.map((element) => {
      element.addEventListener('change', (event) => {
        checkConditionsHeader(mode, inputDriverArray, selectDriverArray, conditionArray, header);
      });
      element.addEventListener('mouseleave', (event) => {
        checkConditionsHeader(mode, inputDriverArray, selectDriverArray, conditionArray, header);
      });
    });

    selectDriverArray.map((element) => {
      element.addEventListener('change', (event) => {
        checkConditionsHeader(mode, inputDriverArray, selectDriverArray, conditionArray, header);
      });
      element.addEventListener('mouseleave', (event) => {
        checkConditionsHeader(mode, inputDriverArray, selectDriverArray, conditionArray, header);
      });
    });
   
    checkConditionsHeader(mode, inputDriverArray, selectDriverArray, conditionArray, header);
  });
}

function hideShowHiddenHeader(hideShow = 'hide', header){  
  if(hideShow == 'hide'){
    header.closest('tbody').querySelector('.hiddenHeaderButton').closest('tbody').querySelector('input').checked = false;
    visibility('hide', header);
  }
  else if(hideShow == 'show'){
    header.closest('tbody').querySelector('.hiddenHeaderButton').closest('tbody').querySelector('input').checked = true;
    visibility('show', header);
  }
}

function checkConditionsQuestion(mode, requireOnShow, inputs, selects, conditions, question){
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
      hideShowHideableQuestion('show', question, requireOnShow);
      return true;
    }else if (mode == 'hideOnTrue'){
      hideShowHideableQuestion('hide', question, requireOnShow);
      return false;
    }
  }else{
    if(mode == 'showOnTrue'){
      hideShowHideableQuestion('hide', question, requireOnShow);
      return false;
    }else if (mode == 'hideOnTrue'){
      hideShowHideableQuestion('show', question, requireOnShow);
      return true;
    }
  }
}

function hideableQuestionSetDrivers(){
  [...document.querySelectorAll('.hideableQuestion')].map((question) => {
    let mode = document.querySelector(question).getAttribute('mode');
    let requireOnShow = document.querySelector(question).getAttribute('requireOnShow');
    let inputDriverArray = [];
    let selectDriverArray = [];
    let conditionArray = [] ;

    [...document.querySelector(question).getAttribute('condition').split(' ')].map((condition) => {
      conditionArray.push(condition);
    });

    [...document.querySelector(question).getAttribute('driver').split(' ')].map((driver) => {
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

    inputDriverArray.map((element) => {
      element.addEventListener('change', (event) => {
        checkConditionsQuestion(mode, requireOnShow, inputDriverArray, selectDriverArray, conditionArray, header);
      });
      element.addEventListener('mouseleave', (event) => {
        checkConditionsQuestion(mode, requireOnShow, inputDriverArray, selectDriverArray, conditionArray, header);
      });
    });

    selectDriverArray.map((element) => {
      element.addEventListener('change', (event) => {
        checkConditionsQuestion(mode, requireOnShow, inputDriverArray, selectDriverArray, conditionArray, header);
      });
      element.addEventListener('mouseleave', (event) => {
        checkConditionsQuestion(mode, requireOnShow, inputDriverArray, selectDriverArray, conditionArray, header);
      });
    });
   
    checkConditionsQuestion(mode, requireOnShow, inputDriverArray, selectDriverArray, conditionArray, header);
  });
}

function hideShowHideableQuestion(hideShow = 'hide', question, requireOnShow = false){  
  if(hideShow == 'hide'){
    visibility('hide', question, requireOnShow);
  }
  else if(hideShow == 'show'){
    visibility('show', question, requireOnShow);
  }
}

window.addEventListener('load', (event) =>{
  headerButtons();
  hideableHeaderSetDrivers();
  hideableQuestionSetDrivers();
  console.log('Window onload event.');
});