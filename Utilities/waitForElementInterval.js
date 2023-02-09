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