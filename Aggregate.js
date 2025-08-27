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
    function waitForIt(checkFn, interval = 500) {
      return new Promise((resolve) => {
        const timer = setInterval(() => {
          const result = typeof checkFn === "function" ? checkFn() : checkFn;
          if (result) {
            clearInterval(timer);
            resolve(result);
          }
        }, interval);
      });
    }
  }catch(error){

  }
}

(async function() {
  console.log('Let\'s do this.')
  const leftFrame = await waitForIt(() => findFrameByName(window, "left"));
  console.log("Left frame found:", leftFrame);
})();