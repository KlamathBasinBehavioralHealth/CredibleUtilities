function requireField (target, condition) {  
  if(document.querySelector('[name=Complete]')){ 
    try{ 
      $('tr').find(target).next().remove();   
      if(condition) {  
        if(target.closest('tbody').querySelector('input').type != 'checkbox') { 
          $('tr').has(target).find('input').prop('required', true);  
          $('tr').has(target).find('select').prop('required', true);  
          try{ 
            target.removeAttribute('requireCheckbox'); 
          }catch(error){ 
            console.log(error); 
          } 
        } else if(target.closest('tbody').querySelector('input').type == 'checkbox'){ 
          $('tr').has(target).find('input').prop('required', false);  
          $('tr').has(target).find('select').prop('required', false); 
          target.setAttribute('requireCheckbox', true); 
        }  

        $('tr').find(target).after('<div class=\'redAsterisk\' style=\'color : red; display : inline\'>*</div>');   
      }else {  
        $('tr').has(target).find('input').prop('required', false);  
        $('tr').has(target).find('select').prop('required', false); 
        try{ 
          target.removeAttribute('requireCheckbox'); 
        }catch(error){ 
          console.log(error); 
        } 
      } 
    }catch(error){ 
      console.log(error); 
    } 
  } 
} 

function requireNotes (target, condition) {  
  let textarea = undefined;
  let redAsterisk = document.createElement('div');   
    redAsterisk.className = 'redAsterisk';   
    redAsterisk.style = 'color:red; display:inline;';   
    redAsterisk.innerText = '*'; 
  if(document.querySelector('[name=Complete]')){ 
    try{ 
      textarea = target.closest('table').closest('tr').nextElementSibling.querySelector('textarea');
      try{
        if(textarea.nextSibling?.className == 'redAsterisk'){
          textarea.nextSibling.remove(); 
        }
      }catch(error){

      }
      if(condition){
        textarea.required = true;
        textarea.after(redAsterisk);
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
            console.log(error);         
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
            console.log(error);         
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
      console.log(error);   
    }    
    try{   
      if(require == true){     
        requireField(target, true);   
      }else if (require == false){     
        requireField(target, false);   
      }   
    }catch(error){ 
      console.log(error);  
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
