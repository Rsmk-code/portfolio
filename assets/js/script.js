$(document).ready(function () {

    $('#menu').click(function () {
        $(this).toggleClass('fa-times');
        $('.navbar').toggleClass('nav-toggle');
    });

    $(window).on('scroll load', function () {
        $('#menu').removeClass('fa-times');
        $('.navbar').removeClass('nav-toggle');

        if (window.scrollY > 60) {
            document.querySelector('#scroll-top').classList.add('active');
        } else {
            document.querySelector('#scroll-top').classList.remove('active');
        }

        // scroll spy
        $('section').each(function () {
            let height = $(this).height();
            let offset = $(this).offset().top - 200;
            let top = $(window).scrollTop();
            let id = $(this).attr('id');

            if (top > offset && top < offset + height) {
                $('.navbar ul li a').removeClass('active');
                $('.navbar').find(`[href="#${id}"]`).addClass('active');
            }
        });
    });

    // smooth scrolling
    $('a[href*="#"]').on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top,
        }, 500, 'linear')
    });

    // <!-- emailjs to mail contact form data -->
    $("#contact-form").submit(function (event) {
        emailjs.init("SLMljUDGEwd2RGx5r");
        
        emailjs.sendForm('service_wmm8zjn', 'template_su7q2g1', '#contact-form')
            .then(function (response) {
                console.log('SUCCESS!', response.status, response.text);
                document.getElementById("contact-form").reset();
                alert("Form Submitted Successfully");
            }, function (error) {
                console.log('FAILED...', error);
                alert("Form Submission Failed! Try Again");
            });
        event.preventDefault();
    });
    // <!-- emailjs to mail contact form data -->

});

// document.addEventListener('visibilitychange',
//     function () {
//         if (document.visibilityState === "visible") {
//             document.title = "Portfolio | Jigar Sable";
//             $("#favicon").attr("href", "assets/images/favicon.png");
//         }
//         else {
//             document.title = "Come Back To Portfolio";
//             $("#favicon").attr("href", "assets/images/favhand.png");
//         }
//     });


// <!-- typed js effect starts -->
var typed = new Typed(".typing-text", {
    strings: ["backend development", "web development"],
    loop: true,
    typeSpeed: 50,
    backSpeed: 25,
    backDelay: 500,
});
// <!-- typed js effect ends -->

async function fetchData(type = "skills") {
    let response
    type === "skills" ?
        response = await fetch("skills.json")
        :
        response = await fetch("./projects/projects.json")
    const data = await response.json();
    return data;
}

function showSkills(skills) {
    let skillsContainer = document.getElementById("skillsContainer");
    let skillHTML = "";
    skills.forEach(skill => {
        skillHTML += `
        <div class="bar">
              <div class="info">
                <img src=${skill.icon} alt="skill" />
                <span>${skill.name}</span>
              </div>
            </div>`
    });
    skillsContainer.innerHTML = skillHTML;
}

function showProjects(projects) {
    let projectsContainer = document.querySelector("#work .box-container");
    let projectHTML = "";
    projects.slice(0, 10).filter(project => project.category != "android").forEach(project => {
        projectHTML += `
        <div class="box tilt">
      <img draggable="false" src="/assets/images/projects/${project.image}.png" alt="project" />
      <div class="content">
        <div class="tag">
        <h3>${project.name}</h3>
        </div>
        <div class="desc">
          <p>${project.desc}</p>
          <div class="btns">
            <a href="${project.links.view}" class="btn" target="_blank"><i class="fas fa-eye"></i> View</a>
            <a href="${project.links.code}" class="btn" target="_blank">Code <i class="fas fa-code"></i></a>
          </div>
        </div>
      </div>
    </div>`
    });
    projectsContainer.innerHTML = projectHTML;

    // <!-- tilt js effect starts -->
    VanillaTilt.init(document.querySelectorAll(".tilt"), {
        max: 15,
    });
    // <!-- tilt js effect ends -->

    /* ===== SCROLL REVEAL ANIMATION ===== */
    const srtop = ScrollReveal({
        origin: 'top',
        distance: '80px',
        duration: 1000,
        reset: true
    });

    /* SCROLL PROJECTS */
    srtop.reveal('.work .box', { interval: 200 });

}

fetchData().then(data => {
    showSkills(data);
});

fetchData("projects").then(data => {
    showProjects(data);
});

// <!-- tilt js effect starts -->
VanillaTilt.init(document.querySelectorAll(".tilt"), {
    max: 15,
});
// <!-- tilt js effect ends -->

// blog section starts

document.addEventListener("DOMContentLoaded", () => {
  function fetchLimitedBlogData(limit) {
    return fetch("./blog/blogData.json")
      .then((response) => response.json())
      .then((data) => data.posts.slice(0, limit))
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

  const CardContainer = document.querySelector(".CardContainer");
  const cards = document.querySelector(".cards");

  let isPressedDown = false;
  let cursorXSpace;
  let touchStartX;
  let currentIndex = 0;
  const limit = 16;

  function displayLimitedBlogPosts(posts) {
    const blogContainer = document.querySelector(".cards");
    blogContainer.innerHTML = ''; // Clear existing posts

    posts.forEach((post) => {
      const first120Chars = post.content.substring(0, 120);

    const postHTML = `
        <div class="card">
            <div class="card__header">
                <img src="${post.imageSrc}" alt="card__image" class="card__image" width="600">
            </div>
            <div class="card__body">
                <h4>${post.title}</h4>
                <p>${first120Chars}...</p>
            </div>
            <div class="card__footer">
                <div class="user">
                    <img src="${post.author.avatarSrc}" alt="user__image" class="user__image">
                    <div class="user__info">
                        <h5>${post.author.name}</h5>
                        <small>${post.author.timestamp}</small>
                    </div>
                </div>
            </div>
        </div>
    `;

    blogContainer.innerHTML += postHTML;
});
}

CardContainer.addEventListener("mousedown", (e) => {
  isPressedDown = true;
  cursorXSpace = e.clientX - cards.getBoundingClientRect().left;
  CardContainer.style.cursor = "grabbing";
});

CardContainer.addEventListener("mouseup", () => {
  isPressedDown = false;
  CardContainer.style.cursor = "grab";
});

window.addEventListener("mouseup", () => {
  isPressedDown = false;
  CardContainer.style.cursor = "grab";
});

CardContainer.addEventListener("mousemove", (e) => {
  if (!isPressedDown) return;
  e.preventDefault();
  cards.style.left = `${e.clientX - cursorXSpace}px`;
  boundCards();
});

CardContainer.addEventListener("touchstart", (e) => {
  touchStartX = e.touches[0].clientX;
  CardContainer.style.cursor = "grabbing";
  console.log("Touch Start X: " + touchStartX);
}, { passive: true });

CardContainer.addEventListener("touchmove", (e) => {
  e.preventDefault();
  touchEndX = e.touches[0].clientX;
  const offsetX = touchEndX - touchStartX;
  cards.style.left = `${parseInt(cards.style.left) + offsetX}px`;
  touchStartX = touchEndX;
  boundCards();
  console.log("Touch Move X: " + touchEndX);
}, { passive: false });

CardContainer.addEventListener("touchend", () => {
  CardContainer.style.cursor = "grab";
  console.log("Touch End");
});
function slideCards(direction) {
  const cardWidth = cards.querySelector(".card").offsetWidth;
  const offset = direction === "left" ? cardWidth : -cardWidth;

  cards.style.left = `${parseInt(cards.style.left) + offset}px`;

  currentIndex = direction === "left" ? (currentIndex + 1) % limit : (currentIndex - 1 + limit) % limit;

  boundCards();
}

const leftButton = document.getElementById("leftButton");
const rightButton = document.getElementById("rightButton");

leftButton.addEventListener("click", () => {
  slideCards("left");
});

rightButton.addEventListener("click", () => {
  slideCards("right");
});

function boundCards() {
  const containerRect = CardContainer.getBoundingClientRect();
  const cardsRect = cards.getBoundingClientRect();

  if (cardsRect.left > containerRect.left) {
    cards.style.left = 0;
  } else if (cardsRect.right < containerRect.right) {
    cards.style.left = `${containerRect.right - cardsRect.width}px`;
  }
}

fetchLimitedBlogData(limit).then((posts) => {
  displayLimitedBlogPosts(posts);
});
});
 // blog section ends 

// pre loader start
function loader() {
    document.querySelector('.loader-container').classList.add('fade-out');
}
function fadeOut() {
    setTimeout(loader, 500); 
}
window.onload = fadeOut;
// pre loader end.


// disable developer mode
document.onkeydown = function (e) {
    if (e.keyCode == 123) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) {
        return false;
    }
}

// Start of Tawk.to Live Chat
var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
(function () {
    var s1 = document.createElement("script"), s0 = document.getElementsByTagName("script")[0];
    s1.async = true;
    s1.src = 'https://embed.tawk.to/64f6351fa91e863a5c119dcc/1h9grv0u6';
    s1.charset = 'UTF-8';
    s1.setAttribute('crossorigin', '*');
    s0.parentNode.insertBefore(s1, s0);
})();
// End of Tawk.to Live Chat


/* ===== SCROLL REVEAL ANIMATION ===== */
const srtop = ScrollReveal({
    origin: 'top',
    distance: '80px',
    duration: 1000,
    reset: true
});

/* SCROLL HOME */
srtop.reveal('.home .content h3', { delay: 200 });
srtop.reveal('.home .content p', { delay: 200 });
srtop.reveal('.home .content .btn', { delay: 200 });

srtop.reveal('.home .image', { delay: 400 });
srtop.reveal('.home .linkedin', { interval: 600 });
srtop.reveal('.home .github', { interval: 800 });
srtop.reveal('.home .twitter', { interval: 1000 });
srtop.reveal('.home .telegram', { interval: 600 });
srtop.reveal('.home .instagram', { interval: 600 });
srtop.reveal('.home .dev', { interval: 600 });

/* SCROLL ABOUT */
srtop.reveal('.about .content h3', { delay: 200 });
srtop.reveal('.about .content .tag', { delay: 200 });
srtop.reveal('.about .content p', { delay: 200 });
srtop.reveal('.about .content .box-container', { delay: 200 });
srtop.reveal('.about .content .resumebtn', { delay: 200 });


/* SCROLL SKILLS */
srtop.reveal('.skills .container', { interval: 200 });
srtop.reveal('.skills .container .bar', { delay: 400 });

/* SCROLL EDUCATION */
srtop.reveal('.education .box', { interval: 200 });

/* SCROLL PROJECTS */
srtop.reveal('.work .box', { interval: 200 });

/* SCROLL EXPERIENCE */
srtop.reveal('.experience .timeline', { delay: 400 });
srtop.reveal('.experience .timeline .container', { interval: 400 });

/* SCROLL CONTACT */
srtop.reveal('.contact .container', { delay: 400 });
srtop.reveal('.contact .container .form-group', { delay: 400 });