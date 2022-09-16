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
    $(target).closest('table')?.closest('tr').show();
    $(target).closest('table')?.closest('tr').nextAll('tr:has(img[src$=\'spacer.gif\']):first').show();
  }
  else if(hideShow == 'hide'){
    $(target).closest('table')?.closest('tr').hide();
    $(target).closest('table')?.closest('tr').nextAll('tr:has(img[src$=\'spacer.gif\']):first').hide();
  }
  
  if(require == true){
    requireField(target, true);
  }
  else if (require == false){
    requireField(target, false);
  }
}