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
            
            /* if(element.tagName == 'INPUT'){
                if(element.checked){
            hideShowHiddenHeader('show', header);
            }
            else if(!element.checked){
                hideShowHiddenHeader('hide', header);

                element.addEventListener('change', (event) => {
                    if(element.checked){
                        hideShowHiddenHeader('show', header);
                    }
                    else if(!element.checked){
                        hideShowHiddenHeader('hide', header);
                    }
                });
                element.addEventListener('mouseleave', (event) => {
                    if(element.checked){
                        hideShowHiddenHeader('show', header);
                    }
                    else if(!element.checked){
                        hideShowHiddenHeader('hide', header);
                    }
                });
            }
            }else if(element.tagName == 'SELECT'){

            }*/ 
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