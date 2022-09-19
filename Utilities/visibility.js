//New require function
function requireField (target, condition) { 
	$('tr').find(target).next().remove();  
	if(condition) { 
		$('tr').has(target).find('input').prop('required', true); 
		$('tr').has(target).find('select').prop('required', true); 
		$('tr').find(target).after('<div class=\'redAsterisk\' style=\'color : red; display : inline\'>*</div>');  
	} 
	else { 
		$('tr').has(target).find('input').prop('required', false); 
		$('tr').has(target).find('select').prop('required', false); 
	} 
  
}

//New hide show function
function visibility(hideShow, target, require = false){
  if(hideShow == 'show'){
    $(target).closest('table').closest('tr').each(function (){
      $(this).show();
      if($(this).next().find('textarea').length){
          $(this).next().show();
      }
      else{
          $(this).next().next().show();
      }
    });
  }
  else if(hideShow == 'hide'){
    $(target).closest('table').closest('tr').each(function (){
      $(this).hide();
      if($(this).next().find('textarea').length){
          $(this).next().hide();
      }
      else{
          $(this).next().next().hide();
      }
    }); 
  }
  
  if(require == true){
    requireField(target, true);
  }
  else if (require == false){
    requireField(target, false);
  }
}