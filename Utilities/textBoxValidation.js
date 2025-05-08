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
        });
		// This makes sure that no special characters allowed (only numbers and letters)
		[...document.querySelectorAll('.noSpecialChar')].forEach(txtbox => {
			txtbox.closest('tr').nextElementSibling.querySelector('input').addEventListener('input', function() {
				const specialCharRegex = /[^a-zA-Z0-9\s]/g;
				this.value = this.value.replace(specialCharRegex, '');
				console.log('no special characters allowed');
			});
		});
});