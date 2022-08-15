//New require function
function requireField (target, condition) { 
	$('tr').find('div[class*=' + target + ']').next().remove(); 
	$('tr').find('div[id=' + target + ']').next().remove();  
	if(condition) { 
		$('tr').has('div[class*=' + target + ']').find('input').prop('required', true); 
		$('tr').has('div[class*=' + target + ']').find('select').prop('required', true); 
		$('tr').find('div[class*=' + target + ']').after('<div class=\'redAsterisk\' style=\'color : red; display : inline\'>*</div>');
		$('tr').has('div[id=' + target + ']').find('input').prop('required', true); 
		$('tr').has('div[id=' + target + ']').find('select').prop('required', true); 
		$('tr').find('div[id=' + target + ']').after('<div class=\'redAsterisk\' style=\'color : red; display : inline\'>*</div>');  
	} 
	else { 
		$('tr').has('div[class*=' + target + ']').find('input').prop('required', false); 
		$('tr').has('div[class*=' + target + ']').find('select').prop('required', false); 
		$('tr').has('div[id=' + target + ']').find('input').prop('required', false); 
		$('tr').has('div[id=' + target + ']').find('select').prop('required', false);
	} 
}

//New hide show function
function visibility(hideShow, target, require = false){
  if(hideShow == 'show'){
    $('.' + target).closest('table')?.parent().parent().show();
    $('.' + target).closest('table')?.parent().parent().each(function (){
      $(this).nextAll('tr:has(img[height=15]):first').show();
    });
    $('#' + target).closest('table')?.parent().parent().show();
    $('#' + target).closest('table')?.parent().parent().each(function (){
      $(this).nextAll('tr:has(img[height=15]):first').show();
    });
    $('div[hide=' + target + ']')?.closest('table').parent().parent().show();
    $('div[hide=' + target + ']')?.closest('table').parent().parent().each(function (){
      $(this).nextAll('tr:has(img[height=15]):first').show();
    });
  }
  else if(hideShow == 'hide'){
    $('.' + target).closest('table')?.parent().parent().hide();
    $('.' + target).closest('table')?.parent().parent().each(function (){
      $(this).nextAll('tr:has(img[height=15]):first').hide();
    });
    $('#' + target).closest('table')?.parent().parent().hide();
    $('#' + target).closest('table')?.parent().parent().each(function (){
      $(this).nextAll('tr:has(img[height=15]):first').hide();
    });
    $('div[hide=' + target + ']')?.closest('table').parent().parent().hide();
    $('div[hide=' + target + ']')?.closest('table').parent().parent().each(function (){
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