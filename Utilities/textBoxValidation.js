/*
HOW TO USE:
1. add the class of validEmail and/or noSpecialChar and/or addressOne depending on which one you want to use.
2. add <Text Box Validator> <script type='text/javascript' src='https://cdn.jsdelivr.net/gh/KlamathBasinBehavioralHealth/CredibleUtilities@da34423/Utilities/textBoxValidation.js'></script> as a no label checkbox. Ensure the @da34423 matches the most recent version.
3. done.
*/


// Function to check emails
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if(emailRegex.test(email)){
	console.log('Valid Email');
  } else {
	alert("Please Ensure A Valid Email");
  }
  return(emailRegex.test(email));
}

// Add these event listers to the specific text boxes that have the respective classes
document.addEventListener('DOMContentLoaded', () => {
	[...document.querySelectorAll('.validEmail')].forEach(txtbox => {
		txtbox.closest('tr').nextElementSibling.querySelector('input').addEventListener('change', function(){
			isValidEmail(this.value);
		});
		/* Commenting this mouse leave out. It acts odd since it triggers a second alert of the first change event happens and an alert popped up. Causes 2 alerts if the first alert happens.
		txtbox.closest('tr').nextElementSibling.querySelector('input').addEventListener('mouseleave', function() {
			console.log("Mouse left the input field");
			let delayedString1 = this.value;
			let inputField = this;
			setTimeout(function() {
				let delayedString2 = inputField.value;
				if (delayedString1 === delayedString2) {
					isValidEmail(inputField.value);
				}
			}, 1000);
		});
                */
		// Make it so the email box can't even have spaces.
		txtbox.closest('tr').nextElementSibling.querySelector('input').addEventListener('input', function() {
			const spaceRegex = /\s/g;
			this.value = this.value.replace(spaceRegex, '');	
			console.log('no spaces allowed');
		});
	});
	// This makes sure that no special characters allowed (only numbers and letters)
	[...document.querySelectorAll('.noSpecialChar')].forEach(txtbox => {
		txtbox.closest('tr').nextElementSibling.querySelector('input').addEventListener('input', function() {
			const specialCharRegex = /[^a-zA-Z0-9\s]/g;
			this.value = this.value.replace(specialCharRegex, '');
			console.log('no special characters allowed');
		});
	});
	// This alerts if it is missing an address suffix.
	[...document.querySelectorAll('.addressOne')].forEach(txtbox => {
		txtbox.closest('tr').nextElementSibling.querySelector('input').addEventListener('change', function () {
			const suffixRegex = /\b(?:Street|St|Avenue|Ave|Boulevard|Blvd|Road|Rd|Lane|Ln|Drive|Dr|Court|Ct|Terrace|Ter|Place|Pl|Square|Sq|Loop|Parkway|Pkwy|Trail|Trl|Highway|Hwy|Way|Circle|Cir|Alley|Aly|Crescent|Cres|Point|Pt|Row)\b$/i;
			if (!suffixRegex.test(this.value.trim())) {
				alert('Warning: Address must end with a valid street suffix. (e.g., St, Ave, Blvd)');
			} else {
				console.log('Valid address suffix detected.');
			}
		});
	});
});
