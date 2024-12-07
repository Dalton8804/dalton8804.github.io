function load(key) {
  const headerElement = document.getElementById('main-header');
  const contentElement = document.getElementById('main-content');
  headerElement.innerText = key == 'home' ? 'dalton avery' : key;
  fetch(`resources/${key}.md`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`could not load ${key}`);
      }
      return response.text();
    })
    .then(markdown => {
      contentElement.innerHTML = marked.parse(markdown);
    })
    .catch(error => {
      contentElement.innerHTML = `<p>Error: ${error.message}</p>`;
    });

    // close mobile menu if on mobile
    if (mobileMenuIcon.innerText == 'x')
      burgerTog();
}

function burgerTog() {
  if (mobileMenuIcon.innerText == 'x') {
    mobileMenuIcon.innerText = '≡';
    mobMenu.style.display = 'none';
    themeIcon.style.display = 'block';
  } else {
    mobileMenuIcon.innerText = 'x';
    mobMenu.style.display = 'block';
    themeIcon.style.display = 'none';
  }
}

function themeTog() {
  if (themeIcon.innerText == '☀︎') {
    themeIcon.innerText = '⏾';
    root.style.setProperty('--foreground-color', '0,0,0');
    root.style.setProperty('--background-color', '255,255,255');
  } else {
    themeIcon.innerText = '☀︎';
    root.style.setProperty('--foreground-color', '255,255,255');
    root.style.setProperty('--background-color', '0,0,0');
  }
}

function bodyToggle(sw) {
  const bodyMain = document.getElementById("bodyMain");
  const exitFishPlay = document.getElementById("exit-fish-play");
  if (sw === 'off') {
    exitFishPlay.style.display = "block";
    bodyMain.style.display = "none";
    playingWithFish = true;
  } else if (sw === 'on') {
    exitFishPlay.style.display = "none";
    bodyMain.style.display = "flex";
    playingWithFish = false;
  }
  
}

const mobMenu = document.getElementById("mobile-menu");
const mobileMenuIcon = document.getElementById("mobile-menu-icon");
const themeIcon = document.getElementById("theme-toggle");
const root = document.querySelector(':root');

playingWithFish = false;

onresize = () => {
  if (window.innerWidth > 768) {
    mobMenu.style.display = 'none';
    mobileMenuIcon.innerText = '≡'
  } 
} 

load('home');