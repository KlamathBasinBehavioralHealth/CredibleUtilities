const intervalTime = 250;

if(typeof visibilty != 'function'){
  window.include = function (file){
    var script = document.createElement('script');
    script.src = file;
    script.type = 'text/javascript';
    script.defer = true;
      
    document.getElementsByTagName('head').item(0).appendChild(script);
  }

  include('https://cdn.jsdelivr.net/gh/KlamathBasinBehavioralHealth/CredibleUtilities@0da3d17/Utilities/visibility.js');
}

if(typeof checkRedAsterisk != 'function'){
  function checkRedAsterisk(target){
    if(target?.nextSibling?.className == 'redAsterisk'){
      return true;
    }
    else{
      return false;
    }
  }
}

if(typeof createRedAsterisk != 'function'){
  function createRedAsterisk(){
    let redAsterisk = document.createElement('div');
        redAsterisk.className = 'redAsterisk';
        redAsterisk.style = 'color:red; display:inline;';
        redAsterisk.innerText = '*';
    return redAsterisk;
  } 
}

function headerButtons(state = 'hide'){
  [...document.querySelectorAll('.hideableHeader')].map((header) => {
    if(state == 'hide'){
      header.closest('tbody').querySelector('.hideableHeaderButton').closest('table').style.display = 'none';
    }
    else if(state == 'show'){
      header.closest('tbody').querySelector('.hideableHeaderButton').closest('table').style.display = 'block';
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

function checkConditionsHeader(mode, textMode, inputs, selects, texts, conditions, header){
  let isChecked = false;
  let isSelected = false;
  let isTexted = false;
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

  texts.forEach(text => {
    if(textMode == 'match'){
      if([...conditions].includes(text.value)){
        isTexted = true;
      }
    }
    if(textMode == 'any'){
      if(text){
        isTexted = true;
      }
    }
  });

  if(isChecked || isSelected || isTexted){
    if(mode == 'showOnTrue'){
      hideShowHideableHeader('show', header);
      return true;
    }else if (mode == 'hideOnTrue'){
      hideShowHideableHeader('hide', header);
      return false;
    }
  }else{
    if(mode == 'showOnTrue'){
      hideShowHideableHeader('hide', header);
      return false;
    }else if (mode == 'hideOnTrue'){
      hideShowHideableHeader('show', header);
      return true;
    }
  }
}

function hideableHeaderSetDrivers(){
  [...document.querySelectorAll('.hideableHeader')].map((header) => {
    let mode = header.getAttribute('mode');
    let textMode = '';
    try{
      textMode = header.getAttribute('textMode');
    }catch(error){
      console.log(error);
    }
    let inputDriverArray = [];
    let selectDriverArray = [];
    let textDriverArray = [];
    let conditionArray = [] ;

    [...header.getAttribute('condition').split(';')].map((condition) => {
      conditionArray.push(condition);
    });

    [...header.getAttribute('driver').split(' ')].map((driver) => {
      let element = null;
      if(document.querySelector(`#${driver}`).closest('tr').querySelector('input, select')){
        element = document.querySelector(`#${driver}`).closest('tr').querySelector('input, select');
      }else{
        if(document.querySelector(`#${driver}`).closest('table').querySelector('input, select')){
          element = document.querySelector(`#${driver}`).closest('table').querySelector('input, select');
        }
      }      
      document.querySelector(`#${driver}`).closest('tr').querySelector('input, select');
      try{
        if(element.tagName == 'INPUT'){
          if(element.type == 'checkbox' || element.type == 'radio'){
            inputDriverArray.push(element);
          }else{
            textDriverArray.push(element);
          }
        }
      }catch(error){
        element = document.querySelector(`#${driver}`).closest('tbody').querySelector('input, select');
        if(element.tagName == 'SELECT'){
          selectDriverArray.push(element);
        }
      }
    }); 

    /* inputDriverArray.map((element) => {
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
    }); */

    setInterval(() => {
      checkConditionsHeader(mode, textMode, inputDriverArray, selectDriverArray, textDriverArray, conditionArray, header);
    }, intervalTime);
   
    checkConditionsHeader(mode, textMode, inputDriverArray, selectDriverArray, textDriverArray, conditionArray, header);
  });
}

function hideShowHideableHeader(hideShow = 'hide', header){  
  if(hideShow == 'hide'){
    header.closest('tbody').querySelector('.hideableHeaderButton').closest('tbody').querySelector('input').checked = false;
    visibility('hide', header);
  }
  else if(hideShow == 'show'){
    header.closest('tbody').querySelector('.hideableHeaderButton').closest('tbody').querySelector('input').checked = true;
    visibility('show', header);
  }
}

function checkConditionsQuestion(mode, textMode, requireOnShow, inputs, selects, texts, conditions, question){
  let isChecked = false;
  let isSelected = false;
  let isTexted = false;
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

  texts.forEach(text => {
    if(textMode == 'match'){
      if([...conditions].includes(text.value)){
        isTexted = true;
      }
    }
    if(textMode == 'any'){
      if(text){
        isTexted = true;
      }
    }
  });

  if(isChecked || isSelected || isTexted){
    if(mode == 'showOnTrue'){
      hideShowHideableQuestion('show', question, requireOnShow);
      return true;
    }else if (mode == 'hideOnTrue'){
      hideShowHideableQuestion('hide', question);
      return false;
    }
  }else{
    if(mode == 'showOnTrue'){
      hideShowHideableQuestion('hide', question);
      return false;
    }else if (mode == 'hideOnTrue'){
      hideShowHideableQuestion('show', question, requireOnShow);
      return true;
    }
  }
}

function hideableQuestionSetDrivers(){
  [...document.querySelectorAll('.hideableQuestion')].map((question) => {
    let mode = question.getAttribute('mode');
    let textMode = '';
    try{
      textMode = question.getAttribute('textMode');
    }catch(error){
      console.log(error);
    }
    let requireOnShow = JSON.parse(question.getAttribute('requireOnShow'));
    let inputDriverArray = [];
    let selectDriverArray = [];
    let textDriverArray = [];
    let conditionArray = [] ;

    [...question.getAttribute('condition').split(';')].map((condition) => {
      conditionArray.push(condition);
    });

    [...question.getAttribute('driver').split(' ')].map((driver) => {
      let element = null;
      if(document.querySelector(`#${driver}`).closest('tr').querySelector('input, select')){
        element = document.querySelector(`#${driver}`).closest('tr').querySelector('input, select');
      }else{
        if(document.querySelector(`#${driver}`).closest('table').querySelector('input, select')){
          element = document.querySelector(`#${driver}`).closest('table').querySelector('input, select');
        }
      } 
      try{
        if(element.tagName == 'INPUT'){
          if(element.type == 'checkbox' || element.type == 'radio'){
            inputDriverArray.push(element);
          }else{
            textDriverArray.push(element);
          }
        }
      }catch(error){
        element = document.querySelector(`#${driver}`).closest('tbody').querySelector('input, select');
        if(element.tagName == 'SELECT'){
          selectDriverArray.push(element);
        }
      }
    });

    /* inputDriverArray.map((element) => {
      element.addEventListener('change', (event) => {
        checkConditionsQuestion(mode, requireOnShow, inputDriverArray, selectDriverArray, conditionArray, question);
      });
      element.addEventListener('mouseleave', (event) => {
        checkConditionsQuestion(mode, requireOnShow, inputDriverArray, selectDriverArray, conditionArray, question);
      });
    });

    selectDriverArray.map((element) => {
      element.addEventListener('change', (event) => {
        checkConditionsQuestion(mode, requireOnShow, inputDriverArray, selectDriverArray, conditionArray, question);
      });
      element.addEventListener('mouseleave', (event) => {
        checkConditionsQuestion(mode, requireOnShow, inputDriverArray, selectDriverArray, conditionArray, question);
      });
    }); */
    setInterval(() => {
      checkConditionsQuestion(mode, textMode, requireOnShow, inputDriverArray, selectDriverArray, textDriverArray, conditionArray, question);
    }, intervalTime);
   
    checkConditionsQuestion(mode, textMode, requireOnShow, inputDriverArray, selectDriverArray, textDriverArray, conditionArray, question);
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

function requireTextareas(){
  [...document.querySelectorAll('.requireTextarea')].map(element => {
    try{
      let input = element.closest('table').querySelector('input, select')
      let textarea = element.closest('table').closest('tr').nextElementSibling.querySelector('textarea');

      /* input.addEventListener('change', event => {
        if(checkRedAsterisk(textarea)){
          textarea.nextSibling.remove();
        }
        if(window.getComputedStyle(textarea.closest('table')).display == 'table'){
          textarea.required = true;
          textarea.after(createRedAsterisk());
        }else if(window.getComputedStyle(textarea.closest('table')).display == 'none'){
          textarea.required = false;
        }
        console.log('Change event.');
      });
      input.addEventListener('mouseleave', event => {
        if(checkRedAsterisk(textarea)){
          textarea.nextSibling.remove();
        }
        if(window.getComputedStyle(textarea.closest('table')).display == 'table'){
          textarea.required = true;
          textarea.after(createRedAsterisk());
        }else if(window.getComputedStyle(textarea.closest('table')).display == 'none'){
          textarea.required = false;
        }
        console.log('Mouseleave event.');
      }); */
      setInterval(() => {
        if(checkRedAsterisk(textarea)){
          textarea.nextSibling.remove();
        }
        if(window.getComputedStyle(textarea.closest('table')).display == 'table'){
          textarea.required = true;
          textarea.after(createRedAsterisk());
        }else if(window.getComputedStyle(textarea.closest('table')).display == 'none'){
          textarea.required = false;
        }
      }, intervalTime);
    }catch(error){
      console.log(error);
    }

    try{
      if(window.getComputedStyle(textarea.closest('table')).display == 'table'){
        textarea.required = true;
      }else if(window.getComputedStyle(textarea.closest('table')).display == 'none'){
        textarea.required = false;
      }
    }catch(error){
      console.log(error);
    }
  });
}

window.addEventListener('load', (event) =>{
  headerButtons();
  hideableHeaderSetDrivers();
  hideableQuestionSetDrivers();
  requireTextareas();
  console.log('Window onload event.');
});