//New require function
function requireField (target, condition) { 
	$('tr').find(target).next().remove();  
  document.querySelector(target).nextElementSibling.remove();
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
    $(target).closest('table')?.parent().parent().show();
    $(target).closest('table')?.parent().parent().each(function (){
      $(this).nextAll('tr:has(img[height=15]):first').show();
    });
  }
  else if(hideShow == 'hide'){
    $(target).closest('table')?.parent().parent().hide();
    $(target).closest('table')?.parent().parent().each(function (){
      $(this).nextAll('tr:has(img[height=15]):first').hide();
    });
  }
  
  if(require == true){
    requireField(target, true);
  }
  else if (require == false){
    requireField(target, false);
  }
}