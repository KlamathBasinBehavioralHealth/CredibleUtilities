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
    function waitForElementInterval (target, interval = 500){
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

(async function() {
  console.log('Let\'s do this.')
  const leftFrame = await waitForIt(findFrameByName(window, "left"));
  console.log("Left frame found:", leftFrame);
})();