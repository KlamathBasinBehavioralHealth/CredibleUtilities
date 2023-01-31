function plusButtonInitialize(){
  let buttons = document.querySelectorAll('.plusButton');
  
  for(let count = 0; count < buttons.length; count++){
    if(buttons[count].closest('table').querySelector('input').style.backgroundColor == 'rgb(255, 255, 255)' || buttons[count].closest('table').querySelector('input').style.backgroundColor == 'white'){
      buttons[count].closest('table').querySelector('input').value = '+';
      try{
        visibility('hide', `.${buttons[count].getAttribute('targets')}`, false);
        visibility('hide', `#${buttons[count].getAttribute('optionalTargets')}`, false);
      }catch(error){
        console.log(error);
      }
    }
    else if(buttons[count].closest('table').querySelector('input').style.backgroundColor == 'rgb(204, 204, 204)'){
      buttons[count].closest('table').querySelector('input').value = '-';
      try{
        visibility('show', `.${buttons[count].getAttribute('targets')}`, true);
        visibility('show', `#${buttons[count].getAttribute('optionalTargets')}`, false);
      }catch(error){
        console.log(error);
      }
    }
  }
  
  for(let count = 0; count < buttons.length; count++){
    let currentId = `#${buttons[count].getAttribute('id')}`;
    
    document.querySelector(currentId).closest('table').querySelector('input').addEventListener('click', (event) => {
      plusButtonToggle(currentId);
    });
  }
}

function plusButtonToggle(target){
  let buttonTarget = document.querySelector(target);
  if(buttonTarget.closest('table').querySelector('input').value == '+'){
    buttonTarget.closest('table').querySelector('input').value = '-';
    try{
      visibility('show', `.${buttonTarget.getAttribute('targets')}`, true);
      visibility('show', `#${buttonTarget.getAttribute('optionalTargets')}`, false);
      console.log('It\'s a plus!');
    }catch(error){
      console.log(error);
    }
  }
  else if(buttonTarget.closest('table').querySelector('input').value == '-'){
    buttonTarget.closest('table').querySelector('input').value = '+';
    try{
      visibility('hide', `.${buttonTarget.getAttribute('targets')}`, false);
      visibility('hide', `#${buttonTarget.getAttribute('optionalTargets')}`, false);
      console.log('It\'s a minus!');
    }catch(error){
      console.log(error);
    }
  }
}
  
async function startUp(){
  await waitForElementInterval('.pushButton');
  plusButtonInitialize();
}

startUp();