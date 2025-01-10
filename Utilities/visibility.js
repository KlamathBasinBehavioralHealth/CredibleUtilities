var shownRequiredCBAnswers = [];
function getShownRequiredCBAnswers(){
	[...document.querySelectorAll('.hideableQuestion')].forEach(question => {
		shownRequiredCBAnswers = [];
		let questionCBAnswers = [...question.closest('tbody').querySelectorAll('input')];
		try{
			if(question.closest('tbody').querySelector('input').type == 'checkbox' && questionCBAnswers.length > 1 && questionCBAnswers[0].getAttribute('data-cbRequire') == "true"){
				shownRequiredCBAnswers = [...shownRequiredCBAnswers, questionCBAnswers];
			}
		}
		catch(error){
			console.log(error);
		}
	});
	checkRequiredCB();
}



function requireField (target, condition) { 
	if(document.querySelector('[name=Complete]')){
		try{
			$('tr').find(target).next().remove();  
			if(condition) { 
				if(target.closest('tbody').querySelector('input').type != 'checkbox') {
					$('tr').has(target).find('input').prop('required', true); 
					$('tr').has(target).find('select').prop('required', true); 
				}
				else {
					[...target.closest('tbody').querySelectorAll('input')].forEach(cb_answer => {
						cb_answer.setAttribute('data-cbRequire', true);
					});
				}
				$('tr').find(target).after('<div class=\'redAsterisk\' style=\'color : red; display : inline\'>*</div>');  
			} 
			else { 
				$('tr').has(target).find('input').prop('required', false); 
				$('tr').has(target).find('select').prop('required', false); 
				[...target.closest('tbody').querySelectorAll('input')].forEach(cb_answer => {
					cb_answer.setAttribute('data-cbRequire', false);
				});
			}
			getShownRequiredCBAnswers();
		}catch(error){
			console.log(error);
		}
	}
}

//New hide show function
function visibility(hideShow, target, require = false){
	shownRequiredCBAnswers = [];
	if(document.querySelector('[name=Complete]')){
	  try{
		  if(hideShow == 'show'){
		    $(target).closest('table').closest('tr').each(function (){
		      $(this).show();
		      let id;
		      try{
		        id = $(this).find('*[id*=q_]').attr('id').slice(2);
		        //console.log(`Found id: ${id}.`);
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
		        }
		        else{
		            $(this).next().show();
		        }
		      }
		    });
		  }
		  else if(hideShow == 'hide'){
		    $(target).closest('table').closest('tr').each(function (){
		      $(this).hide();
		      let id;
		      try{
		        id = $(this).find('*[id*=q_]').attr('id').slice(2);
		        //console.log(`Found id: ${id}.`);
		        if($('.div' + id)?.length){
		          $('.div' + id).closest('tr').hide();
		        }
		        if($(this).next().find('textarea').length){
		            $(this).next().next().hide();
		        }
		        else{
		            $(this).next().hide();
		        }
		      }
		      catch(error){
		        console.log(error);
		        if($(this).next().find('textarea').length){
		            $(this).next().next().hide();
		        }
		        else{
		            $(this).next().hide();
		        }
		      }
		    }); 
		  }
	  }catch(error){
		  console.log(error);
	  }
	
	  try{
		  if(require == true){
		    requireField(target, true);
		  }
		  else if (require == false){
		    requireField(target, false);
		  }
	  }catch(error){
		console.log(error);
	  }
	}
}

document.addEventListener('DOMContentLoaded', () => {
  if(document.querySelector('[name=Complete]')){
	  document.querySelectorAll('.defaultHidden').forEach((element) => {
	    visibility('hide', element, false);
	  });
  }
});
