console.log("Astra Child Theme JS is running!");

document.addEventListener("DOMContentLoaded", function () {
    initScrollToTop();
    fetchWPPosts();
});

// Scroll to top button //
function initScrollToTop() {
    window.onscroll = function () {
        scrollFunction();
    };
}

function scrollToTheTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

function scrollFunction() {
    if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
        document.getElementById("scrollTop").style.display = "block";
    } else {
        document.getElementById("scrollTop").style.display = "none";
    }
}

// Fetch wp posts //
const url = "http://portfolio.celineholst.dk/wp-json/wp/v2/posts?_embed&categories=4";

function fetchWPPosts() {
fetch(url)
  .then(function (response) {
    return response.json();
  })
  .then(function (posts) {
    console.log(posts);
    appendPosts(posts);
  });
}

// append wp posts to the DOM
function appendPosts(posts) {
  let htmlTemplate = "";
  for (let post of posts) {
    console.log(post);
    htmlTemplate += /*html*/`
      <article>
        <a href="${post.link}">
      <img src="${getFeaturedImageUrl(post)}">
  </a>
      </article>
    `;
  }
  document.querySelector('#posts').innerHTML = htmlTemplate;
}

// get the featured image url
function getFeaturedImageUrl(post) {
  let imageUrl = "";
  if (post._embedded['wp:featuredmedia']) {
    imageUrl = post._embedded['wp:featuredmedia'][0].source_url;
  }
  return imageUrl;
}