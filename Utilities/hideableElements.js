try{ 
  intervalTime = 250;   
}catch(error){ 
  console.log(error); 
  let intervalTime = 250;   
}    
if(typeof checkRedAsterisk != 'function'){ 
  function checkRedAsterisk(target){   
    if(target?.nextSibling?.className == 'redAsterisk'){ 
      return true;   
    }else{ 
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
      }else if(state == 'show'){   
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
    }else if(hideShow == 'show'){ 
      visibility('show', question, requireOnShow);   
    } 
  }   
}      

function requireTextareas(){ 
  if(document.querySelector('[name=Complete]')){   
    [...document.querySelectorAll('.requireTextarea')].map(element => { 
      let textarea = undefined; try{   
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
    hideableQuestionSetDrivers();   
    requireTextareas();   
    loadHide();   
    console.log('Hideable elements load event.'); 
  }   
}); 

function checkRequiredCheckboxes(e){
	var requiredDivs = document.querySelectorAll('div[requireCheckbox=\'true\']');
  let firstInvalidTable = null;
  
  [...document.querySelectorAll('div[requireCheckbox=true]')].forEach((element) => {
    [...element.closest('table').querySelectorAll('input')].forEach((input) => {
      input.setCustomValidity('');
    });
  });
  
  [...requiredDivs].forEach((div) => {
    let table = div.closest('table');
    
    const checkboxes = table.querySelectorAll('input[type=\'checkbox\']');
    const oneChecked = Array.from(checkboxes).some(cb => cb.checked);
    
    if(!oneChecked){
      e.preventDefault();

      if(!firstInvalidTable){
        firstInvalidTable = table;
        
        table.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        const firstCheckbox = table.querySelector('input[type=\'checkbox\']');
        if(firstCheckbox){
          firstCheckbox.setCustomValidity('Please select one of these checkboxes');
          firstCheckbox.reportValidity();
          firstCheckbox.focus();

          checkboxes.forEach((cb) => {
            cb.addEventListener('input', function clearGroupValidity() {
              const anyChecked = Array.from(checkboxes).some(c => c.checked);
              if(anyChecked){
                checkboxes.forEach(c => c.setCustomValidity(''));
                
                checkboxes.forEach(c => c.removeEventListener('input', clearGroupValidity));
              }
            });
          });
        }
      }
    }
  });
}
document.querySelector('form').addEventListener('submit', checkRequiredCheckboxes);