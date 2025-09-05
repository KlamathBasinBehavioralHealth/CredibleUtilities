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

// Example call from right frame
(async () => {
  left = await getLeftFrame();
  if (left) {
    // do something with leftFrame.document
    alert('Found left frame.');
  }
})();

