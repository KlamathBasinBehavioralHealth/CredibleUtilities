function addTTipRules(targetDocument){
    const tTipStyles = `
    .tTip{
        position: relative;
        cursor: pointer;
        zIndex: 99;
      }
  
      .tTipText{
        --color: black; 
        --textColor: white; 
        position: absolute;
        width: fit-content; 
        max-width: 100vw;
        text-align: center;
        left: 50%;
        top: 0;
        transform: translateX(25%);
        background-color: var(--color);
        color: var(--textColor);
        white-space: normal;
        padding: 10px 15px;
        border-radius: 7px;
        visibility: hidden;
        opacity: 0;
        transition: opacity 0.5s ease;
      }
  
      .tTipText::before{
        content: \'\';
        position: absolute;
        left: 0%;
        transform: translateX(-100%);
        border: 7.5px solid;
        border-color: #0000 var(--color) #0000 #0000;
      }
  
      .tTipText li{
        color: var(--textColor); 
      }
  
      .tTip:hover .tTipText{
        left: 50%;
        visibility: visible;
        opacity: 1;
      }
    `;
  
    const styleElement = targetDocument.createElement('style');
    styleElement.textContent = tTipStyles;
    targetDocument.head.appendChild(styleElement);
  }

  function initTTips(targetDocument){
    const tTips = targetDocument.querySelectorAll('.tTip');
    
    tTips.forEach((tTip) => {
      const tTipContent = tTip.getAttribute('tTip');
      let clonedTTip;  
      const customTTip = targetDocument.createElement('div');

      try{
        if(tTipContent.startsWith('#')){
            console.log(document.querySelector(`${tTipContent}`));
            clonedTTip = document.querySelector(`${tTipContent}`).cloneNode(true);
            clonedTTip.removeAttribute('id');
            clonedTTip.removeAttribute('class');
            clonedTTip.classList.add('tTipText');
            clonedTTip.style.zIndex = '99';
            tTip.appendChild(clonedTTip);
        }
        else{
            customTTip.innerHTML = tTipContent;
            if(!tTip.innerHTML.includes(tTipContent)){
                customTTip.classList.add('tTipText');
                tTip.appendChild(customTTip);
            }
        }
      }catch(error){
        console.log(error);
        customTTip.innerHTML = tTipContent;
        if(!tTip.innerHTML.includes(tTipContent)){
            customTTip.classList.add('tTipText');
            tTip.appendChild(customTTip);
        }
      }
    });

    document.querySelectorAll('.externalTTip').forEach((tTip) => {
        tTip.closest('table').closest('tr').style.display = 'none';
        tTip.closest('table').closest('tr').nextSibling.style.display = 'none';
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    console.log('tTips load event.');
    addTTipRules(document);
    initTTips(document);
  });