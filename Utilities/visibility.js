var shownRequiredCBAnswers = [];
function getShownRequiredCBAnswers(){
	[...document.querySelectorAll('.hideableQuestion')].forEach(question => {
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
			let questionCBAnswers = [...target.closest('tbody').querySelectorAll('input')]
			$('tr').find(target).next().remove();  
			if(condition) { 
				if(target.closest('tbody').querySelector('input').type != 'checkbox') {
					$('tr').has(target).find('input').prop('required', true); 
					$('tr').has(target).find('select').prop('required', true); 
				}
				else if(questionCBAnswers.length > 1){
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

var floatingCompleteButton = document.querySelector('#complete');
var completeButtonName = document.querySelector('[name=Complete]');
var completeButtonValue = document.querySelector('[value=Complete]');
var firstCBUnchecked = null;
function checkRequiredCB(){
    firstCBUnchecked = null;
    completeButtonName = document.querySelector('[name=Complete]');
    completeButtonValue = document.querySelector('[value=Complete]');
    floatingCompleteButton = document.querySelector('#complete');
	if(floatingCompleteButton){
		floatingCompleteButton.addEventListener('mouseover', function() {
			if (this.disabled) {
				firstCBUnchecked.scrollIntoView({
					  behavior: 'smooth', 
					block: 'start',     
				});
				flashElement(firstCBUnchecked);
			} 
		});
	}
	else if (completeButtonName){
		completeButtonName.addEventListener('mouseover', function() {
			if (this.disabled) {
				firstCBUnchecked.scrollIntoView({
					  behavior: 'smooth', 
					block: 'start',     
				});
				flashElement(firstCBUnchecked);
			} 
		});
	}
	else {
		completeButtonValue.addEventListener('mouseover', function() {
			if (this.disabled) {
				firstCBUnchecked.scrollIntoView({
					  behavior: 'smooth', 
					block: 'start',     
				});
				flashElement(firstCBUnchecked);
			} 
		});
	}
	let cbCheckedCount = 0;
	let cbQuestionCheckedCount = 0;
	shownRequiredCBAnswers.forEach(answerArray => {
		cbCheckedCount = 0;
		answerArray.forEach(answer => {	
			if(answer.checked){
				cbCheckedCount = cbCheckedCount + 1;
			}
		});
		if(cbCheckedCount > 0 && shownRequiredCBAnswers.length > 0){
			cbQuestionCheckedCount = cbQuestionCheckedCount + 1;
		} 
		else{
			firstCBUnchecked = answerArray[0].closest('table').previousElementSibling.previousElementSibling.closest('tr').previousElementSibling;
		}
	});
	if(cbQuestionCheckedCount < shownRequiredCBAnswers.length){
		// closestUncheckedRequiredLabel is from the requiredGroupedCheckboxes.js and including it here is to ensure visibility.js and requiredGroupedCheckboxes.js do not overwrite each other
		if(completeButtonName  && closestUncheckedRequiredLabel == null){
			completeButtonName.setAttribute('disabled',true);
		}
		if(completeButtonValue  && closestUncheckedRequiredLabel == null){
			completeButtonValue.setAttribute('disabled',true);
		}
		if(floatingCompleteButton  && closestUncheckedRequiredLabel == null){
			floatingCompleteButton.setAttribute('disabled',true);
		}	
	}
	else{
		// closestUncheckedRequiredLabel is from the requiredGroupedCheckboxes.js and including it here is to ensure visibility.js and requiredGroupedCheckboxes.js do not overwrite each other
		if(completeButtonName && closestUncheckedRequiredLabel == null){
			completeButtonName.removeAttribute('disabled');
		}
		if(completeButtonValue && closestUncheckedRequiredLabel == null){
			completeButtonValue.removeAttribute('disabled');
		}
		if(floatingCompleteButton  && closestUncheckedRequiredLabel == null){
			floatingCompleteButton.removeAttribute('disabled');
		}	
	}
}

function flashElement(element) {
  let flashCount = 0;
  const interval = 250; 
  
  const flashInterval = setInterval(() => {
    if (flashCount % 2 === 0) {
      element.style.backgroundColor = 'yellow'; 
    } else {
      element.style.backgroundColor = ''; 
    }
    
    flashCount++;
    
    if (flashCount >= 12) {
      clearInterval(flashInterval); 
    }
  }, interval);
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

window.onload = () => {
	if(document.querySelector('[name=Complete]')){
		document.querySelectorAll('.defaultHidden').forEach((element) => {
			visibility('hide', element, false);
	  	});
	}
	firstCBUnchecked = null;
}

