const intervalTime = 250;

document.addEventListener('DOMContentLoaded', () => {
  if(typeof visibility != 'function'){
    window.include = function (file){
      var script = document.createElement('script');
      script.src = file;
      script.type = 'text/javascript';
      script.defer = true;
        
      document.getElementsByTagName('head').item(0).appendChild(script);
    }
  
    include('https://cdn.jsdelivr.net/gh/KlamathBasinBehavioralHealth/CredibleUtilities@cbb0828/Utilities/visibility.js');
  }
});

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
  if(document.querySelector('[name=Complete]')){
    [...document.querySelectorAll('.hideableHeader')].map((header) => {
      if(state == 'hide'){
        header.closest('tbody').querySelector('.hideableHeaderButton').closest('table').style.display = 'none';
      }
      else if(state == 'show'){
        header.closest('tbody').querySelector('.hideableHeaderButton').closest('table').style.display = 'block';
      }
    });
  }
}

function getOptionValue(select, optionText){
  if(document.querySelector('[name=Complete]')){
    let found = false;
    let value = undefined;
    [...select.querySelectorAll('option')].map((option) => {
        if(option.innerText == optionText){
            found = true;
            value = option.value;
        }
    });
    return value;
  }
}

function checkConditionsHeader(mode, textMode, inputs, selects, texts, conditions, header){
  if(document.querySelector('[name=Complete]')){
    try{
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
          if(text.value){
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
    }catch(error){
      console.log(error);
    }  
  }
}

function hideableHeaderSetDrivers(){
  if(document.querySelector('[name=Complete]')){
    try{
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
  
        try{
          [...header.getAttribute('condition').split(';')].map((condition) => {
            conditionArray.push(condition);
          });
        }catch(error){
          console.log(error);
        }
  
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
            }else if(element.tagName == 'SELECT'){
              selectDriverArray.push(element);
            }
          }catch(error){
            element = document.querySelector(`#${driver}`).closest('tbody').querySelector('input, select');
            if(element.tagName == 'SELECT'){
              selectDriverArray.push(element);
            }
          }
        });
  
        setInterval(() => {
          checkConditionsHeader(mode, textMode, inputDriverArray, selectDriverArray, textDriverArray, conditionArray, header);
        }, intervalTime);
      
        checkConditionsHeader(mode, textMode, inputDriverArray, selectDriverArray, textDriverArray, conditionArray, header);
      });
    }catch(error){
      console.log(error);
    }  
  }
}

function hideShowHideableHeader(hideShow = 'hide', header){  
  if(document.querySelector('[name=Complete]')){
    if(hideShow == 'hide'){
      header.closest('tbody').querySelector('.hideableHeaderButton').closest('tbody').querySelector('input').checked = false;
      visibility('hide', header);
    }
    else if(hideShow == 'show'){
      header.closest('tbody').querySelector('.hideableHeaderButton').closest('tbody').querySelector('input').checked = true;
      visibility('show', header);
    }
  }
}

function checkConditionsQuestion(mode, textMode, requireOnShow, inputs, selects, texts, conditions, question){
  if(document.querySelector('[name=Complete]')){
    try{
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
          if(text.value){
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
    }catch(error){
      console.log(error);
    }
  }
}

function hideableQuestionSetDrivers(){
  if(document.querySelector('[name=Complete]')){
    try{
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
  
        try{
          [...question.getAttribute('condition').split(';')].map((condition) => {
            conditionArray.push(condition);
          });
        }catch(error){
          console.log(error);
        }
  
        let element = null;
        
        try{
          [...question.getAttribute('driver')?.split(' ')].map((driver) => {
            element = null;
            if(document.querySelector(`#${driver}`)?.closest('tr').querySelector('input, select')){
              element = document.querySelector(`#${driver}`).closest('tr').querySelector('input, select');
            }else{
              if(document.querySelector(`#${driver}`)?.closest('table').querySelector('input, select')){
                element = document.querySelector(`#${driver}`)?.closest('table').querySelector('input, select');
              }
            } 
            try{
              if(element.tagName == 'INPUT'){
                if(element.type == 'checkbox' || element.type == 'radio'){
                  inputDriverArray.push(element);
                }else{
                  textDriverArray.push(element);
                }
              }else if(element.tagName == 'SELECT'){
                selectDriverArray.push(element);
              }
            }catch(error){
              element = document.querySelector(`#${driver}`)?.closest('tbody').querySelector('input, select');
              if(element.tagName == 'SELECT'){
                selectDriverArray.push(element);
              }
            }
          });
        }catch(error){
          console.log(error);
        }
      
        setInterval(() => {
          checkConditionsQuestion(mode, textMode, requireOnShow, inputDriverArray, selectDriverArray, textDriverArray, conditionArray, question);
        }, intervalTime);
      
        checkConditionsQuestion(mode, textMode, requireOnShow, inputDriverArray, selectDriverArray, textDriverArray, conditionArray, question);
      });
    }catch(error){
      console.log(error);
    }
  }
}

function hideShowHideableQuestion(hideShow = 'hide', question, requireOnShow = false){ 
  if(document.querySelector('[name=Complete]')){
    if(hideShow == 'hide'){
      visibility('hide', question, requireOnShow);
    }
    else if(hideShow == 'show'){
      visibility('show', question, requireOnShow);
    }
  }
}

function requireTextareas(){
  if(document.querySelector('[name=Complete]')){
    [...document.querySelectorAll('.requireTextarea')].map(element => {
      let textarea = undefined;
      try{
        let input = element.closest('table').querySelector('input, select');
        try{
          textarea = element.closest('table').closest('tr').nextElementSibling.querySelector('textarea');
        }catch(error){
          console.log('Where the text area at?');
          console.log('error');
        }
  
        setInterval(() => {
          if(checkRedAsterisk(textarea)){
            textarea.nextSibling.remove();
          }
          try{
            if(window.getComputedStyle(textarea.closest('table')).display == 'table'){
              textarea.required = true;
              textarea.after(createRedAsterisk());
            }else if(window.getComputedStyle(textarea.closest('table')).display == 'none'){
              textarea.required = false;
            }
          }catch(error){
            console.log(error);
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
}

function loadHide(){
  if(document.querySelector('[name=Complete]')){
    [...document.querySelectorAll('.hideOnLoad')].forEach((element) => {
        visibility('hide', element);    
    });
  }
}

window.addEventListener('load', (event) =>{
  if(document.querySelector('[name=Complete]')){
    headerButtons();
    hideableHeaderSetDrivers();
    hideableQuestionSetDrivers();
    requireTextareas();
    loadHide();
    console.log('Hideable elements load event.');
  }
});
