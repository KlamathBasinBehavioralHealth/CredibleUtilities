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

let testArray = [];

function hiddenHeadeSetDrivers(){
  [...document.querySelectorAll('.hiddenHeader')].map((header) => {
    let inputDriverArray = [];
    let selectDriverArray = [];
    let conditionArray = [] ;
    let buttonMode = document.querySelector('#labelID').getAttribute('buttonMode');

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

    testArray = selectDriverArray;

    if(buttonMode == true || buttonMode == 'true'){
      inputDriverArray.map((element) => {
        element.addEventListener('change', (event) => {
          let isChecked = false;
          inputDriverArray.forEach(input => {
            if(input.checked){
                isChecked = true;
            }
          });
          if(isChecked){
            hideShowHiddenHeader('show', header);
          }
          else{
            hideShowHiddenHeader('hide', header);
          }
        });

        element.addEventListener('mouseleave', (event) => {
          let isChecked = false;
          inputDriverArray.forEach(input => {
            if(input.checked){
                isChecked = true;
            }
          });
          if(isChecked){
            hideShowHiddenHeader('show', header);
          }
          else{
            hideShowHiddenHeader('hide', header);
          }
        });
      });

      let isChecked = false;
      inputDriverArray.forEach(input => {
        if(input.checked){
            isChecked = true;
        }
      });
      if(isChecked){
        hideShowHiddenHeader('show', header);
      }
      else{
        hideShowHiddenHeader('hide', header);
      }
    }
    else if(buttonMode == false || buttonMode == 'false'){
      inputDriverArray.map((element) => {
        element.addEventListener('change', (event) => {
          let isChecked = false;
          inputDriverArray.forEach(input => {
            if(input.checked){
                isChecked = true;
            }
          });
          if(isChecked){
            hideShowHiddenHeader('hide', header);
          }
          else{
            hideShowHiddenHeader('show', header);
          }
        });

        element.addEventListener('mouseleave', (event) => {
          let isChecked = false;
          inputDriverArray.forEach(input => {
            if(input.checked){
                isChecked = true;
            }
          });
          if(isChecked){
            hideShowHiddenHeader('hide', header);
          }
          else{
            hideShowHiddenHeader('show', header);
          }
        });
      });

      let isChecked = false;
      inputDriverArray.forEach(input => {
        if(input.checked){
            isChecked = true;
        }
      });
      if(isChecked){
        hideShowHiddenHeader('hide', header);
      }
      else{
        hideShowHiddenHeader('show', header);
      }
    }
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

window.addEventListener('load', (event) =>{
  headerButtons();
  hiddenHeadeSetDrivers();
  console.log('Window onload event.');
});