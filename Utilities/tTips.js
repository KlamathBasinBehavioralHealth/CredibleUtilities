let tTipStyle = null;
let tTipStyleSheet = null;

$('document').ready(function () {
    tTipStyle = '.tTip{ position: relative; cursor: pointer; } .tTipText{ position: absolute; text-align: center; left: 50%; top: 0; transform: translateX(-50%); background-color: black; color: white; white-space: nowrap; padding: 10px 15px; border-radius: 7px; visibility: hidden; opacity: 0; transition: opacity 0.5s ease; } .tTipText::before{ content: \'\'; position: absolute; left: 1%; transform: translateX(-100%); border: 7.5px solid; border-color: #0000 #000 #0000 #0000; } .tTip:hover .tTipText{ left: 50%; visibility: visible; opacity: 1; }';

    tTipStyleSheet = document.createElement('style'); 
    tTipStyleSheet.innerText = tTipStyle; 
    document.head.appendChild(tTipStyleSheet);
});