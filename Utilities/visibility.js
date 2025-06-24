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