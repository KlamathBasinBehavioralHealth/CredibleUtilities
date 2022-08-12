function letMeIn(){
    $('#passcode').prop('disabled', false);
    $('#signAndSubmitButton').prop('disabled', false);
    requiredFormFields = [];
    $("#signAndSubmitButton").on("click", SignAndSubmit);
}

letMeIn();