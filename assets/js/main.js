/*==================== SHOW MENU ====================*/
const showMenu = (toggleId, navId) => {
  const toggle = document.getElementById(toggleId);
  const nav = document.getElementById(navId);
  //   Validation
  if (toggle) {
    toggle.addEventListener('click', () => {
      nav.classList.toggle('show-menu');
    });
  }
};

showMenu('nav-toggle', 'nav-menu');

/*==================== REMOVE MENU MOBILE ====================*/
const navLinks = document.querySelectorAll('.nav__link');

const linkAction = () => {
  const navMenu = document.getElementById('nav-menu');

  navMenu.classList.remove('show-menu');
};

navLinks.forEach((navLink) => navLink.addEventListener('click', linkAction));
/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]');

const scrollActive = () => {
  const scrollY = window.pageYOffset;

  sections.forEach((section) => {
    const sectionHeight = section.offsetHeight,
      sectionTop = section.offsetTop - 50,
      sectionId = section.getAttribute('id'),
      sectionClass = document.querySelector(
        '.nav__menu a[href*=' + sectionId + ']'
      );

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      sectionClass.classList.add('active-link');
    } else {
      sectionClass.classList.remove('active-link');
    }
  });
};

/*==================== SHOW SCROLL TOP ====================*/
const scrollTop = () => {
  const scrollTop = document.getElementById('scroll-top');
  if (this.scrollY >= 560) scrollTop.classList.add('show-scroll');
  else scrollTop.classList.remove('show-scroll');
};

window.addEventListener('scroll', scrollTop);
/*==================== DARK LIGHT THEME ====================*/
const themeButton = document.getElementById('theme-button');
const darkTheme = 'dark-theme';
const iconTheme = 'bx-sun';

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme');
const selectedIcon = localStorage.getItem('selected-icon');

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () =>
  document.body.classList.contains(darkTheme) ? 'dark' : 'light';

const getCurrentIcon = () =>
  themeButton.classList.contains(iconTheme) ? 'bx-moon' : 'bx-sun';

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](
    darkTheme
  );
  themeButton.classList[selectedIcon === 'bx-moon' ? 'add' : 'remove'](
    iconTheme
  );
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
  document.body.classList.toggle(darkTheme);
  themeButton.classList.toggle(iconTheme);

  localStorage.setItem('selectedTheme', getCurrentTheme());
  localStorage.setItem('selectedIcon', getCurrentIcon());
});
/*==================== REDUCE THE SIZE AND PRINT ON AN A4 SHEET ====================*/
const scaleCV = () => {
  document.body.classList.add('scale-cv');
};

/*==================== REMOVE THE SIZE WHEN THE CV IS DOWNLOADED ====================*/
const removeScale = () => {
  document.body.classList.remove('scale-cv');
};
/*==================== GENERATE PDF ====================*/
// PDF generated area
let areaCv = document.getElementById('area-cv');

let resumeButton = document.getElementById('resume-button');

// Html2pdf options
let opt = {
  margin: 0,
  filename: 'hbaoCV.pdf',
  image: { type: 'jpeg', quality: 0.98 },
  html2canvas: { scale: 8 },
  jsPDF: { format: 'a4', orientation: 'portrait' },
};
// Function to call areaCv and Html2Pdf options
const generateResume = () => {
  html2pdf(areaCv, opt);
};

// When the button is clicked, it executes the three functions
resumeButton.addEventListener('click', () => {
  // 1. The class .scale-cv is added to the body, where it reduces the size of the elements
  scaleCV();
  // 2. The PDF is generated
  generateResume();
  // 3. The .scale-cv class is removed from the body after 5 seconds to return to normal size.
  setTimeout(removeScale, 5000);
});
