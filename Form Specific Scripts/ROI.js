if(typeof visibility != 'function'){
	if (typeof include === "undefined") {
		window.include = function (file){
		var script = document.createElement('script');
		script.src = file;
		script.type = 'text/javascript';
		script.defer = true;
			
		document.getElementsByTagName('head').item(0).appendChild(script);
		}
	}
  
	include('https://cdn.jsdelivr.net/gh/KlamathBasinBehavioralHealth/CredibleUtilities@21229c2/Utilities/visibility.js');
}

//Tooltips
$('document').ready(function(){ 
    $('input, select, tr, td, div').tooltip({ 
        content: function(){ 
            return this.getAttribute('title'); 
        }, 
    });  
});

//Initialize display states and add event handlers for dropMatchId and dropdownShowHide
$(document).ready(function(){
	$('tr').has('div[class*=passenger]').find('select').attr('style', '-webkit-appearance: none; text-indent: 1px; pointer-events: none;');
	$('tr').has('div[class*=payerDriverText]').find('input').attr('style', '-webkit-appearance: none; text-indent: 1px; pointer-events: none;');
	$('tr').has('div[class*=providerDriverText]').find('input').attr('style', '-webkit-appearance: none; text-indent: 1px; pointer-events: none;');
	$('tr').has('div[class*=payerPassengerText]').find('input').attr('style', '-webkit-appearance: none; text-indent: 1px; pointer-events: none;');
	$('tr').has('div[class*=providerPassengerText]').find('input').attr('style', '-webkit-appearance: none; text-indent: 1px; pointer-events: none;');
		
	/* $('td').has('div[class*=passenger]').css('display', 'none');
	$('tr').has('div[class*=passenger]').next().find('td').css('display', 'none'); */
	visibility('hide', '.passenger');
	
	/* $('td').has('div[class*=hideMe]').css('display', 'none');
	$('tr').has('div[class*=hideMe]').next().find('td').css('display', 'none'); */
	visibility('hide', '.hideMe');
	/* $('td').has('div[class*=payerDriver]').css('display', 'none');
	$('tr').has('div[class*=payerDriver]').next().find('td').css('display', 'none'); */
	visibility('hide', '.payerDriver');
	/* $('td').has('div[class*=providerDriver]').css('display', 'none');
	$('tr').has('div[class*=providerDriver]').next().find('td').css('display', 'none'); */
	visibility('hide', '.providerDriver');

	$('tr').has('div[class*=driver]').find('select').change(() => {
		try{
			dropMatchId();
		}catch(error){
			console.log(error);
		}
	});
	$('tr').has('div[class*=driver]').find('select').change(() => {
		try{
			dropdownShowHide();
		}catch(error){
			console.log(error);
		}
	});
	$('tr').has('div[class*=hideDriver]').find('select').change(() => {
		try{
			dropdownShowHide();
		}catch(error){
			console.log(error);
		}
	});
	
	try{
		dropMatchId();
	}catch(error){
		console.log(error);
	}
	try{
		dropdownShowHide();
	}catch(error){
		console.log(error);
	}
	
	$('hr[class=line]').css('width', '100em');
	
	$('input[name=Complete]').prop('disabled', false);
	/* $('input[name=Complete]').click(() => {
		try{
			dropdownShowHide();
		}catch(error){
			console.log(error);
		}
	}); */
});

//Functions for Matching dropdown IDs and Running Show Hide

function dropMatchId ()
{	
	if($('tr').has('div[class*=payerDriver]').find('select').val())
	{
		$('tr').has('div[class*=payerPassenger]').find('select').val($('tr').has('div[class*=payerDriver]').find('select').val());
		
		$('tr').has('div[class*=payerDriverText]').find('input').val($('tr').has('div[class*=payerDriver]').find('option[value=' + $('tr').has('div[class*=payerDriver]').find('select').val() + ']').text());
		for(let count = 0; count < $('tr').has('div[class*=payerPassenger]').find('select').length; count++)
		{
			$('tr').has('div[class*=payerPassengerText]').find('input')[count].value = $('tr').has('div[class*=payerPassenger]').find('option[value=' + $('tr').has('div[class*=payerPassenger]').find('select')[count].value + ']')[count].text;
		}
		
		requireHidden(false, 'payerDriver');
	}
	
	if($('tr').has('div[class*=providerDriver]').find('select').val())
	{
		$('tr').has('div[class*=providerPassenger]').find('select').val($('tr').has('div[class*=providerDriver]').find('select').val());
		
		$('tr').has('div[class*=providerDriverText]').find('input').val($('tr').has('div[class*=providerDriver]').find('option[value=' + $('tr').has('div[class*=providerDriver]').find('select').val() + ']').text());
		for(let count = 0; count < $('tr').has('div[class*=providerPassenger]').find('select').length; count++)
		{
			$('tr').has('div[class*=providerPassengerText]').find('input')[count].value = $('tr').has('div[class*=providerPassenger]').find('option[value=' + $('tr').has('div[class*=providerPassenger]').find('select')[count].value + ']')[count].text;
		}
		
		requireHidden(false, 'providerDriver');
	}

	clearDropdowns();
}

function dropdownShowHide ()
{
	
	/* $('td').has('div[class*=payerDriver]').css('display', 'none');
	$('tr').has('div[class*=payerDriver]').next().find('td').css('display', 'none'); */
	visibility('hide', '.payerDriver');
	visibility('hide', '.payerDriverText');
	/* $('td').has('div[class*=payerPassenger]').css('display', 'none');
	$('tr').has('div[class*=payerPassenger]').next().find('td').css('display', 'none'); */
	visibility('hide', '.payerPassenger');
	/* $('td').has('div[class*=providerDriver]').css('display', 'none');
	$('tr').has('div[class*=providerDriver]').next().find('td').css('display', 'none'); */
	visibility('hide', '.providerDriver');
	visibility('hide', '.providerDriverText');
	/* $('td').has('div[class*=providerPassenger]').css('display', 'none');
	$('tr').has('div[class*=providerPassenger]').next().find('td').css('display', 'none'); */
	visibility('hide', '.providerPassenger');
	/* $('td').has('div[class*=payerPassengerText]').css('display', 'none');
	$('tr').has('div[class*=payerPassengerText]').next().find('td').css('display', 'none'); */
	visibility('hide', '.payerPassengerText');
	/* $('td').has('div[class*=providerPassengerText]').css('display', 'none');
	$('tr').has('div[class*=providerPassengerText]').next().find('td').css('display', 'none'); */
	visibility('hide', '.providerPassengerText');
	/* $('td').has('div[class*=hideMe]').css('display', 'none');
	$('tr').has('div[class*=hideMe]').next().find('td').css('display', 'none'); */
	visibility('hide', '.hideMe');
		
	if($('tr').has('div[class*=hideDriver]').find('select').attr('value') == $('option:contains(\'Other\')').attr('value'))
	{
		/* $('td').has('div[class*=hideMe]').css('display', 'inline-block');
		$('tr').has('div[class*=hideMe]').next().find('td').css('display', 'inline'); */
		visibility('show', '.hideMe');
	}
	else if ($('tr').has('div[class*=hideDriver]').find('select').attr('value') == $('option:contains(\'Payer\')').attr('value'))
	{
		visibility('show', '#payerName');
		/* $('td').has('div[class*=payerDriver]').css('display', 'inline-block');
		$('tr').has('div[class*=payerDriver]').next().find('td').css('display', 'inline'); */
		visibility('show', '.payerDriver');
		/* $('td').has('div[class*=payerPassenger]').css('display', 'inline-block');
		$('tr').has('div[class*=payerPassenger]').next().find('td').css('display', 'inline');	 */
		visibility('show', '.payerPassenger');
	}
	else if ($('tr').has('div[class*=hideDriver]').find('select').attr('value') == $('option:contains(\'Provider\')').attr('value'))
	{
		visibility('show', '#providerName');
		/* $('td').has('div[class*=providerDriver]').css('display', 'inline-block');
		$('tr').has('div[class*=providerDriver]').next().find('td').css('display', 'inline'); */
		visibility('show', '.providerDriver');
		/* $('td').has('div[class*=providerPassenger]').css('display', 'inline-block');
		$('tr').has('div[class*=providerPassenger]').next().find('td').css('display', 'inline'); */
		visibility('show', '.providerPassenger');
	}
	
	if($('tr').has('div[class*=payerDriverText]').find('input').val())
	{
		/* $('td').has('div[class*=payerPassengerText]').css('display', 'inline-block');
		$('tr').has('div[class*=payerPassengerText]').next().find('td').css('display', 'inline'); */
		visibility('show', '.payerPassengerText');
	}
	else if($('tr').has('div[class*=providerDriverText]').find('input').val())
	{
		/* $('td').has('div[class*=providerPassengerText]').css('display', 'inline-block');
		$('tr').has('div[class*=providerPassengerText]').next().find('td').css('display', 'inline'); */
		visibility('show', '.providerPassengerText');
	}
	
	if($('tr').has('div[class*=payerEmail]').find('input').val())
	{
		/* $('td').has('div[class*=payerEmail]').css('display', 'inline-block');
		$('tr').has('div[class*=payerEmail]').next().find('td').css('display', 'inline'); */
		visibility('show', '.payerEmail');
	}
	else if($('tr').has('div[class*=providerSpecificIndividual]').find('input').val())
	{
		/* $('td').has('div[class*=providerSpecificIndividual]').css('display', 'inline-block');
		$('tr').has('div[class*=providerSpecificIndividual]').next().find('td').css('display', 'inline'); */
		visibility('show', '.providerSpecificIndividual');
	}
	/* $('td').has('div[class*=goAway]').css('display', 'none');
	$('tr').has('div[class*=goAway]').next().find('td').css('display', 'none'); */
	visibility('hide', '.goAway');
}

//Clearing dropdowns on form submit
function clearDropdowns ()
{	
	if($('tr').has('div[class*=payerDriverText]').find('input').val())
	{
		$('tr').has('div[class*=payerDriver]').find('select').val('');
		$('tr').has('div[class*=payerPassenger]').find('select').val('');
	}
	
	if($('tr').has('div[class*=providerDriverText]').find('input').val())
	{
		$('tr').has('div[class*=providerDriver]').find('select').val('');
		$('tr').has('div[class*=providerPassenger]').find('select').val('');
	}	
	
	if($('tr').has('div[class*=hideDriver]').find('select').attr('value') == $('option:contains(\'Other\')').attr('value'))
	{
		$('tr').has('div[class*=payerDriver]').find('select').val('');
		$('tr').has('div[class*=payerPassenger]').find('select').val('');
		$('tr').has('div[class*=providerDriver]').find('select').val('');
		$('tr').has('div[class*=providerPassenger]').find('select').val('');
	}
	else if ($('tr').has('div[class*=hideDriver]').find('select').attr('value') == $('option:contains(\'Payer\')').attr('value'))
	{
		$('tr').has('div[class*=providerDriver]').find('select').val('');
		$('tr').has('div[class*=providerPassenger]').find('select').val('');
	}
	else if ($('tr').has('div[class*=hideDriver]').find('select').attr('value') == $('option:contains(\'Provider\')').attr('value'))
	{
		$('tr').has('div[class*=payerDriver]').find('select').val('');
		$('tr').has('div[class*=payerPassenger]').find('select').val('');
	}
}

//Functions to drive mandatory hidden questions
function requireHidden (condition, target) { 
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

function requireHiddenNotes (condition, target) { 
	$('tr').find('div[class*=' + target + ']').next().remove(); 
	$('tr').find('div[id=' + target + ']').next().remove();  
	if(condition) { 
		$('tr').has('div[class*=' + target + ']').next().find('textarea').prop('required', true); 
		$('tr').find('div[class*=' + target + ']').after('<div class=\'redAsterisk\' style=\'color : red; display : inline\'>*</div>');
		$('tr').has('div[id=' + target + ']').next().find('textarea').prop('required', true); 
		$('tr').find('div[id=' + target + ']').after('<div class=\'redAsterisk\' style=\'color : red; display : inline\'>*</div>');
	} 
	else { 
		$('tr').has('div[class*=' + target + ']').next().find('textarea').prop('required', false); 
		$('tr').has('div[id=' + target + ']').next().find('textarea').prop('required', false);   
	} 
}  

//Event handlers for mandatory hidden questions
$(document).ready(function(){
	$('tr').has('div[class*=requiredDriver]').find('select').change(function(event)
	{
		requireHidden(false, 'requiredPassenger');
		requireHidden(false, 'payerDriver');
		requireHidden(false, 'providerDriver');
		
		if ($('tr').has('div[class*=requiredDriver]').find('select').attr('value') == $('tr').has('div[class*=requiredDriver]').find('option:contains(\'Other\')').attr('value'))
		{
			requireHidden(true, 'requiredPassenger');
			requireHidden(false, 'payerDriver');
			requireHidden(false, 'providerDriver');
		}
		else if ($('tr').has('div[class*=requiredDriver]').find('select').attr('value') == $('tr').has('div[class*=requiredDriver]').find('option:contains(\'Payer\')').attr('value'))
		{
			requireHidden(false, 'requiredPassenger');
			requireHidden(true, 'payerDriver');
			requireHidden(false, 'providerDriver');
		}
		else if ($('tr').has('div[class*=requiredDriver]').find('select').attr('value') == $('tr').has('div[class*=requiredDriver]').find('option:contains(\'Provider\')').attr('value'))
		{
			requireHidden(false, 'requiredPassenger');
			requireHidden(false, 'payerDriver');
			requireHidden(true, 'providerDriver');
		}
	});
	$('tr').has('div[class*=guardianRequiredDriver]').find('input').change(function(event)
	{
		requireHidden( $('tr').has('div[class*=guardianRequiredDriver]').find('input')[0].checked
, 			'guardianRequired');
	});
	$('tr').has('div[id=hivAids]').find('input').change(function(event)
	{
		requireHidden( ($('tr').has('div[id=hivAids]').find('input').prop('checked') == true), 'requiredDates');
	});
	$('tr').has('div[class*=verifiedRequiredDriver]').find('select').change(function(event)
	{
		requireHidden( $('tr').has('div[class*=verifiedRequiredDriver]').find('select').attr('value') != $('tr').has('div[class*=verifiedRequiredDriver]').find('option:contains(\'Parent\')').attr('value')
, 			'verifiedRequired');
	});

	checkRestrictions();

	$('tr').has('div[class*=restrictionRequiredDriver]').find('input').change(function(event){
		checkRestrictions();
	});
	
	$('tr').has('div[class*=revocationRequiredDriver]').find('input').change(function()
	{
		requireHidden($('tr').has('div[class*=revocationRequiredDriver]').find('input').prop('checked'), 'voidType');
	});
	$('tr').has('div[class*=voidType]').find('select').change(function(event)
	{
		requireHidden( ($('tr').has('div[class*=voidType]').find('select').val() == $('tr').has('div[class*=voidType]').find('option:contains(\'Revoked\')').val()), 'revocationDetails');
	});

	//On form load show dropdowns based on Recipient/Sender type
	setTimeout(function(){
		dropdownShowHide();
	}, 1000); 
});

function checkRestrictions(){
	requireHidden(false, 'readingRestrictionRequired');
	requireHidden(false, 'writingRestrictionRequired');
	requireHidden(false, 'languageRestrictionRequired');
		
	if ($('tr').has('div[class*=restrictionRequiredDriver]').find('input')[1].checked){
		requireHidden(true, 'readingRestrictionRequired');
	}
	if ($('tr').has('div[class*=restrictionRequiredDriver]').find('input')[2].checked){
		requireHidden(true, 'writingRestrictionRequired');
	}
	if ($('tr').has('div[class*=restrictionRequiredDriver]').find('input')[3].checked){
		requireHidden(true, 'languageRestrictionRequired');
	}
}

//Event handlers for mandatory hidden note fields
$(document).ready(function(){
	$('tr').has('div[id=informationRecordsOther]').find('input').change(function(event)
	{
		requireHiddenNotes($('tr').has('div[id=informationRecordsOther]').find('input').prop('checked'), 'informationRecordsOther');
	});
	$('tr').has('div[class*=phiRequiredNotes]').find('input').change(function(event)
	{
		requireHiddenNotes($('tr').has('div[class*=phiRequiredNotes]').find('tr:contains(\'Other\')').eq(1).find('input').prop('checked'), 'phiRequiredNotes');
	});
	$('tr').has('div[class*=relationshipRequiredNotes]').find('select').change(function(event)
	{
		requireHiddenNotes($('tr').has('div[class*=relationshipRequiredNotes]').find('select').attr('value') == $('tr').has('div[class*=relationshipRequiredNotes]').find('option:contains(\'Other\')').attr('value'), 'relationshipRequiredNotes');
	});
	$('tr').has('div[class*=revocationNotes]').find('input').change(function(event)
	{
		requireHiddenNotes($('tr').has('div[class*=revocationNotes]').find('input').prop('checked'), 'revocationNotes');
	});
	$('tr').has('div[id=language]').find('select').change(function(event)
	{
		console.log('Entered Language Dropdown');
		if($('tr').has('div[id=language]').find('option:contains(\'Other\')').prop('selected') == true)
		{
			requireHiddenNotes(true, 'language');
		}
		else
		{
			requireHiddenNotes(false, 'language');
		}
	});
});
//Drives hidden ROI REVOKED title and Revocation section also contains code to drive
$(document).ready(function(){
	$('tr').has('div[class*=nlcbBr]').find('input[type=checkbox]').before('<br>');
	$('tr').find('div[class*=nlcbBr]').css('display', 'inline');

	checkVoid();
	setTimeout(function(){
		checkVoid();
	}, 1000);
	$('tr').has('div[class=revocationRequiredDriver]').find('input').change(checkVoid);
});

function checkVoid(){
	/* $('td').has('div[id=reason]').css('display', 'none');
	$('tr').has('div[id=reason]').next().find('td').css('display', 'none'); */
	visibility('hide', '#reason');
	if($('tr').has('div[class=revocationRequiredDriver]').find('input').prop('checked')){
		/* $('td').has('div[id=reason]').css('display', 'inline');
		$('tr').has('div[id=reason]').next().find('td').css('display', 'inline'); */
		visibility('show', '#reason');
	}
}

function checkHidden () 
{     
	if (($('tr').has('div[class*=voidType]').find('option[value=\'' + $('tr').has('div[class*=voidType]').find('select').val() + '\']').text()) == 'Expired')    
	{         
		$('tr').has('div[class=expiredROI]').find('input').attr('checked', true);
		$('tr').has('div[class=invalidROI]').find('input').attr('checked', false);
		$('tr').has('div[class=revokedROI]').find('input').attr('checked', false);
		requireHiddenNotes(false, 'voidType');
		/* $('td').has('div[class*=revocationDetails]').css('display', 'none');
		$('tr').has('div[class*=revocationDetails]').next().find('td').css('display', 'none'); */
		visibility('hide', '.revocationDetails');	
	}
	else if (($('tr').has('div[class*=voidType]').find('option[value=\'' + $('tr').has('div[class*=voidType]').find('select').val() + '\']').text()) == 'Invalid')     
	{                  
		$('tr').has('div[class=expiredROI]').find('input').attr('checked', false);
		$('tr').has('div[class=invalidROI]').find('input').attr('checked', true);	
		$('tr').has('div[class=revokedROI]').find('input').attr('checked', false);
		requireHiddenNotes(true, 'voidType');
		/* $('td').has('div[class*=revocationDetails]').css('display', 'none');
		$('tr').has('div[class*=revocationDetails]').next().find('td').css('display', 'none'); */
		visibility('hide', '.revocationDetails');	
	}
	else if (($('tr').has('div[class*=voidType]').find('option[value=\'' + $('tr').has('div[class*=voidType]').find('select').val() + '\']').text()) == 'Revoked')     
	{                  
		$('tr').has('div[class=expiredROI]').find('input').attr('checked', false);
		$('tr').has('div[class=invalidROI]').find('input').attr('checked', false);
		$('tr').has('div[class=revokedROI]').find('input').attr('checked', true);		
		requireHiddenNotes(false, 'voidType');
		/* $('td').has('div[class*=revocationDetails]').css('display', 'inline');
		$('tr').has('div[class*=revocationDetails]').next().find('td').css('display', 'inline-block'); */
		visibility('show', '.revocationDetails');
	}	
	else
	{
		$('tr').has('div[class=expiredROI]').find('input').attr('checked', false);
		$('tr').has('div[class=invalidROI]').find('input').attr('checked', false);
		$('tr').has('div[class=revokedROI]').find('input').attr('checked', false);   
		requireHiddenNotes(false, 'voidType');
		/* $('td').has('div[class*=revocationDetails]').css('display', 'none');
		$('tr').has('div[class*=revocationDetails]').next().find('td').css('display', 'none'); */
		visibility('hide', '.revocationDetails');
	}
}

$(document).ready(function() 
{         
	checkHidden();
	setTimeout(function(){
		checkHidden();
	}, 1000);
	$('tr').has('div[class=expiredROI]').find('input').css('display', 'inline');
	$('tr').has('div[class=invalidROI]').find('input').css('display', 'inline');
	$('tr').has('div[class=revokedROI]').find('input').css('display', 'inline');
	$('tr').has('div[class*=voidType]').find('select').change(checkHidden);
});

//Tasks to perform during form submit
var checked = false;
$(document).ready(function() 
{     
	$('input[type=submit]').click(function(e)
	{
		if($('tr').has('div[class*=voidType]').find('select').val() != $('tr').has('div[class*=voidType]').find('option:contains(\'Revoked\')').val())
		{
			$('tr').has('div:contains(\'Date of Revocation\')').find('input').val('');
		}
		
		if($('tr').has('div[id=hivAids]').find('input').prop('checked') == false)
		{
			$('tr').has('div[class=requiredDates]').find('input').val('');
		}
		
		$('tr').has('div[class*=informationRecords]').find('input').each(function(){
			checked = false;
			if($(this).prop('checked'))
			{
				checked = true;
				return false;
			}
		});
		
		if(checked == false)
		{
			e.preventDefault();
			alert('Please select at least one item in Information/Record(s).');
		}
	});
});

//Edit Embedded Signature Titles
$(window).bind('load', function (){
	$('#add_signature_1').find('h3').text('Client Signature');
	$('#add_signature_2').find('h3').text('Legal Guardian Signature');
	$('#add_signature_3').find('h3').text('Revocation Signature');
});    

//Clear text boxes based on dropdown
var clearCounter;

function clearPayerPassengerText ()
{
	/* $('td').has('div[class*=payerBegone]').css('display', 'none');
	$('tr').has('div[class*=payerBegone]').next().find('td').css('display', 'none'); */
	visibility('hide', '.payerBegone');
	/* $('td').has('div[class*=payerPassengerText]').css('display', 'none');
	$('tr').has('div[class*=payerPassengerText]').next().find('td').css('display', 'none'); */
	visibility('hide', '.payerPassengerText');
	$('tr').has('div[class*=payerDriverText]').find('input').val('');
	for(clearCounter = 0; clearCounter < $('tr').has('div[class*=payerPassengerText]').find('input').length; clearCounter++)
	{
		$('tr').has('div[class*=payerPassengerText]').find('input')[clearCounter].value = '';
	}
	$('tr').has('div[class*=payerEmail]').find('input').val('');
}

function clearProviderPassengerText ()
{
	/* $('td').has('div[class*=providerBegone]').css('display', 'none');
	$('tr').has('div[class*=providerBegone]').next().find('td').css('display', 'none'); */
	visibility('hide', '.providerBegone');
	/* $('td').has('div[class*=providerPassengerText]').css('display', 'none');
	$('tr').has('div[class*=providerPassengerText]').next().find('td').css('display', 'none'); */
	visibility('hide', '.providerPassengerText');
	$('tr').has('div[class*=providerDriverText]').find('input').val('');
	$('tr').has('div[class*=providerSpecificIndividual]').find('input').val('');
	for(clearCounter = 0; clearCounter < $('tr').has('div[class*=providerPassengerText]').find('input').length; clearCounter++)
	{
		$('tr').has('div[class*=providerPassengerText]').find('input')[clearCounter].value = '';
	}
}

function clearOtherText ()
{
	for(clearCounter = 0; clearCounter < $('tr').has('div[class*=hideMe]').find('input').length; clearCounter++)
	{
		$('tr').has('div[class*=hideMe]').find('input')[clearCounter].value = '';
	}
	for(clearCounter = 0; clearCounter < $('tr').has('div[class*=hideMe]').find('select').length; clearCounter++)
	{
		$('tr').has('div[class*=hideMe]').find('select')[clearCounter].value = '';
	}
}

function clearText ()
{
	if ($('tr').has('div[class*=requiredDriver]').find('select').val() == $('tr').has('div[class*=requiredDriver]').find('option:contains(\'Payer\')').val())
	{
		clearProviderPassengerText();
		clearOtherText();
	}
	else if ($('tr').has('div[class*=requiredDriver]').find('select').val() == $('tr').has('div[class*=requiredDriver]').find('option:contains(\'Provider\')').val())
	{
		clearPayerPassengerText();
		clearOtherText();
	}
	else if ($('tr').has('div[class*=requiredDriver]').find('select').val() == $('tr').has('div[class*=requiredDriver]').find('option:contains(\'Other\')').val())
	{
		clearPayerPassengerText();
		clearProviderPassengerText();
	}
	else
	{
		clearPayerPassengerText();
		clearProviderPassengerText();
		clearOtherText();
	}
}

$(document).ready(function() 
{
	$('tr').has('div[class*=requiredDriver]').find('select').change(clearText);
});

//Restrictions checkbox logic
$(document).ready(function() 
{
	//$('td').has('div[class*=readingRestriction]').hide();
	visibility('hide', '.readingRestriction');
	visibility('hide', '.readingRestrictionRequired');
	//$('td').has('div[class*=writingRestriction]').hide();
	visibility('hide', '.writingRestriction');
	visibility('hide', '.writingRestrictionRequired');
	//$('td').has('div[class*=languageRestriction]').hide();
	visibility('hide', '.languageRestriction');
	visibility('hide', '.languageRestrictionRequired');
	
	if($('tr').has('div[class*=restrictionRequiredDriver]').find('input').eq(1).prop('checked'))
	{
		//$('td').has('div[class*=readingRestriction]').show();
		visibility('show', '.readingRestriction');
		visibility('show', '.readingRestrictionRequired');
	}
	
	if($('tr').has('div[class*=restrictionRequiredDriver]').find('input').eq(2).prop('checked'))
	{
		//$('td').has('div[class*=writingRestriction]').show();
		visibility('show', '.writingRestriction');
		visibility('show', '.writingRestrictionRequired');
	}
	
	if($('tr').has('div[class*=restrictionRequiredDriver]').find('input').eq(3).prop('checked'))
	{
		//$('td').has('div[class*=languageRestriction]').show();
		visibility('show', '.languageRestriction');
		visibility('show', '.languageRestrictionRequired');
	}
			
	$('tr').has('div[class*=restrictionRequiredDriver]').find('input').eq(0).change(function(){
		if($('tr').has('div[class*=restrictionRequiredDriver]').find('input').eq(0).prop('checked'))
		{
			$('tr').has('div[class*=restrictionRequiredDriver]').find('input').eq(1).prop('checked', false);
			$('tr').has('div[class*=restrictionRequiredDriver]').find('input').eq(2).prop('checked', false);
			$('tr').has('div[class*=restrictionRequiredDriver]').find('input').eq(3).prop('checked', false);
			//$('td').has('div[class*=readingRestriction]').hide();
			visibility('hide', '.readingRestriction');
			visibility('hide', '.readingRestrictionRequired');
			//$('td').has('div[class*=writingRestriction]').hide();
			visibility('hide', '.writingRestriction');
			visibility('hide', '.writingRestrictionRequired');
			//$('td').has('div[class*=languageRestriction]').hide();
			visibility('hide', '.languageRestriction');
			visibility('hide', '.languageRestrictionRequired');
		}
	});
	$('tr').has('div[class*=restrictionRequiredDriver]').find('input').eq(1).change(function(){
		if($('tr').has('div[class*=restrictionRequiredDriver]').find('input').eq(1).prop('checked'))
		{
			$('tr').has('div[class*=restrictionRequiredDriver]').find('input').eq(0).prop('checked', false);
			//$('td').has('div[class*=readingRestriction]').show();
			visibility('show', '.readingRestriction');
			visibility('show', '.readingRestrictionRequired');
		}
		else
		{
			//$('td').has('div[class*=readingRestriction]').hide();
			visibility('hide', '.readingRestriction');
			visibility('hide', '.readingRestrictionRequired');
		}
	});
	$('tr').has('div[class*=restrictionRequiredDriver]').find('input').eq(2).change(function(){
		if($('tr').has('div[class*=restrictionRequiredDriver]').find('input').eq(2).prop('checked'))
		{
			$('tr').has('div[class*=restrictionRequiredDriver]').find('input').eq(0).prop('checked', false);
			//$('td').has('div[class*=writingRestriction]').show();
			visibility('show', '.writingRestriction');
			visibility('show', '.writingRestrictionRequired');
		}
		else
		{
			//$('td').has('div[class*=writingRestriction]').hide();
			visibility('hide', '.writingRestriction');
			visibility('hide', '.writingRestrictionRequired');
		}
	});
	$('tr').has('div[class*=restrictionRequiredDriver]').find('input').eq(3).change(function(){
		if($('tr').has('div[class*=restrictionRequiredDriver]').find('input').eq(3).prop('checked'))
		{
			$('tr').has('div[class*=restrictionRequiredDriver]').find('input').eq(0).prop('checked', false);
			//$('td').has('div[class*=languageRestriction]').show();
			visibility('show', '.languageRestriction');
			visibility('show', '.languageRestrictionRequired');
		}
		else
		{
			//$('td').has('div[class*=languageRestriction]').hide();
			visibility('hide', '.languageRestriction');
			visibility('hide', '.languageRestrictionRequired');
		}
	});
});

//Default dates section
var date;

$(document).ready(function() 
{
	$('tr').has('div[class*=voidType]').find('select').change(function(){
		if($('tr').has('div[class*=voidType]').find('option').eq(2).prop('selected'))
		{
			if($('tr').has('div[id=revocationDate]').find('input').val() == '')
			{
				date = new Date();
				$('tr').has('div[id=revocationDate]').find('input').val((date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear());
			}
		}
		else
		{
			$('tr').has('div[id=revocationDate]').find('input').val('');
		}
	});
});

//Require signatures
var initialized = false;

function signatureDisclaimers()
{
	if (initialized == false)
	{
		$('img[id=add_signature_1_img]').click(function()
		{
			alert('Make sure to enter the client\'s full name in the text box. If capturing verbal consent, also include verbal consent in the text box.');
		});
			
		$('img[id=add_signature_2_img]').click(function()
		{
			alert('Make sure to enter the legal guardian\'s full name in the text box. If capturing verbal consent, also include verbal consent in the text box.');
		});
			
		$('img[id=add_signature_3_img]').click(function()
		{
			alert('Include \"Revocation\" and the signer\'s full name in the text box.');
		});
		
		initialized = true;
		
		console.log('Added signature disclaimers.');
	}
}

function waitForElement (selector, callback, maxTimes = false)
{
	if (maxTimes != false)
	{
		maxTimes--;
	}
	console.log('Attempt');
	if($(selector).length)
	{
		callback();
		console.log('Finished');
	}
	else
	{
		if (maxTimes === false || maxTimes > 0)
		{
			setTimeout(function()
			{
				console.log('Waiting');
				waitForElement(selector, callback, maxTimes);
			}, 100);
		}
		else
		{
			console.log('Max attempts reached, giving up.');
		}
	}
}

function customCallBack ()
{
	console.log('It\'s here!');
	signatureDisclaimers();
}
	
$(document).ready(function() 
{
	$('input[type=submit]').click(function(e)
	{
		if(( $('#add_signature_1_img').attr('title') == undefined || $('#add_signature_1_img').attr('title') == 'signature placeholder' ) && ( $('#add_signature_2_img').attr('title') == undefined || $('#add_signature_2_img').attr('title') == 'signature placeholder' ) ) 
		{ 
			if($('tr').has('div[class=guardianRequiredDriver]').find('input').eq(0).prop('checked') == true) 
			{  
			} 
			else 
			{ 
				e.preventDefault(); 
				alert('Please capture client signature.'); 
			} 
		}  
		
		if($('tr').has('div[class=guardianRequiredDriver]').find('input').eq(0).prop('checked') == true) 
		{ 
			if($('#add_signature_2_img').attr('title') == undefined || $('#add_signature_2_img').attr('title') == 'signature placeholder') 
			{ 
				e.preventDefault(); 
				alert('Please capture legal guardian signature.'); 
			} 
		}
		
		if (($('tr').has('div[class*=voidType]').find('option[value=\'' + $('tr').has('div[class*=voidType]').find('select').val() + '\']').text()) == 'Revoked')  
		{
			if($('#add_signature_3_img').attr('title') == undefined || $('#add_signature_3_img').attr('title') == 'signature placeholder')
			{
				e.preventDefault();
				alert('Please capture revocation signature.');
			}
		}
	});
		
	waitForElement('img[id=add_signature_1_img]', customCallBack, 10);
});

//Auto check purposes if recipient/sender is a payer
function checkPayer(){
	if($('tr').has('div[id=recipientSenderType]').find('select').val() == $('tr').has('div[id=recipientSenderType]').find('option[text=Payer]').val()){
		$('tr').has('div[id=purpose]').find('tr:contains(\'Payment\')').eq(1).find('input').prop('checked', true);
		$('tr').has('div[id=purpose]').find('tr:contains(\'Treatment\')').eq(1).find('input').prop('checked', true);
		$('tr').has('div[id=purpose]').find('tr:contains(\'Healthcare Operations\')').eq(1).find('input').prop('checked', true);
	}
}

$('document').ready(function(){
	$('tr').has('div[id=recipientSenderType]').find('option').each(function(){this.setAttribute('text', this.outerText);});
	
	$('tr').has('div[id=recipientSenderType]').find('select').change(checkPayer);
});

//SUD All Options
function checkSUD(){
	if($('tr').has('div[id=sudAll]').find('input').prop('checked')){
		$('tr').has('div[id=sudOption]').find('input').eq(0).prop('checked', false);
		$('tr').has('div[id=sudOption]').find('input').eq(1).prop('checked', false);
		$('tr').has('div[id=sudOption]').find('input').eq(2).prop('checked', false);
		$('tr').has('div[id=sudOption]').find('input').eq(3).prop('checked', false);
		$('tr').has('div[id=sudOption]').find('input').eq(4).prop('checked', false);
		/* $('td').has('div[id=sudOption]').hide();
		$('tr').has('div[id=sudOption]').next().find('td').hide(); */
		visibility('hide', '.sudOptions');
	}
	else{
		/* $('td').has('div[id=sudOption]').show();
		$('tr').has('div[id=sudOption]').next().find('td').show(); */
		visibility('show', '.sudOptions');
	}
	
	if($('tr').has('div[id=sudOption]').find('input').eq(0).prop('checked') || $('tr').has('div[id=sudOption]').find('input').eq(1).prop('checked') || $('tr').has('div[id=sudOption]').find('input').eq(2).prop('checked') || $('tr').has('div[id=sudOption]').find('input').eq(3).prop('checked') || $('tr').has('div[id=sudOption]').find('input').eq(4).prop('checked')){
		$('tr').has('div[id=sudAll]').find('input').prop('checked', false);
		/* $('td').has('div[id=sudAll]').hide();
		$('tr').has('div[id=sudAll]').next().find('td').hide(); */
		visibility('hide', '#sudAll');
	}
	else{
		/* $('td').has('div[id=sudAll]').show();
		$('tr').has('div[id=sudAll]').next().find('td').show(); */
		visibility('show', '#sudAll');
	}
}

$('document').ready(function(){
	setTimeout(function(){
		checkSUD();
	}, 1000); 
	
	$('tr').has('div[id=sudAll]').find('input').change(checkSUD);
	$('tr').has('div[id=sudOption]').find('input').change(checkSUD);
});

//Check all releases on page load
var formState;

function checkFormState(){
	formState = 'new';
	for(let count = 0; count < arguments.length; count++){
		while($('tr').has(`div[class=${arguments[count]}], div[id=${arguments[count]}]`).length == 0){

		}
	}
	for(let count = 0; count < arguments.length; count++){
		if($('tr').has(`div[class=${arguments[count]}], div[id=${arguments[count]}]`).find('input:checked').length || $('tr').has(`div[class=${arguments[count]}], div[id=${arguments[count]}]`).find('input').val() || $('tr').has(`div[class=${arguments[count]}], div[id=${arguments[count]}]`).find('select').val()){
			formState = 'reloaded';
		}
	}
	console.log(formState);
	checkMedicaid();
}

function checkMedicaid(){
	if(formState == 'new'){
		$('tr').has('div[insuranceType=medicaid]').find('input').each(function(){
			if(!$(this).prop('checked')){
				$(this).trigger('click');
			}
		});
		console.log('Checking All');

		$('tr').has('div[id=releaseType]').find('select').val($('tr').has('div[id=releaseType]').find('option').filter(function (){return $(this).html() == 'Release/Receive Records/Information';}).val());

		$('tr').has('div[id=releaseType]').find('select').trigger('change');
		
		$('tr').has('div[id=recipientSenderType]').find('select').val($('tr').has('div[id=recipientSenderType]').find('option').filter(function (){return $(this).html() == 'Payer';}).val());

		$('tr').has('div[id=recipientSenderType]').find('select').trigger('change');
		
		$('tr').has('div[class*=payerDriver]').find('select').val($('tr').has('div[class*=payerDriver]').find('option').filter(function (){return $(this).html() == 'CHA/OMAP';}).val());

		$('tr').has('div[class*=payerDriver]').find('select').trigger('change');

		console.log('Defaulting to CHA/OMHP');
	}
	else{
		console.log('Checking None')
	}	
}

window.onload = function(){
  checkFormState.apply(null, ['releaseType', 'recipientSenderType']);    
};

//Hide unwanted Options in Select
function hideOption (target, optionText, mode = 'hide'){
	if(mode == 'hide'){
		$('tr').has(`div[id=${target}], div[class*=${target}]`).find(`option`).filter(function(){return $(this).text() == optionText}).hide();
	}
	else{
		$('tr').has(`div[id=${target}], div[class*=${target}]`).find(`option`).filter(function(){return $(this).text() == optionText}).show();
	}
}

$('document').ready(function(){
	hideOption('payerDriver', 'Cascade Health Alliance');
	hideOption('payerDriver', 'CHA RES');
	hideOption('payerDriver', 'CHA Special Auth. Rate ');
	hideOption('payerDriver', 'CHA SUD ');
	hideOption('payerDriver', 'CHAACT');
	hideOption('payerDriver', 'OMAP');
	hideOption('payerDriver', 'OMAP CAWEM');
	hideOption('payerDriver', 'OMAP QMB ');
	hideOption('payerDriver', 'OMAP SMB');
	hideOption('payerDriver', 'OMAP SMF');
	hideOption('payerDriver', 'OMAP Tier 1 Absent');
	hideOption('payerDriver', 'OMAP Tier 2');
	hideOption('payerDriver', 'OMAP Tier 3');
	hideOption('payerDriver', 'OMAP Tier 4');
	hideOption('payerDriver', 'OMAP Tier 5');
	hideOption('payerDriver', 'zTest');
});

//When CHA/OMAP
function setMedicaid(){
	if($('tr').has('div[id=payerName]').find('input').val() == 'CHA/OMAP'){
		$('tr').has('div[insuranceType=medicaid]').find('input').prop('checked', true);
		checkSUD();
	}
}

function whenCHAOMAP(){
	$('tr').has('div[insuranceType=medicaid]').find('input').attr('title', '');

	if($('#recipientSenderType').closest('table').parent().find('select').val() == $('#recipientSenderType').closest('table').parent().find('option').filter(function (){ return $(this).html() == 'Payer'}).val()){
		if($('tr').has('div[id=payerName]').find('input').val() == 'CHA/OMAP'){
			$('tr').has('div[insuranceType=medicaid]').find('input').attr('title', '<ul><li>As a Medicaid member, your insurance requires you release all KBBH records to all local Medicaid payers in order to receive services.  This includes, but is not limited to mental health and substance use disorder records, regardless of past or future services in these areas.</li></ul>');

			setMedicaid();

			$('tr').has('div[class*=payerPassengerText]').find('input').val('');
		}
		else if($('tr').has('div[id=payerName]').find('input').val() == 'Medicare'){
			$('tr').has('div[insuranceType=medicaid]').find('input').attr('title', '<ul><li>As a Medicare member, your insurance requires you release all KBBH records in order to receive services.  This includes, but is not limited to mental health and substance use disorder records, regardless of past or future services in these areas.</li></ul>');
		}
		else if($('tr').has('div[id=payerName]').find('input').val() != null && $('tr').has('div[id=payerName]').find('input').val() != 'CHA/OMAP' && $('tr').has('div[id=payerName]').find('input').val() != 'Medicare'){
			$('tr').has('div[insuranceType=medicaid]').find('input').attr('title', '<ul><li>Your insurance requires you release records related to both mental health and substance use disorders in order for KBBH to bill your insurance, regardless of past or future services in these areas.  Without this release, we will not be able to bill your insurance and you will be financially responsible for any charges to your account.</li></ul>');
		}
	}
}

$('document').ready(function(){
	//Prevent input if CHA/OMAP
	$('tr').has('div[insuranceType=medicaid]').find('input').click(function(e){
		if($('tr').has('div[id=payerName]').find('input').val() == 'CHA/OMAP' || $('tr').has('div[id=payerName]').find('input').val() == 'Medicare' || $('tr').has('div[id=payerName]').find('input').val() == 'Medicare (check only)'){
			e.preventDefault();
		}
	});

	//When CHA/OMAP add script to tooltips
	$('tr').has('div[insuranceType=medicaid]').find('input').tooltip();
	$('tr').has('div[id=recipientSenderType]').find('select').change(whenCHAOMAP);
	$('tr').has('div[class*=payerDriver]').find('select').change(whenCHAOMAP);

	//Add tooltip for All SUD Records
	$('#sudAll').attr('title', 'SUD All Records include:\n<ul><li>SUD Assessment</li><li>SUD Diagnosis</li><li>SUD Treatment Plan</li><li>SUD Treatment Notes</li><li>Substance Use History</li></ul>');
	$('#sudAll').tooltip(); 

	setTimeout(function(){
		whenCHAOMAP();
	}, 1000);
});

//Auto populate message for Outreach and default to CHA/OMAP if not
var programID;

/*function checkProgram(){
	if(programID != 138){
		if($('tr').has('div[id=releaseType]').find('select').val() == '' && $('tr').has('div[id=recipientSenderType]').find('select').val() == ''){
			$('tr').has('div[id=releaseType]').find('select').val($('tr').has('div[id=releaseType]').find('option').filter(function (){return $(this).html() == 'Release/Receive Records/Information';}).val());

			$('tr').has('div[id=releaseType]').find('select').trigger('change');
		
			$('tr').has('div[id=recipientSenderType]').find('select').val($('tr').has('div[id=recipientSenderType]').find('option').filter(function (){return $(this).html() == 'Payer';}).val());

			$('tr').has('div[id=recipientSenderType]').find('select').trigger('change');
		
			$('tr').has('div[class*=payerDriver]').find('select').val($('tr').has('div[class*=payerDriver]').find('option').filter(function (){return $(this).html() == 'CHA/OMAP';}).val());

			$('tr').has('div[class*=payerDriver]').find('select').trigger('change');
		}
	}
}*/

function checkPayerDefault(){
	if(programID != 138){
		if($('#recipientSenderType').closest('table').parent().find('select').val() == $('#recipientSenderType').closest('table').parent().find('option').filter(function (){ return $(this).html() == 'Payer'}).val()){
			if($('#payerName').closest('table').parent().find('input').val() == ''){
				$('.payerDriver').closest('table').parent().find('select').val($('.payerDriver').closest('table').parent().find('option').filter(function (){ return $(this).html() == 'CHA/OMAP'}).val());
				$('.payerDriver').closest('table').parent().find('select').trigger('change');
			}
		}
	}
}

function checkOutreach(){
	if(programID == 138 && $('tr').has('div[class*=providerDriverText]').find('input').val() == 'PSU-Regional Research Institute for Human Services')
	{
		$('tr').has('div[id=informationRecordsOutreach]').find('input').prop('checked', false);
		$('tr').has('div[id=informationRecordsOutreach]').find('input').trigger('click');
		$('tr').has('div[class=phiRequiredNotes]').find('tr:contains(\'Program Evaluation & Research\')').eq(1).find('input').prop('checked', true);
		$('td').has('div[id=informationRecordsOutreach]').show();
		$('tr').has('div[id=informationRecordsOutreach]').next().show();
		$('tr:contains(\'Program Evaluation & Research (not for treatment purposes)\')').eq(2).show();
		console.log('Is Outreach');
	}
	else
	{
		$('tr').has('div[id=informationRecordsOutreach]').find('input').prop('checked', true);
		$('tr').has('div[id=informationRecordsOutreach]').find('input').trigger('click');
		$('tr').has('div[id=informationRecordsOutreach]').next().find('textarea').val('');
		$('tr').has('div[class=phiRequiredNotes]').find('tr:contains(\'Program Evaluation & Research\')').eq(1).find('input').prop('checked', false);
		$('td').has('div[id=informationRecordsOutreach]').hide();
		$('tr').has('div[id=informationRecordsOutreach]').next().hide();
		$('tr:contains(\'Program Evaluation & Research (not for treatment purposes)\')').eq(2).hide();
		console.log('Not Outreach');
		if(formState == 'new'){

		}
	}
}

$('document').ready(function(){
	try{
		programID = window.parent[0].$('input[id=programId]').val();
	}
	catch{
		if(programID == undefined){
			programID = 130;
		}
	}

	checkPayerDefault();
	checkOutreach();
	//checkProgram();
	$('#recipientSenderType').closest('table').parent().find('select').change(checkPayerDefault);
	$('tr').has('div[class*=providerDriver]').find('select').change(checkOutreach);
});

//Create Other Option for Payer
function createOtherOption(){
	let otherOption = document.createElement('option');
	otherOption.value = 'other';
	otherOption.text = 'Other Payer';

	let payerSelect = document.querySelector('#payerSelect').closest('table').querySelector('select');

	payerSelect.appendChild(otherOption);
}

function handleOtherOption(){
	let payerSelect = document.querySelector('#payerSelect').closest('table').querySelector('select');

	if(payerSelect.value === 'other'){
		clearDropdowns();
		document.querySelector('#payerName').closest('table').querySelector('input').value = '';
		[...document.querySelectorAll('.payerPassengerText')].forEach((passenger) => {
			passenger.closest('table').querySelector('input').value = '';
		});
		document.querySelector('.payerEmail').closest('table').querySelector('input').value = '';
		visibility('hide', '#payerName');
		visibility('hide', '.payerPassengerText');
		visibility('hide', '.payerEmail');
		visibility('show', '.hideMe');
		visibility('show', '#otherName', true);
	}else if(payerSelect.value != 'other' && payerSelect.value != ''){
		visibility('show', '#payerName');
		visibility('show', '.payerPassengerText');
		visibility('show', '.payerEmail');
		visibility('hide', '.hideMe');
	}
}

document.addEventListener('DOMContentLoaded', () => {
	let payerSelect = document.querySelector('#payerSelect').closest('table').querySelector('select');
	
	createOtherOption();

	document.querySelector('#payerSelect').closest('table').querySelector('select').addEventListener('change', handleOtherOption);
	document.querySelector('#payerSelect').closest('table').querySelector('select').addEventListener('mouseleave', handleOtherOption);
});

//Make uneditable, remove dropdown arrow
function makeDropDownReadOnly(){
    $('tr').has('div[class*=passenger]').find('select').attr('style', '-webkit-appearance: none; text-indent: 1px; pointer-events: none;');
}

///Debug Test
function debugTest(){
    /* $('td').has('div[class*=hideMe]').css('display', 'inline-block');
    $('tr').has('div[class*=hideMe]').next().find('td').css('display', 'inline'); */
	visibility('show', '.hideMe');
    /* $('td').has('div[class*=payerDriver]').css('display', 'inline-block');
    $('tr').has('div[class*=payerDriver]').next().find('td').css('display', 'inline'); */
	visibility('show', '.payerDriver');
    /* $('td').has('div[class*=payerPassenger]').css('display', 'inline-block');
    $('tr').has('div[class*=payerPassenger]').next().find('td').css('display', 'inline'); */
	visibility('show', '.payerPassenger');
    /* $('td').has('div[class*=providerDriver]').css('display', 'inline-block');
    $('tr').has('div[class*=providerDriver]').next().find('td').css('display', 'inline'); */
	visibility('show', '.providerDriver');
    /* $('td').has('div[class*=providerPassenger]').css('display', 'inline-block');
    $('tr').has('div[class*=providerPassenger]').next().find('td').css('display', 'inline'); */
	visibility('show', '.providerPassenger');
    /* $('td').has('div[class*=payerPassengerText]').css('display', 'inline-block');
    $('tr').has('div[class*=payerPassengerText]').next().find('td').css('display', 'inline'); */
	visibility('show', '.payerPassengerText');
    /* $('td').has('div[class*=providerPassengerText]').css('display', 'inline-block');
    $('tr').has('div[class*=providerPassengerText]').next().find('td').css('display', 'inline'); */
	visibility('show', '.providerPassengerText');

    if($('tr').has('div[class*=hideDriver]').find('select').attr('value') == $('option:contains(\'Other\')').attr('value'))
    {
        $('tr').has('div[class*=payerDriver]').find('select').val('');
        $('tr').has('div[class*=payerPassenger]').find('select').val('');
        $('tr').has('div[class*=providerDriver]').find('select').val('');
        $('tr').has('div[class*=providerPassenger]').find('select').val('');
    }
    else if ($('tr').has('div[class*=hideDriver]').find('select').attr('value') == $('option:contains(\'Payer\')').attr('value'))
    {
        $('tr').has('div[class*=providerDriver]').find('select').val('');
        $('tr').has('div[class*=providerPassenger]').find('select').val('');
    }
    else if ($('tr').has('div[class*=hideDriver]').find('select').attr('value') == $('option:contains(\'Provider\')').attr('value'))
    {
        $('tr').has('div[class*=payerDriver]').find('select').val('');
        $('tr').has('div[class*=payerPassenger]').find('select').val('');
    }
}