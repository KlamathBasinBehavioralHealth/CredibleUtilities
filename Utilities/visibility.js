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

          const redAsterisk = document.createElement("div");
          redAsterisk.className = "redAsterisk";
          redAsterisk.textContent = "*";
          redAsterisk.style.color = "red";
          redAsterisk.style.display = "inline";
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
    const redAsterisk = document.createElement("div");
          redAsterisk.className = "redAsterisk";
          redAsterisk.textContent = "*";
          redAsterisk.style.color = "red";
          redAsterisk.style.display = "inline";
   
    try{ 
      textarea = document.querySelector(target).closest('table').closest('tr').nextElementSibling.querySelector('textarea');
      try{
        textarea.nextSibling.querySelector('.redAsterisk').remove(); 
      }catch(error){

      }
      if(condition){
        textarea.required = true;
        textarea.appendChild(redAsterisk);
      }else{
        textarea.required = false;
      }
    }catch(error){ 
      
    } 
  } 
}

function visibility(hideShow, target, require = false){ 
  if(document.querySelector('[name=Complete]')){   
    try{   
      if(hideShow == 'show'){     
        $(target).closest('table').closest('tr').each(function (){      
          $(this).show();       
          let id;      
          try{         
            id = $(this).find('*[id*=q_]').attr('id').slice(2);                  
            if($('.div' + id)?.length){           
              $('.div' + id).closest('tr').show();         
            }         
            if($(this).next().find('textarea').length){             
              $(this).next().next().show();         
            }         
            else{             
              $(this).next().show();         
            }       
          }       
          catch(error){                
            if($(this).next().find('textarea').length){             
              $(this).next().next().show();         
            }else{            
              $(this).next().show();         
            }       
          }  
        });
        target.setAttribute('visibility', 'show');
      }else if(hideShow == 'hide'){     
        $(target).closest('table').closest('tr').each(function (){       
          $(this).hide();       
          let id;       
          try{         
            id = $(this).find('*[id*=q_]').attr('id').slice(2);         
            if($('.div' + id)?.length){           
              $('.div' + id).closest('tr').hide();         
            }         
            if($(this).next().find('textarea').length){            
              $(this).next().next().hide();         
            }else{             
              $(this).next().hide();         
            }       
          }catch(error){                  
            if($(this).next().find('textarea').length){             
              $(this).next().next().hide();         
            }else{             
              $(this).next().hide();         
            }       
          }     
        });
        target.setAttribute('visibility', 'hide');
      }   
    }catch(error){   
 
    }    
    try{   
      if(require == true){     
        requireField(target, true);   
      }else if (require == false){     
        requireField(target, false);   
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