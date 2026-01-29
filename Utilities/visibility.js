function requireField (target, condition) {  
  if(document.querySelector('[name=Complete]')){ 
    try{ 
      try{
        [...document.querySelectorAll(target)].forEach((element) => {
          try{
            element.querySelector('.redAsterisk').remove();
          }catch(error){}
        });
      }catch(error){}  
      if(condition) {  
        let selected = document.querySelectorAll(target);
        [...selected].forEach((thing) => {
          if(selected.length == 1){
            try{
              thing.closest('table').querySelector('input').required = true;
            }catch(error){}
            try{
              thing.closest('table').querySelector('select').required = true;
            }catch(error){}
            try{ 
              thing.removeAttribute('requireCheckbox'); 
            }catch(error){} 
          }else if(selected.length > 1){
            try{
              [...thing.closest('table').querySelectorAll('input')].forEach((element) => {
                element.required = false;
              });
            }catch(error){}
            thing.setAttribute('requireCheckbox', true); 
          }

          const redAsterisk = document.createElement('div');
          redAsterisk.className = 'redAsterisk';
          redAsterisk.textContent = '*';
          redAsterisk.style.color = 'red';
          redAsterisk.style.display = 'inline';
          thing.appendChild(redAsterisk);
        }); 
      }else{  
        let selected = document.querySelectorAll(target);
        [...selected].forEach((thing) => {
          try{
            thing.closest('table').querySelector('input').required = false;
          }catch(error){}
          try{
            thing.closest('table').querySelector('select').required = false;
          }catch(error){}
          try{ 
            thing.removeAttribute('requireCheckbox'); 
          }catch(error){}
        });
      } 
    }catch(error){} 
  } 
}
 
function requireNotes (target, condition) {  
  if(document.querySelector('[name=Complete]')){
    let textarea = undefined;
    const redAsterisk = document.createElement('div');
          redAsterisk.className = 'redAsterisk';
          redAsterisk.textContent = '*';
          redAsterisk.style.color = 'red';
          redAsterisk.style.display = 'inline';
   
    try{ 
      textarea = document.querySelector(target).closest('table').closest('tr').nextElementSibling.querySelector('textarea');
      try{
        textarea.closest('tr').querySelector('.redAsterisk').remove(); 
      }catch(error){

      }
      if(condition){
        textarea.required = true;
        textarea.closest('td').appendChild(redAsterisk);
      }else{
        textarea.required = false;
      }
    }catch(error){ 
      
    } 
  } 
}

function visibility(hideShow, target, require = false, requireTextarea = false){ 
  let selector = undefined;
  if(document.querySelector('[name=Complete]')){   
    if(typeof target === 'object'){
      if(target.id){
        selector = document.querySelectorAll(`#${target.id}`);
      }else{
        selector = [target];
      }
    }else if(typeof target === 'string'){
      selector = document.querySelectorAll(target);
    }

    try{   
      if(hideShow == 'show'){    
        [...selector].forEach((element) => {
          element.closest('table').closest('tr').hidden = false;
          if(element.closest('table').closest('tr').nextElementSibling.querySelector('textarea')){
            element.closest('table').closest('tr').nextElementSibling.hidden = false;
            element.closest('table').closest('tr').nextElementSibling.nextElementSibling.hidden = false;
          }else{
            element.closest('table').closest('tr').nextElementSibling.hidden = false;
          }
          element.setAttribute('visibility', 'show');
        });

        if(require){   
          requireField(element, true);   
        }else{    
          requireField(element, false);   
        }   
        if(requireTextarea){   
          requireNotes(element, true);   
        }else{    
          requireNotes(element, false);   
        }   
      }else if(hideShow == 'hide'){     
        [...selector].forEach((element) => {
          element.closest('table').closest('tr').hidden = true;
          if(element.closest('table').closest('tr').nextElementSibling.querySelector('textarea')){
            element.closest('table').closest('tr').nextElementSibling.hidden = true;
            element.closest('table').closest('tr').nextElementSibling.nextElementSibling.hidden = true;
          }else{
            element.closest('table').closest('tr').nextElementSibling.hidden = true;
          }
          element.setAttribute('visibility', 'hide');
        });

        requireField(element, false);
        requireNotes(element, false);
      }   
    }catch(error){   
 
    }    
  } 
}

window.onload = () => { 
  if(document.querySelector('[name=Complete]')){ 
    document.querySelectorAll('.defaultHidden').forEach((element) => { 
      visibility('hide', element, false);   
    }); 
  } 
}