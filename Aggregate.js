if (typeof findFrameByName !== "function"){
  try{
    function findFrameByName(win, targetName) {
      // Check current frame
      if (win.name === targetName) {
        return win;
      }
    
      // Search child frames
      for (let i = 0; i < win.frames.length; i++) {
        try {
          const found = findFrameByName(win.frames[i], targetName);
          if (found) {
            return found; // ✅ Return immediately if found
          }
        } catch (e) {
          // Cross-origin frame; skip
          continue;
        }
      }
    
      // Not found in this branch
      return null;
    }
  }catch(error){

  }
}

if (typeof waitForIt !== "function"){
  try{
    function waitForIt (target, interval = 500){
      return new Promise((resolve) => {
        let currentInterval = setInterval(function(){
            if(target?.length){
              clearInterval(currentInterval);
              resolve(`${target} exists.`);
            }
        }, interval);
      });
    }
  }catch(error){

  }
}

function waitForFrame(win, targetName, interval = 100, timeout = 5000) {
  return new Promise((resolve, reject) => {
    const start = Date.now();

    const check = () => {
      const leftFrame = findFrameByName(win, targetName);

      if (leftFrame) {
        resolve(leftFrame);
      } else if (Date.now() - start >= timeout) {
        reject(new Error(`Frame "${targetName}" not found within ${timeout}ms`));
      } else {
        setTimeout(check, interval);
      }
    };

    check();
  });
}

// ✅ Async/await usage
async function getLeftFrame() {
  try {
    const leftFrame = await waitForFrame(window.top, "left");
    console.log("✅ Found left frame:", leftFrame);
    return leftFrame;
  } catch (err) {
    console.error("❌", err.message);
    return null;
  }
}

var left = undefined;
var allCategories = undefined;
var uniqueCategories = undefined;
var originalLinks = undefined;
var aggregateCategoryID = undefined;
var aggregateClientID = undefined;
var aggregateTempVisitID = undefined;
const linkPart1 = '/webforms/category.asp?category_id=';
const linkPart2 = '&client_id=';
const linkPart3 = '&visittemp_id=';

(async () => {
  left = await getLeftFrame();
  if (left) {
    alert('Found left frame.');
    
    aggregateCategoryID = document.querySelector('[name=category_id]').value;
    aggregateClientID = left.document.querySelector('#client_id').value;
    aggregateTempVisitID = left.document.querySelector('#visittemp_ids').value;

    allCategories = left.document.querySelectorAll('[category_id]');

    uniqueCategories = [...new Set(Array.from(allCategories).map(el => el.getAttribute('category_id')))]; 
    
    originalLinks = Array(uniqueCategories.length);

    //Add IDs to links and save the links
    for(let count = 1; count < uniqueCategories.length; count++){
      left.document.querySelector(`[href*=\'${uniqueCategories[count]}\']`).setAttribute('id', `link${count}`);
      originalLinks[count] = left.document.querySelector(`#link${count}`).getAttribute('href');
    }

  }
})();

//left.document.querySelector(`[href*=\'${aggregateCategoryID}\']`).setAttribute('href', `${linkPart1}${aggregateCategoryID}${linkPart2}${aggregateClientID}${linkPart3}${aggregateTempVisitID}`);