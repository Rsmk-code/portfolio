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
    });
});

// document.addEventListener('visibilitychange',
//     function () {
//         if (document.visibilityState === "visible") {
//             document.title = "Projects | Portfolio Ramin smk";
//             $("#favicon").attr("href", "/assets/images/favicon.png");
//         }
//         else {
//             document.title = "Come Back To Portfolio";
//             $("#favicon").attr("href", "/assets/images/favhand.png");
//         }
//     });


// fetch projects start
// Function to fetch data from the JSON file
function fetchBlogData() {
  return fetch("blogData.json")
    .then((response) => response.json())
    .then((data) => {
      return data.posts;
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}

// Function to display blog posts in the provided HTML structure
function displayBlogPosts(posts) {
  const blogContainer = document.querySelector(".blog_s");

  posts.forEach((post) => {
    // Extract the first 50 characters of the content
    const first150Chars = post.content.substring(0, 150);
    
    const postHTML = `
      <div class="card">
        <div class="card__header">
          <img src="${post.imageSrc}" alt="card__image" class="card__image" width="600">
        </div>
        <div class="card__body">
          <h4>${post.title}</h4>
          <p>${first150Chars}...</p> <!-- Display the first 50 characters of content -->
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

// Fetch data and display it in the HTML
fetchBlogData()
  .then((posts) => {
    displayBlogPosts(posts);
  });
  
// fetch projects end

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