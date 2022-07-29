document.body.onload = () => {
    waitForElement(parent.document, 'frame[name=\'left\']').then(navFrame => { 
        generateIframes('#questions_container', 'live', 'SUD/DUII Subforms', navFrame.contentWindow.document).then(() => {
            addHeaderScriptToAll();
            addHeaderFuncToAll();
            setFrameHeightEvents();
            hideSubforms(parent.document.querySelector('frame[name=\'left\']').contentDocument, 'SUD/DUII Subforms', false);
            setHref(parent.document.querySelector('frame[name=\'left\']').contentDocument, 'TIC EVAL', false);
            setLinks(parent.document.querySelector('frame[name=\'left\']').contentDocument, 'SUD/DUII Subforms');
            createSubmitButtons();
            hideSubCompletes();
            deployInlineValidation();
        });
    });
};
