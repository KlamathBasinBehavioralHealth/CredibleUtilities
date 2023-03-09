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