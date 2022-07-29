function responsiveNavHeight(){
  const navElement = document.querySelector('#nav');
  const listHidden = document.querySelector('#navList').hidden;
  if (window.innerHeight < 436 && !listHidden){
    navElement.style.height = '100vh';
    navElement.style.overflow = 'scroll';
  }
  else{
    navElement.style.height = 'auto';
    navElement.style.overflow = 'hidden';
  }
}

window.onresize = responsiveNavHeight;
 
 function buildNavList(titleSelector) {
  const frames = document.querySelectorAll(".frameContainer iframe");
  const tmpList = document.createElement("ul");
  const btnLi = document.createElement("li");
  const closeAllBtn = document.createElement('button');

  frames.forEach((frame) => {
    const tmpA = document.createElement("a");
		tmpA.id = frame.id + 'Link';
    tmpA.className = "navLink";
    tmpA.href = "#" + frame.id;

    const tmpLi = document.createElement("li");
    tmpLi.className = "navItem";

		tmpLi.onclick = (e) => {
			const tmpSelector = '#' + e.target.parentElement.id.replace('Link', '');
			const hidden = document.querySelector(tmpSelector).contentWindow.document.querySelector('#questions_container').hidden;
			if (hidden){
				document.querySelector(tmpSelector).contentWindow.document.querySelector('.toolHead').click();
			}
		};

    const title = frame.contentWindow.document.querySelector(titleSelector).textContent;

    tmpLi.textContent = title;
    tmpA.appendChild(tmpLi);
    tmpList.appendChild(tmpA);
  });

  closeAllBtn.id = 'navCloseAll';
  closeAllBtn.textContent = 'Collapse All';
  closeAllBtn.onclick = () => {
    frames.forEach(iframe => {
      const hidden = iframe.contentWindow.document.querySelector('#questions_container').hidden;
      if (!hidden){
				iframe.contentWindow.document.querySelector('.toolHead').click();
			}
    });
  };

  btnLi.className = 'navItem';
  btnLi.appendChild(closeAllBtn);
  tmpList.appendChild(btnLi);

  return tmpList;
}

function buildNavButton() {
  const tmpBtn = document.createElement("button");
  tmpBtn.id = "navButton";
  tmpBtn.textContent = "Show";

  tmpBtn.onclick = (e) => {
    const navElement = document.querySelector('#nav');
    if (document.querySelector("#navList").hidden) {
      e.target.textContent = "Hide";
      e.target.style.background = '#bb0000';
      document.querySelector("#navList").hidden = false;
      responsiveNavHeight();
    } else {
      e.target.textContent = "Show";
      e.target.style.background = '#108800';
      document.querySelector("#navList").hidden = true;
      navElement.style.height = 'auto';
      navElement.style.overflow = 'hidden';
    }
  };

  return tmpBtn;
}

function deployNav(titleSelector, parent) {
  const nav = document.createElement("nav");
  const navTop = document.createElement("div");
  const navTitle = document.createElement("h1");
  const navButton = buildNavButton();
  const navList = buildNavList(titleSelector);

  nav.id = 'nav';

  navTitle.id = "navTitle";
  navTitle.textContent = "Menu";

  navTop.id = 'navTop';

  navList.id = "navList";
  navList.hidden = true;

  navTop.appendChild(navTitle);
  navTop.appendChild(navButton);
  nav.appendChild(navTop);
  nav.appendChild(navList);

  document.querySelector(parent).appendChild(nav);
}
