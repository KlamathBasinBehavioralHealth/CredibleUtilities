async function submitDLA(){
  const dlaFrame = document.querySelector('#dlaInline');
  if (dlaFrame.contentDocument.querySelector('#oldComplete') != null){
    const complete = dlaFrame.contentDocument.querySelector('#oldComplete');

    return new Promise((resolve, reject) => {
      complete.click();
      dlaFrame.onload = resolve;
    });
  }
}

function hideDLA20(){ findLinkFromText('DLA-20', parent.document.querySelector('frame[name=\'left\']').contentDocument).hidden = true; document.querySelector('#dla-20').hidden = true; }

function inlineDLA(){
  let source;
  if (frameElement != null && frameElement.classList.contains('frame')){
    source = parent.document.querySelector('#dla-20').src;
  }
  else{
    source = parent.findLinkFromText('DLA-20', parent.parent.document.querySelector('frame[name=\'left\']').contentDocument);
  }
  const frame = document.createElement('iframe');
  frame.id = 'dlaInline';
  frame.className = 'frame';
  frame.src = source;
  frame.frameBorder = '0';
  frame.style.width = '100%';
  frame.style.height = '1225px';
  frame.style.marginLeft = '-3.7em';
  frame.style.overflow = 'hidden';
    
  const tr = document.querySelector('#traumaLabel').closest('table').closest('tr').nextElementSibling.nextElementSibling;
  tr.firstChild.appendChild(frame);
    
  document.querySelector('#oldComplete').onclick = (e) => { 
    e.preventDefault();
    submitDLA(document).then(() => {
      document.querySelector('#oldComplete').onclick = null;
      document.querySelector('#oldComplete').click();
    });
  };
    
  frame.contentWindow.onbeforeunload = () => { return null; };
}
