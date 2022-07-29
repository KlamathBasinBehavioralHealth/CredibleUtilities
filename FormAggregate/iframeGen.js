const sudRefList = {
	initialInformation: 'https://www.cbh3.crediblebh.com/webforms/questions.asp?category_id=132855',
	dimension1: 'https://www.cbh3.crediblebh.com/webforms/questions.asp?category_id=132856',
	dimension2: 'https://www.cbh3.crediblebh.com/webforms/questions.asp?category_id=132857',
	dimension3: 'https://www.cbh3.crediblebh.com/webforms/questions.asp?category_id=132858',
	dimension4: 'https://www.cbh3.crediblebh.com/webforms/questions.asp?category_id=132859',
	dimension5: 'https://www.cbh3.crediblebh.com/webforms/questions.asp?category_id=132860',
	dimension6: 'https://www.cbh3.crediblebh.com/webforms/questions.asp?category_id=132861', 
	diagnosis_TreatmentPlan: 'https://www.cbh3.crediblebh.com/webforms/questions.asp?category_id=132862', 
	dimensionalSummary: 'https://www.cbh3.crediblebh.com/webforms/questions.asp?category_id=132863',
	informedConsent: 'https://www.cbh3.crediblebh.com/webforms/questions.asp?category_id=132864'
};

let refList = {};

function findLinkFromText(text, documentContext, resultIndex=0) {
	const elements = Array.from(documentContext.getElementsByTagName('a'));
	return elements.filter(element => element.innerHTML == text)[resultIndex];
}

function camelCase(str) {
	const capitalLetterAfterSpace = (word, index) => index == 0 ? word.toLowerCase() : word.toUpperCase();
	return str.toLowerCase().replace(/(?:^\w|[A-Z]|\b\w)/g, capitalLetterAfterSpace).replace(/\s+/g, '').replace(/[&\/\\#,+()$~%.:*?<>{}]/g, '_');
}

function buildHrefList(folderText, documentContext) {
	findLinkFromText(folderText, documentContext).parentElement.querySelectorAll('a.form_yellow').forEach(link => {
		const cleanedLinkName = camelCase(link.innerHTML);
		refList[cleanedLinkName] = link.href;
	});
}


async function generateIframes(parent, env = 'test', folderText = '', documentContext = document, testRefList = sudRefList) {
	const parentEl = document.querySelector(parent);
	const parentFirst = parentEl.firstChild;
	if (env == 'live') {
		buildHrefList(folderText, documentContext);
	}
	else if ('test') {
		refList = testRefList;
	}
	const promises = Object.keys(refList).map(ref => {
		return new Promise((resolve, reject) => {
			let tmpDiv = document.createElement('div');
			tmpDiv.className = 'frameContainer';

			let tmpFrame = document.createElement('iframe');
			tmpFrame.id = ref;
			tmpFrame.name = ref;
			tmpFrame.className = 'frame';
			tmpFrame.src = refList[ref];
			tmpFrame.frameBorder = 0;
			tmpDiv.appendChild(tmpFrame);
			parentEl.insertBefore(tmpDiv, parentFirst);
			tmpFrame.onload = resolve;
		});
	});

	return Promise.all(promises);
}


async function waitForElement(context, selector) {
	return new Promise((resolve, reject) => {
	let el = context.querySelector(selector);
	if (el) {
		resolve(el);
	}
	  new MutationObserver((mutationRecords, observer) => {
		const element = context.querySelector(selector);
		if (element) {
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

/* Adding subforms in generateIframes() live mode */

waitForElement(parent.document, 'frame[name=\'left\']').then(navFrame => {
	generateIframes('#questions_container', 'live', 'SUD/DUII Subforms', navFrame.contentWindow.document);
});


/* generateIframes test mode */
generateIframes('#questions_container');