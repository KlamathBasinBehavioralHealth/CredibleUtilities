//Initialize display states and add event handlers for dropMatchId
document.addEventListener('DOMContentLoaded', (event) => { 
	visibility('hide', '.sender');
	try{
		[...document.querySelectorAll('.sender')].forEach((sender) => {
			/*sender.closest('table').querySelector('select').setAttribute(
				'style',
				'-webkit-appearance: none; text-indent: 1px; pointer-events: none;'
			);*/
			sender.closest('table').querySelector('select').disabled = true;
		});
	}catch(error){

	}

	document.querySelector('#recipientSenderType').closest('table').querySelector('select').addEventListener('change', () => {
		//If Swapping from one to another, clear fields of appropriate Then autofill when interpreter
		let type = document.querySelector('#recipientSenderType').closest('table').querySelector('select').options[document.querySelector('#recipientSenderType').closest('table').querySelector('select').selectedIndex].text;
		
		visibility('show', '.reciever');

		switch(type){
			case 'Payer':
				clearSenders();
				clearRecievers();
				restrictUnrestrictRecievers(false);
				break;
			case 'Provider':
				clearSenders();
				clearRecievers();
				restrictUnrestrictRecievers(false);
				break;	
			case 'Interpreter':
				clearSenders();
				clearRecievers();
				restrictUnrestrictRecievers(true);
				document.querySelector('#entity').closest('table').querySelector('input').value = 'Any Interpreter Entity';
				visibility('hide', '.reciever');
				visibility('show', '#entity');
				$('tr').has('div[insuranceType=medicaid]').find('input').each(function(){
					if(!$(this).prop('checked')){
						$(this).prop('checked', true);
					}
				});
				break;
			default:
				clearSenders();
				clearRecievers();
				restrictUnrestrictRecievers(false);
		}
	});
	document.querySelector('#recipientSenderType').closest('table').querySelector('select').addEventListener('mouseleave', () => {
		//If Swapping from one to another, clear fields of appropriate Then autofill when interpreter
	});

	document.querySelector('#payerSelect').closest('table').querySelector('select').addEventListener('change', () => {
		try{
			dropMatchId();
		}catch(error){
			console.log(error);
		}
	});
	document.querySelector('#payerSelect').closest('table').querySelector('select').addEventListener('mouseleave', () => {
		try{
			dropMatchId();
		}catch(error){
			console.log(error);
		}
	});

	
	document.querySelector('#providerSelect').closest('table').querySelector('select').addEventListener('change', () => {
		try{
			dropMatchId();
		}catch(error){
			console.log(error);
		}
	});
	document.querySelector('#providerSelect').closest('table').querySelector('select').addEventListener('mouseleave', () => {
		try{
			dropMatchId();
		}catch(error){
			console.log(error);
		}
	});
	
	try{
		dropMatchId();
	}catch(error){
		console.log(error);
	}
	
	document.querySelectorAll('hr.line').forEach(hr => {
		hr.style.width = '100em';
	});
	
	document.querySelectorAll('input[name="Complete"]').forEach(input => {
		input.disabled = false;
	});
});

//Functions for Matching dropdown IDs and Running Show Hide
function dropMatchId ()
{	
	if(document.querySelector('#payerSelect').closest('table').querySelector('select').value){
		clearRecievers();

		[...document.querySelectorAll('.payerPassenger')].forEach((passenger) => {
			passenger.closest('table').querySelector('select').value = document.querySelector('#payerSelect').closest('table').querySelector('select').value;
		});

		if(document.querySelector('#payerSelect').closest('table').querySelector('select').options[document.querySelector('#payerSelect').closest('table').querySelector('select').selectedIndex].text != ''){
			document.querySelector('#entity').closest('table').querySelector('input').value = document.querySelector('#payerSelect').closest('table').querySelector('select').options[document.querySelector('#payerSelect').closest('table').querySelector('select').selectedIndex].text.replace(/\./g, '');

			document.querySelector('#entity').closest('table').querySelector('input').readOnly = true;
		}
		if(document.querySelector('#payerAddressOne').closest('table').querySelector('select').options[document.querySelector('#payerAddressOne').closest('table').querySelector('select').selectedIndex].text != ''){
			document.querySelector('#addressOne').closest('table').querySelector('input').value = document.querySelector('#payerAddressOne').closest('table').querySelector('select').options[document.querySelector('#payerAddressOne').closest('table').querySelector('select').selectedIndex].text;

			document.querySelector('#addressOne').closest('table').querySelector('input').readOnly = true;
		}
		if(document.querySelector('#payerAddressTwo').closest('table').querySelector('select').options[document.querySelector('#payerAddressTwo').closest('table').querySelector('select').selectedIndex].text != ''){
			document.querySelector('#addressTwo').closest('table').querySelector('input').value = document.querySelector('#payerAddressTwo').closest('table').querySelector('select').options[document.querySelector('#payerAddressTwo').closest('table').querySelector('select').selectedIndex].text;

			document.querySelector('#addressTwo').closest('table').querySelector('input').readOnly = true;
		}
		if(document.querySelector('#payerCity').closest('table').querySelector('select').options[document.querySelector('#payerCity').closest('table').querySelector('select').selectedIndex].text != ''){
			document.querySelector('#city').closest('table').querySelector('input').value = document.querySelector('#payerCity').closest('table').querySelector('select').options[document.querySelector('#payerCity').closest('table').querySelector('select').selectedIndex].text;

			document.querySelector('#city').closest('table').querySelector('input').readOnly = true;
		}
		if(document.querySelector('#payerState').closest('table').querySelector('select').options[document.querySelector('#payerState').closest('table').querySelector('select').selectedIndex].text != ''){
			document.querySelector('#state').closest('table').querySelector('select').value = [...document.querySelector('#state').closest('table').querySelector('select').options].find(option =>	option.title.trim().toLowerCase() == document.querySelector('#payerState').closest('table').querySelector('select').options[document.querySelector('#payerState').closest('table').querySelector('select').selectedIndex].text.trim().toLowerCase()).value;

			document.querySelector('#state').closest('table').querySelector('select').disabled = true;
		}
		if(document.querySelector('#payerZip').closest('table').querySelector('select').options[document.querySelector('#payerZip').closest('table').querySelector('select').selectedIndex].text != ''){
			document.querySelector('#zip').closest('table').querySelector('input').value = document.querySelector('#payerZip').closest('table').querySelector('select').options[document.querySelector('#payerZip').closest('table').querySelector('select').selectedIndex].text;

			document.querySelector('#zip').closest('table').querySelector('input').readOnly = true;
		}
		if(document.querySelector('#payerPhone').closest('table').querySelector('select').options[document.querySelector('#payerPhone').closest('table').querySelector('select').selectedIndex].text != ''){
			document.querySelector('#phone').closest('table').querySelector('input').value = document.querySelector('#payerPhone').closest('table').querySelector('select').options[document.querySelector('#payerPhone').closest('table').querySelector('select').selectedIndex].text;

			document.querySelector('#phone').closest('table').querySelector('input').readOnly = true;
		}
		if(document.querySelector('#payerFax').closest('table').querySelector('select').options[document.querySelector('#payerFax').closest('table').querySelector('select').selectedIndex].text != ''){
			document.querySelector('#fax').closest('table').querySelector('input').value = document.querySelector('#payerFax').closest('table').querySelector('select').options[document.querySelector('#payerFax').closest('table').querySelector('select').selectedIndex].text;

			document.querySelector('#fax').closest('table').querySelector('input').readOnly = true;
		}

		requireField('#payerSelect', false);
		clearSenders();
	}

	if(document.querySelector('#providerSelect').closest('table').querySelector('select').value){
		clearRecievers();
		[...document.querySelectorAll('.providerPassenger')].forEach((passenger) => {
			passenger.closest('table').querySelector('select').value = document.querySelector('#providerSelect').closest('table').querySelector('select').value;
		});

		if(document.querySelector('#providerSelect').closest('table').querySelector('select').options[document.querySelector('#providerSelect').closest('table').querySelector('select').selectedIndex].text != ''){
			document.querySelector('#entity').closest('table').querySelector('input').value = document.querySelector('#providerSelect').closest('table').querySelector('select').options[document.querySelector('#providerSelect').closest('table').querySelector('select').selectedIndex].text.replace(/\./g, '');

			document.querySelector('#entity').closest('table').querySelector('input').readOnly = true;
		}
		if(document.querySelector('#providerAddressOne').closest('table').querySelector('select').options[document.querySelector('#providerAddressOne').closest('table').querySelector('select').selectedIndex].text != ''){
			document.querySelector('#addressOne').closest('table').querySelector('input').value = document.querySelector('#providerAddressOne').closest('table').querySelector('select').options[document.querySelector('#providerAddressOne').closest('table').querySelector('select').selectedIndex].text;

			document.querySelector('#addressOne').closest('table').querySelector('input').readOnly = true;
		}
		if(document.querySelector('#providerCity').closest('table').querySelector('select').options[document.querySelector('#providerCity').closest('table').querySelector('select').selectedIndex].text != ''){
			document.querySelector('#city').closest('table').querySelector('input').value = document.querySelector('#providerCity').closest('table').querySelector('select').options[document.querySelector('#providerCity').closest('table').querySelector('select').selectedIndex].text;

			document.querySelector('#city').closest('table').querySelector('input').readOnly = true;
		}
		if(document.querySelector('#providerState').closest('table').querySelector('select').options[document.querySelector('#providerState').closest('table').querySelector('select').selectedIndex].text != ''){
			document.querySelector('#state').closest('table').querySelector('select').value = [...document.querySelector('#state').closest('table').querySelector('select').options].find(option =>	option.title.trim().toLowerCase() == document.querySelector('#providerState').closest('table').querySelector('select').options[document.querySelector('#providerState').closest('table').querySelector('select').selectedIndex].text.trim().toLowerCase()).value;

			document.querySelector('#state').closest('table').querySelector('select').disabled = true;
		}
		if(document.querySelector('#providerZip').closest('table').querySelector('select').options[document.querySelector('#providerZip').closest('table').querySelector('select').selectedIndex].text != ''){
			document.querySelector('#zip').closest('table').querySelector('input').value = document.querySelector('#providerZip').closest('table').querySelector('select').options[document.querySelector('#providerZip').closest('table').querySelector('select').selectedIndex].text;

			document.querySelector('#zip').closest('table').querySelector('input').readOnly = true;
		}
		if(document.querySelector('#providerPhone').closest('table').querySelector('select').options[document.querySelector('#providerPhone').closest('table').querySelector('select').selectedIndex].text != ''){
			document.querySelector('#phone').closest('table').querySelector('input').value = document.querySelector('#providerPhone').closest('table').querySelector('select').options[document.querySelector('#providerPhone').closest('table').querySelector('select').selectedIndex].text;

			document.querySelector('#phone').closest('table').querySelector('input').readOnly = true;
		}
		if(document.querySelector('#providerFax').closest('table').querySelector('select').options[document.querySelector('#providerFax').closest('table').querySelector('select').selectedIndex].text != ''){
			document.querySelector('#fax').closest('table').querySelector('input').value = document.querySelector('#providerFax').closest('table').querySelector('select').options[document.querySelector('#providerFax').closest('table').querySelector('select').selectedIndex].text;

			document.querySelector('#fax').closest('table').querySelector('input').readOnly = true;
		}
		if(document.querySelector('#providerEmail').closest('table').querySelector('select').options[document.querySelector('#providerEmail').closest('table').querySelector('select').selectedIndex].text != ''){
			document.querySelector('#email').closest('table').querySelector('input').value = document.querySelector('#providerEmail').closest('table').querySelector('select').options[document.querySelector('#providerEmail').closest('table').querySelector('select').selectedIndex].text;

			document.querySelector('#email').closest('table').querySelector('input').readOnly = true;
		}

		requireField('#providerSelect', false);
		clearSenders();
	}
}

//Clearing dropdowns on form submit
function clearSenders()
{	
	document.querySelector('#payerSelect').closest('table').querySelector('select').value = '';
	document.querySelector('#providerSelect').closest('table').querySelector('select').value = '';
	[...document.querySelectorAll('.sender')].forEach((sender) => {
		sender.closest('table').querySelector('select').value = '';
	});
}

//Clear all reciever entries
function clearRecievers(){
	[...document.querySelectorAll('.reciever')].forEach((reciever) => {
		reciever.closest('table').querySelector('input, select').value = '';

		restrictUnrestrictRecievers(false);
	});
}

//Restrict/Unrestrict recievers
function restrictUnrestrictRecievers(condition){
	if(condition == true || condition == false){
		[...document.querySelectorAll('.reciever')].forEach((reciever) => {
			try{
				reciever.closest('table').querySelector('input').readOnly = condition;
			}catch(error){

			}
			try{
				reciever.closest('table').querySelector('select').disabled = condition;
			}catch(error){

			}
		});
	}
}

//Re-enable any disabled dropdowns before form submit
document.addEventListener('submit', () => {
  [...document.querySelectorAll('select:disabled')].forEach(select => {
    select.disabled = false;
  });
});

function checkGuardianDriver(){
	visibility('hide', '.guardianRequired', false);
	visibility('hide', '.relationshipRequiredNotes', false, false);
	if($('tr').has('div[class*=guardianRequiredDriver]').find('input')[0].checked){
		visibility('show', '.guardianRequired', true);
		visibility('show', '.relationshipRequiredNotes', true);
	}
}

function checkHIV(){
	visibility('hide', '.requiredDates', false);
	if($('tr').has('div[id=hivAids]').find('input').prop('checked') == true){
		visibility('show', '.requiredDates', true);
	}
}

function checkVerified(){
	visibility('hide', '.verifiedRequired', false);
	requireField('.verifiedRequired', false);
	requireNotes('#verifiedReqDrive', false);

	if(document.querySelector('.verifiedRequiredDriver').closest('table').querySelector('select')[document.querySelector('.verifiedRequiredDriver').closest('table').querySelector('select').selectedIndex].text === 'Other (listed below)'){
		visibility('show', '.verifiedRequired', true);
		requireField('.verifiedRequired', true);
		requireNotes('#verifiedReqDrive', true);
	}else if(document.querySelector('.verifiedRequiredDriver').closest('table').querySelector('select')[document.querySelector('.verifiedRequiredDriver').closest('table').querySelector('select').selectedIndex].text === 'Parent'){
		visibility('show', '.verifiedRequired', false);
		requireField('.verifiedRequired', false);
		requireNotes('#verifiedReqDrive', false);
	}
}

//Event handlers for mandatory hidden questions
$(document).ready(function(){
	checkGuardianDriver();
	checkHIV();
	checkVerified();
	$('tr').has('div[class*=guardianRequiredDriver]').find('input').change(function(event)
	{
		checkGuardianDriver();
		checkVerified();
	});
	$('tr').has('div[id=hivAids]').find('input').change(function(event)
	{
		checkHIV();
	});
	$('tr').has('div[class*=verifiedRequiredDriver]').find('select').change(function(event)
	{
		checkVerified();
	});

	checkRestrictions();

	$('tr').has('div[class*=restrictionRequiredDriver]').find('input').change(function(event){
		checkRestrictions();
	});
	
	/* $('tr').has('div[class*=revocationRequiredDriver]').find('input').change(function()
	{
		requireField('.voidType', $('tr').has('div[class*=revocationRequiredDriver]').find('input').prop('checked'));
	});
	$('tr').has('div[class*=voidType]').find('select').change(function(event)
	{
		requireField('.revocationDetails', ($('tr').has('div[class*=voidType]').find('select').val() == $('tr').has('div[class*=voidType]').find('option:contains(\'Revoked\')').val()));
	}); */
});

function checkRestrictions(){
	requireField('#readingRestrictionRequired', false);
	requireField('#writingRestrictionRequired', false);
	requireField('#languageRestrictionRequired', false);
		
	if ($('tr').has('div[class*=restrictionRequiredDriver]').find('input')[1].checked){
		requireField('#readingRestrictionRequired', false);
	}
	if ($('tr').has('div[class*=restrictionRequiredDriver]').find('input')[2].checked){
		requireField('#writingRestrictionRequired', false);
	}
	if ($('tr').has('div[class*=restrictionRequiredDriver]').find('input')[3].checked){
		requireField('#languageRestrictionRequired', false);
	}
}

//Event handlers for mandatory hidden note fields
$(document).ready(function(){
	$('tr').has('div[id=informationRecordsOther]').find('input').change(function(event)
	{
		requireNotes('#informationRecordsOther', $('tr').has('div[id=informationRecordsOther]').find('input').prop('checked'));
	});
	$('tr').has('div[class*=phiRequiredNotes]').find('input').change(function(event)
	{
		requireNotes('#phiRequiredNotes', $('tr').has('div[class*=phiRequiredNotes]').find('tr:contains(\'Other\')').eq(1).find('input').prop('checked'));
	});
	$('tr').has('div[class*=relationshipRequiredNotes]').find('select').change(function(event)
	{
		requireNotes('#relationshipRequiredNotes', $('tr').has('div[class*=relationshipRequiredNotes]').find('select').attr('value') == $('tr').has('div[class*=relationshipRequiredNotes]').find('option:contains(\'Other\')').attr('value'));
	});
	$('tr').has('div[class*=revocationNotes]').find('input').change(function(event)
	{
		requireNotes('#revocationNotes', $('tr').has('div[class*=revocationNotes]').find('input').prop('checked'));
	});
	$('tr').has('div[id=language]').find('select').change(function(event)
	{
		console.log('Entered Language Dropdown');
		if($('tr').has('div[id=language]').find('option:contains(\'Other\')').prop('selected') == true)
		{
			requireNotes('#language', true);
		}
		else
		{
			requireNotes('#language', false);
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
	visibility('hide', '#reason', false);
	if($('tr').has('div[class=revocationRequiredDriver]').find('input').prop('checked')){
		visibility('show', '#reason', true);
	}
}

function checkHidden () 
{     
	$('tr').has('div[class=expiredROI]').find('input').attr('checked', false);
	$('tr').has('div[class=invalidROI]').find('input').attr('checked', false);
	$('tr').has('div[class=revokedROI]').find('input').attr('checked', false);   
	requireField('voidType', false);
	visibility('hide', '.revocationDetails', false);
	visibility('hide', '.expiredROI', false);	
	visibility('hide', '.invalidROI', false);
	visibility('hide', '.revokedROI', false);
	requireField('#revocationDate', false);
	requireNotes('.revocationNotes', false);
	
	if (($('tr').has('div[class*=voidType]').find('option[value=\'' + $('tr').has('div[class*=voidType]').find('select').val() + '\']').text()) == 'Expired')    
	{         
		$('tr').has('div[class=expiredROI]').find('input').attr('checked', true);
		$('tr').has('div[class=invalidROI]').find('input').attr('checked', false);
		$('tr').has('div[class=revokedROI]').find('input').attr('checked', false);
		requireField('#voidType', false);
		visibility('hide', '.revocationDetails');	
		visibility('show', '.expiredROI', true);	
		visibility('hide', '.invalidROI', false);
		visibility('hide', '.revokedROI', false);
		requireField('#revocationDate', false);
		requireNotes('.revocationNotes', false);
	}
	else if (($('tr').has('div[class*=voidType]').find('option[value=\'' + $('tr').has('div[class*=voidType]').find('select').val() + '\']').text()) == 'Invalid')     
	{                  
		$('tr').has('div[class=expiredROI]').find('input').attr('checked', false);
		$('tr').has('div[class=invalidROI]').find('input').attr('checked', true);	
		$('tr').has('div[class=revokedROI]').find('input').attr('checked', false);
		requireField('#voidType', true);
		visibility('hide', '.revocationDetails', false);	
		visibility('hide', '.expiredROI', false);	
		visibility('show', '.invalidROI', true);
		visibility('hide', '.revokedROI', false);
		requireField('#revocationDate', false);
		requireNotes('.revocationNotes', false);
	}
	else if (($('tr').has('div[class*=voidType]').find('option[value=\'' + $('tr').has('div[class*=voidType]').find('select').val() + '\']').text()) == 'Revoked')     
	{                  
		$('tr').has('div[class=expiredROI]').find('input').attr('checked', false);
		$('tr').has('div[class=invalidROI]').find('input').attr('checked', false);
		$('tr').has('div[class=revokedROI]').find('input').attr('checked', true);		
		requireField('#voidType', false);
		visibility('show', '.revocationDetails', true);
		visibility('hide', '.expiredROI', false);	
		visibility('hide', '.invalidROI', false);
		visibility('show', '.revokedROI', true);
		requireField('#revocationDate', true);
		requireNotes('.revocationNotes', true);
	}
}

$(document).ready(function() 
{         
	checkHidden();
	setTimeout(function(){
		checkHidden();
	}, 1000);
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

//Restrictions checkbox logic
$(document).ready(function() 
{
	visibility('hide', '.readingRestriction', false);
	visibility('hide', '.readingRestrictionRequired', false);
	visibility('hide', '.writingRestriction', false);
	visibility('hide', '.writingRestrictionRequired', false);
	visibility('hide', '.languageRestriction', false);
	visibility('hide', '.languageRestrictionRequired', false);
	
	if($('tr').has('div[class*=restrictionRequiredDriver]').find('input').eq(1).prop('checked'))
	{
		visibility('show', '.readingRestriction', false);
		visibility('show', '.readingRestrictionRequired', true);
	}
	
	if($('tr').has('div[class*=restrictionRequiredDriver]').find('input').eq(2).prop('checked'))
	{
		visibility('show', '.writingRestriction', false);
		visibility('show', '.writingRestrictionRequired', true);
	}
	
	if($('tr').has('div[class*=restrictionRequiredDriver]').find('input').eq(3).prop('checked'))
	{
		visibility('show', '.languageRestriction', false);
		visibility('show', '.languageRestrictionRequired', true);
	}
			
	$('tr').has('div[class*=restrictionRequiredDriver]').find('input').eq(0).change(function(){
		if($('tr').has('div[class*=restrictionRequiredDriver]').find('input').eq(0).prop('checked'))
		{
			$('tr').has('div[class*=restrictionRequiredDriver]').find('input').eq(1).prop('checked', false);
			$('tr').has('div[class*=restrictionRequiredDriver]').find('input').eq(2).prop('checked', false);
			$('tr').has('div[class*=restrictionRequiredDriver]').find('input').eq(3).prop('checked', false);
			visibility('hide', '.readingRestriction', false);
			visibility('hide', '.readingRestrictionRequired', false);
			visibility('hide', '.writingRestriction', false);
			visibility('hide', '.writingRestrictionRequired', false);
			visibility('hide', '.languageRestriction', false);
			visibility('hide', '.languageRestrictionRequired', false);
		}
	});
	$('tr').has('div[class*=restrictionRequiredDriver]').find('input').eq(1).change(function(){
		if($('tr').has('div[class*=restrictionRequiredDriver]').find('input').eq(1).prop('checked'))
		{
			$('tr').has('div[class*=restrictionRequiredDriver]').find('input').eq(0).prop('checked', false);
			visibility('show', '.readingRestriction', false);
			visibility('show', '.readingRestrictionRequired', true);
		}
		else
		{
			visibility('hide', '.readingRestriction', false);
			visibility('hide', '.readingRestrictionRequired', false);
		}
	});
	$('tr').has('div[class*=restrictionRequiredDriver]').find('input').eq(2).change(function(){
		if($('tr').has('div[class*=restrictionRequiredDriver]').find('input').eq(2).prop('checked'))
		{
			$('tr').has('div[class*=restrictionRequiredDriver]').find('input').eq(0).prop('checked', false);
			visibility('show', '.writingRestriction', false);
			visibility('show', '.writingRestrictionRequired', true);
		}
		else
		{
			visibility('hide', '.writingRestriction', false);
			visibility('hide', '.writingRestrictionRequired', false);
		}
	});
	$('tr').has('div[class*=restrictionRequiredDriver]').find('input').eq(3).change(function(){
		if($('tr').has('div[class*=restrictionRequiredDriver]').find('input').eq(3).prop('checked'))
		{
			$('tr').has('div[class*=restrictionRequiredDriver]').find('input').eq(0).prop('checked', false);
			visibility('show', '.languageRestriction', false);
			visibility('show', '.languageRestrictionRequired', true);
		}
		else
		{
			visibility('hide', '.languageRestriction', false);
			visibility('hide', '.languageRestrictionRequired', false);
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
	$('tr').has('div[id=purpose]').find('tr:contains(\'Payment\')').eq(1).find('input').prop('checked', true);
	$('tr').has('div[id=purpose]').find('tr:contains(\'Treatment\')').eq(1).find('input').prop('checked', true);
	$('tr').has('div[id=purpose]').find('tr:contains(\'Healthcare Operations\')').eq(1).find('input').prop('checked', true);
	
	/*if(document.querySelector('#recipientSenderType').closest('table').querySelector('select').value === [...document.querySelector('#recipientSenderType').closest('table').querySelectorAll('option')].filter((option) => { return option.innerText === 'Payer';})[0].value{
		$('tr').has('div[id=purpose]').find('tr:contains(\'Payment\')').eq(1).find('input').prop('checked', true);
		$('tr').has('div[id=purpose]').find('tr:contains(\'Treatment\')').eq(1).find('input').prop('checked', true);
		$('tr').has('div[id=purpose]').find('tr:contains(\'Healthcare Operations\')').eq(1).find('input').prop('checked', true);
	}
	else if(document.querySelector('#recipientSenderType').closest('table').querySelector('select').value === [...document.querySelector('#recipientSenderType').closest('table').querySelectorAll('option')].filter((option) => { return option.innerText === 'Interpreter';})[0].value){
		$('tr').has('div[id=purpose]').find('tr:contains(\'Payment\')').eq(1).find('input').prop('checked', true);
		$('tr').has('div[id=purpose]').find('tr:contains(\'Treatment\')').eq(1).find('input').prop('checked', true);
		$('tr').has('div[id=purpose]').find('tr:contains(\'Healthcare Operations\')').eq(1).find('input').prop('checked', true);
	}else{
		$('tr').has('div[id=purpose]').find('tr:contains(\'Payment\')').eq(1).find('input').prop('checked', true);
		$('tr').has('div[id=purpose]').find('tr:contains(\'Treatment\')').eq(1).find('input').prop('checked', true);
		$('tr').has('div[id=purpose]').find('tr:contains(\'Healthcare Operations\')').eq(1).find('input').prop('checked', true);
	}*/
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
		visibility('hide', '.sudOptions');
	}
	else{
		visibility('show', '.sudOptions');
	}
	
	if($('tr').has('div[id=sudOption]').find('input').eq(0).prop('checked') || $('tr').has('div[id=sudOption]').find('input').eq(1).prop('checked') || $('tr').has('div[id=sudOption]').find('input').eq(2).prop('checked') || $('tr').has('div[id=sudOption]').find('input').eq(3).prop('checked') || $('tr').has('div[id=sudOption]').find('input').eq(4).prop('checked')){
		$('tr').has('div[id=sudAll]').find('input').prop('checked', false);
		visibility('hide', '#sudAll');
	}
	else{
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
	/*for(let count = 0; count < arguments.length; count++){
		while($('tr').has(`div[class=${arguments[count]}], div[id=${arguments[count]}]`).length == 0){

		}
	}
	for(let count = 0; count < arguments.length; count++){
		if($('tr').has(`div[class=${arguments[count]}], div[id=${arguments[count]}]`).find('input:checked').length || $('tr').has(`div[class=${arguments[count]}], div[id=${arguments[count]}]`).find('input').val() || $('tr').has(`div[class=${arguments[count]}], div[id=${arguments[count]}]`).find('select').val()){
			formState = 'reloaded';
		}
	}*/
	if([...document.querySelectorAll('.awknowledgement')].filter(element => element.closest('table').querySelector('input').checked == true).length){
		formState = 'reloaded';
	}
	console.log(formState);
	checkMedicaid();
	restrictValidDates();
}

function checkMedicaid(){
	if(formState == 'new'){
		$('tr').has('div[insuranceType=medicaid]').find('input').each(function(){
			if(!$(this).prop('checked')){
				$(this).prop('checked', true);
			}
		});
		console.log('Checking All');

		[...document.querySelector('#releaseType').closest('table').querySelectorAll('input')].forEach((input) => {
			input.checked = true;
			input.dispatchEvent(new Event("change", { bubbles: true }));
		});
		
		$('tr').has('div[id=recipientSenderType]').find('select').val($('tr').has('div[id=recipientSenderType]').find('option').filter(function (){return $(this).html() == 'Payer';}).val());

		$('tr').has('div[id=recipientSenderType]').find('select').trigger('change');

		document.querySelector('#payerSelect').closest('table').querySelector('select').value = [...document.querySelector('#payerSelect').closest('table').querySelector('select').options].filter((option) => option.title.includes('CHA/OMAP'))[0].value;

		document.querySelector('#payerSelect').closest('table').querySelector('select').dispatchEvent(new Event("change", { bubbles: true }));

		console.log('Defaulting to CHA/OMHP');
	}
	else{
		console.log('Checking None')
	}	
}

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
	if($('tr').has('div[id=entity]').find('input').val() == 'CHA/OMAP'){
		$('tr').has('div[insuranceType=medicaid]').find('input').prop('checked', true);
		checkSUD();
	}
}

function whenCHAOMAP(){
	$('tr').has('div[insuranceType=medicaid]').find('input').attr('title', '');

	if($('#recipientSenderType').closest('table').parent().find('select').val() == $('#recipientSenderType').closest('table').parent().find('option').filter(function (){ return $(this).html() == 'Payer'}).val()){
		if($('tr').has('div[id=entity]').find('input').val() == 'CHA/OMAP'){
			$('tr').has('div[insuranceType=medicaid]').find('input').attr('title', 'As a Medicaid member, your insurance requires you release all KBBH records to all local Medicaid payers in order to receive services.  This includes, but is not limited to mental health and substance use disorder records, regardless of past or future services in these areas.');

			setMedicaid();

			$('tr').has('div[class*=payerPassengerText]').find('input').val('');

			/*[...document.querySelectorAll('div[insuranceType=\'medicaid\']')].forEach((div) => {
				div.closest('table').querySelector('input').style.border = '2px solid black';
				div.closest('table').querySelector('input').style.backgroundColor = 'lightblue';
				div.closest('table').querySelector('input').style.outline = 'none';
			});*/
		}
		else if($('tr').has('div[id=entity]').find('input').val() == 'Medicare'){
			$('tr').has('div[insuranceType=medicaid]').find('input').attr('title', 'As a Medicare member, your insurance requires you release all KBBH records in order to receive services.  This includes, but is not limited to mental health and substance use disorder records, regardless of past or future services in these areas.');
		}
		else if($('tr').has('div[id=entity]').find('input').val() != null && $('tr').has('div[id=entity]').find('input').val() != 'CHA/OMAP' && $('tr').has('div[id=entity]').find('input').val() != 'Medicare'){
			$('tr').has('div[insuranceType=medicaid]').find('input').attr('title', 'Your insurance requires you release records related to both mental health and substance use disorders in order for KBBH to bill your insurance, regardless of past or future services in these areas.  Without this release, we will not be able to bill your insurance and you will be financially responsible for any charges to your account.');
		}
	}
}

$('document').ready(function(){
	//Prevent input if CHA/OMAP
	$('tr').has('div[insuranceType=medicaid]').find('input').click(function(e){
		if($('tr').has('div[id=entity]').find('input').val() == 'CHA/OMAP' || $('tr').has('div[id=entity]').find('input').val() == 'Medicare' || $('tr').has('div[id=entity]').find('input').val() == 'Medicare (check only)'){
			e.preventDefault();
		}else if(document.querySelector('#recipientSenderType').closest('table').querySelector('select').value === [...document.querySelector('#recipientSenderType').closest('table').querySelectorAll('option')].filter((option) => { return option.innerText === 'Interpreter';})[0].value){
			e.preventDefault();
		}
	});

	//When CHA/OMAP add script to tooltips
	$('tr').has('div[insuranceType=medicaid]').find('input').tooltip();
	$('tr').has('div[id=recipientSenderType]').find('select').change(whenCHAOMAP);
	$('tr').has('div[class*=payerDriver]').find('select').change(whenCHAOMAP);

	/*//Add tooltip for All SUD Records
	$('#sudAll').attr('title', 'SUD All Records include:\n<ul><li>SUD Assessment</li><li>SUD Diagnosis</li><li>SUD Treatment Plan</li><li>SUD Treatment Notes</li><li>Substance Use History</li></ul>');
	$('#sudAll').tooltip(); */

	setTimeout(function(){
		whenCHAOMAP();
	}, 1000);
});

//Auto populate message for Outreach and default to CHA/OMAP if not
var programID;

function checkPayerDefault(){
	if(programID != 138){
		if($('#recipientSenderType').closest('table').parent().find('select').val() == $('#recipientSenderType').closest('table').parent().find('option').filter(function (){ return $(this).html() == 'Payer'}).val()){
			if($('#entity').closest('table').parent().find('input').val() == ''){
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
		
		document.querySelector('#entity').closest('table').querySelector('input').value = '';
		clearSenders();
		restrictUnrestrictRecievers(false);
	}/*else if(payerSelect.value != 'other' && payerSelect.value != ''){
		visibility('show', '#payerName');
		visibility('show', '.payerPassengerText');
		visibility('show', '.payerEmail');
		visibility('hide', '.hideMe');
	}*/
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

//Hide extra BCBS Options
document.addEventListener("DOMContentLoaded", (event) => {
  [...document.querySelector('#payerSelect').closest('table').querySelectorAll('option')].filter((option) => {
    return option.title.includes('BCBS') || option.title.includes('Blue Cross/Blue Shield') || option.title.includes('Blue Cross') || option.title.includes('Blue Shield');
  }).forEach((result) => {
    if(result.title !== 'Blue Cross/Blue Shield'){
      console.log(result.title);
      result.style.display = 'none';
    }
  });
});

document.addEventListener("DOMContentLoaded", (event) => {
  [...document.querySelector('#providerSelect').closest('table').querySelectorAll('option')].filter((option) => {
    return option.title.includes('Sky Lakes');
  }).forEach((result) => {
    if(result.title !== 'Sky Lakes Medical Center And Affiliates'){
      console.log(result.title);
      result.style.display = 'none';
    }
  });
});

//ROI Valid Options
function restrictValidDates(){
  let recipientType = document.querySelector('#recipientSenderType').closest('table').querySelector('select');
  let payerValue = [...document.querySelector('#recipientSenderType').closest('table').querySelectorAll('option')].filter((option) => {
    return option.innerText === 'Payer';
  })[0].value;
  let providerValue = [...document.querySelector('#recipientSenderType').closest('table').querySelectorAll('option')].filter((option) => {
    return option.innerText === 'Provider';
  })[0].value;
    let interpreterValue = [...document.querySelector('#recipientSenderType').closest('table').querySelectorAll('option')].filter((option) => {
    return option.innerText === 'Interpreter';
  })[0].value;
  let otherValue = [...document.querySelector('#recipientSenderType').closest('table').querySelectorAll('option')].filter((option) => {
    return option.innerText === 'Other (details below)';
  })[0].value;
  let validByLaw = document.querySelector('#validByLaw').closest('tr');  
  let validByLawInput = document.querySelector('#validByLaw').closest('tr').querySelector('input');
  let validByDate = document.querySelector('#validByDate').closest('tr');
  let validByDateInput = document.querySelector('#validByDate').closest('tr').querySelector('input');
  
  if(recipientType.value === payerValue || recipientType.value === providerValue || recipientType.value === interpreterValue){
    validByLawInput.style.pointerEvents = 'none';
    validByDateInput.style.pointerEvents = 'auto';
    validByLaw.hidden = false;
    validByDate.hidden = true;
    if(!validByLaw.querySelector('input').checked){
      validByLaw.querySelector('input').click();
    }
  }else if(recipientType.value === otherValue){
    validByLawInput.style.pointerEvents = 'auto';
    validByDateInput.style.pointerEvents = 'none';
    validByLaw.hidden = true; 
    validByDate.hidden = false;
    if(!validByDate.querySelector('input').checked){
      validByDate.querySelector('input').click();
    }
  }else{
    validByLawInput.style.pointerEvents = 'auto';
    validByDateInput.style.pointerEvents = 'auto';
    validByLaw.hidden = false; 
    validByDate.hidden = false;
  }
  fillValidDates();
}
  
//ROI Valid Update
function fillValidDates(){
  const oneYearInDays = 365;
  let date = new Date();
  let laterDate = new Date(date);
  laterDate.setDate(date.getDate() + oneYearInDays);
  let today = (date.getMonth() + 1) + '/' + date.getDate().toString().padStart(2, 0) + '/' + date.getFullYear().toString();
  let yearLater =  (laterDate.getMonth() + 1) + '/' + laterDate.getDate().toString().padStart(2, 0) + '/' + laterDate.getFullYear().toString();
  
  let startDate = document.querySelector('#validDateStart').closest('table').querySelector('input');
  let endDate = document.querySelector('#validDateEnd').closest('table').querySelector('input');
  
  if(document.querySelector('#validByDate').closest('tr').querySelector('input').checked){
    if(startDate.value === ''){
      startDate.value = today;
    }
    if(endDate.value === ''){
      endDate.value = yearLater;
    }
  }else if(!document.querySelector('#validByDate').closest('tr').querySelector('input').checked){
    startDate.value = '';
    endDate.value = '';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  fillValidDates();
  [...document.querySelectorAll('.validOptions')].forEach((validOption) => {
    validOption.addEventListener('change', fillValidDates);
    validOption.addEventListener('mouseleave', fillValidDates);
  });
  
  restrictValidDates();
  document.querySelector('#recipientSenderType').closest('table').querySelector('select').addEventListener('change', restrictValidDates);
  document.querySelector('#recipientSenderType').closest('table').querySelector('select').addEventListener('mouseleave', restrictValidDates);
});

document.addEventListener('DOMContentLoaded', () => {
  //checkFormState.apply(null, ['releaseType', 'recipientSenderType']);    
  checkFormState();
});