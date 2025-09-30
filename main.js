const typed = new Typed('#typed-name', {
  strings: ["Tonghie", "CJ"],
  typeSpeed: 100,
  backSpeed: 50,
  backDelay: 1000,
  showCursor: true,
  cursorChar: '|',
  loop: true
});

const swiper = new Swiper('.swiper', {
    loop: true,
    spaceBetween: 20,
    centeredSlides: true,
    effect: 'coverflow',
    grabCursor: true,
    slidesPerView: 1,
    coverflowEffect: {
      rotate: 10,
      stretch: 0,
      depth: 200,
      modifier: 1,
      slideShadows: false,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
  });

document.addEventListener("DOMContentLoaded", function() {
  const form = document.getElementById("feedback-form");
  const sendButton = form.querySelector("button[type='submit']");

  emailjs.init("4uCGVPBz3H1dGhGwQ"); // Replace with your public key

  form.addEventListener("submit", function(e) {
    e.preventDefault();

    // Disable the button to prevent multiple clicks
    sendButton.disabled = true;
    sendButton.innerText = "Sending...";

    emailjs.sendForm(
      "service_mqqndw9",       // Your Service ID
      "template_et2og3p",      // Your Template ID
      form
    )
    .then(() => {
      alert("Feedback sent! Thank you.");
      form.reset();
      sendButton.disabled = false;
      sendButton.innerText = "Send";
    }, (error) => {
      console.error("FAILED...", error);
      alert("Oops! Something went wrong.");
      sendButton.disabled = false;
      sendButton.innerText = "Send";
    });
  });
});