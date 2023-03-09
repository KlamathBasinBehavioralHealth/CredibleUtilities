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
        if(element.tagName == 'INPUT'){
          inputDriverArray.push(element);
        }else if(element.tagName == 'SELECT'){
          selectDriverArray.push(element);
        }
    }); 

    console.log(inputDriverArray);
    console.log(selectDriverArray);

    testArray = inputDriverArray;

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
  console.log(header.closest('tbody').querySelector('.hiddenHeaderButton').closest('tbody').querySelector('input'));
  
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