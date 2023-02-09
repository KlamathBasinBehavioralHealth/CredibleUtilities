function plusButtonInitialize(){
  let buttons = document.querySelectorAll('.plusButton');
  
  for(let count = 0; count < buttons.length; count++){
    if(buttons[count].closest('table').querySelector('input').style.backgroundColor == 'rgb(255, 255, 255)' || buttons[count].closest('table').querySelector('input').style.backgroundColor == 'white'){
      buttons[count].closest('table').querySelector('input').value = '+';
      try{
        try{
          visibility('hide', `.${buttons[count].getAttribute('targets')}`, false);
        }catch(e){
          console.log(e);
        }
        try{  
          visibility('hide', `#${buttons[count].getAttribute('targets')}`, false);
        }catch(e){
          console.log(e);
        }
        try{
          visibility('hide', `.${buttons[count].getAttribute('optionalTargets')}`, false);
        }catch(e){
          console.log(e);
        }
        try{
          visibility('hide', `#${buttons[count].getAttribute('optionalTargets')}`, false);
        }catch(e){
          console.log(e);
        }
      }catch(error){
        console.log(error);
      }
    }
    else if(buttons[count].closest('table').querySelector('input').style.backgroundColor == 'rgb(204, 204, 204)'){
      buttons[count].closest('table').querySelector('input').value = '-';
      try{
        try{
          visibility('show', `.${buttons[count].getAttribute('targets')}`, true);
        }catch(e){
          console.log(e);
        }
        try{
          visibility('show', `#${buttons[count].getAttribute('targets')}`, true);
        }catch(e){
          console.log(e);
        }
        try{
          visibility('show', `.${buttons[count].getAttribute('optionalTargets')}`, false);
        }catch(e){
          console.log(e);
        }
        try{
          visibility('show', `#${buttons[count].getAttribute('optionalTargets')}`, false);
        }catch(e){
          console.log(e);
        }
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
      try{
        visibility('show', `.${buttonTarget.getAttribute('targets')}`, true);
      }catch(e){
        console.log(e);
      }
      try{
        visibility('show', `#${buttonTarget.getAttribute('targets')}`, true);
      }catch(e){
        console.log(e);
      }
      try{
        visibility('show', `.${buttonTarget.getAttribute('optionalTargets')}`, false);
      }catch(e){
        console.log(e);
      }
      try{
        visibility('show', `#${buttonTarget.getAttribute('optionalTargets')}`, false);
      }catch(e){
        console.log(e);
      }
    }catch(error){
      console.log(error);
    }
  }
  else if(buttonTarget.closest('table').querySelector('input').value == '-'){
    buttonTarget.closest('table').querySelector('input').value = '+';
    try{
      try{
        visibility('hide', `.${buttonTarget.getAttribute('targets')}`, false);
      }catch(e){
        console.log(e);
      }
      try{
        visibility('hide', `#${buttonTarget.getAttribute('targets')}`, false);
      }catch(e){
        console.log(e);
      }
      try{
        visibility('hide', `.${buttonTarget.getAttribute('optionalTargets')}`, false);
      }catch(e){
        console.log(e);
      }
      try{
        visibility('hide', `#${buttonTarget.getAttribute('optionalTargets')}`, false);
      }catch(e){
        console.log(e);
      } 
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