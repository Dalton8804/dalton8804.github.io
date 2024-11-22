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
    root.style.setProperty('--foreground-color', 'black');
    root.style.setProperty('--background-color', 'white');
  } else {
    themeIcon.innerText = '☀︎';
    root.style.setProperty('--foreground-color', 'white');
    root.style.setProperty('--background-color', 'black');
  }
}

const mobMenu = document.getElementById("mobile-menu");
const mobileMenuIcon = document.getElementById("mobile-menu-icon");
const themeIcon = document.getElementById("theme-toggle");
const root = document.querySelector(':root');

onresize = () => {
  if (window.innerWidth > 768) {
    mobMenu.style.display = 'none';
    mobileMenuIcon.innerText = '≡'
  } 
} 

load('home');