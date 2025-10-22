async function waitForElement(context, selector) {
	return new Promise((resolve, reject) => {
        let el = context?.querySelector(selector);
        if (el) {
            resolve(el);
        }
        new MutationObserver((mutationRecords, observer) => {
            const element = context?.querySelector(selector);
            if (element) {
                resolve(element);
                observer.disconnect();
            }
        })
        .observe(context?.documentElement, {
            childList: true,
            subtree: true
        });
	});
}

async function waitForDelete(context, selector) {
	return new Promise((resolve, reject) => {
        let el = context?.querySelector(selector);
        if (!el) {
            resolve(el);
        }
        new MutationObserver((mutationRecords, observer) => {
            const element = context?.querySelector(selector);
            if (!element) {
                resolve(element);
                observer.disconnect();
            }
        })
        .observe(context.documentElement, {
            childList: true,
            subtree: true
        });
	});
}

// Wait for complete button

waitForElement(document, 'input[name=\'Complete\']').then(() => {

});