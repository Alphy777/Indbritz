// Get Current Year
function getCurrentYear() {
    var d = new Date();
    var year = d.getFullYear();
    document.querySelector("#displayDateYear").innerText = year;
}
getCurrentYear()

//client section owl carousel
$(".owl-carousel").owlCarousel({
    loop: true,
    margin: 10,
    nav: true,
    dots: false,
    navText: [
        '<i class="fa fa-long-arrow-left" aria-hidden="true"></i>',
        '<i class="fa fa-long-arrow-right" aria-hidden="true"></i>'
    ],
    autoplay: true,
    autoplayHoverPause: true,
    responsive: {
        0: {
            items: 1
        },
        768: {
            items: 2
        },
        1000: {
            items: 2
        }
    }
});

/** hCaptcha js **/
$(document).ready(function() {

    // Form validation with jQuery Validate plugin
    $("#contact-form").validate({ // Change to your form's ID if different
      rules: {
        Name: {
          required: true
        },
        PhoneNumber: {
            require: true
        },
        MailID: {
          required: true,
          email: true,
        },
        Message: {
          required: true
        }

      },
      messages: {
        Name: {
            required: "Please enter your full name"
          },
          PhoneNumber: {
              require: "Please enter your mobile number"
          },
          MailID: {
            required: "Please enter your maild id",
            email: "Please enter a valid maild",
          },
          Message: {
            required: "Please enter your message"
          }
      },
      highlight: function(element, errorClass, validClass) {
        $(element).css({
          "color": "red",
          "border-color": "red"
        });
        // Highlight the corresponding i tag
        $(element).prevAll('i.cus').css('color', 'red'); // Adjust selector if needed
      },
      unhighlight: function(element, errorClass, validClass) {
        $(element).css({
          "color": "#000",
          "border-color": "#ccc"
        });
        // Reset color of the i tag
        $(element).prevAll('i.cus').css('color', '#000'); // Adjust selector if needed
      }
    });
});

const form = document.getElementById('form');
const result = document.getElementById('result');

form.addEventListener('submit', function(e) {
  e.preventDefault();
  // Validate form fields
  if (!validateForm()) {
    return;
  }
  const formData = new FormData(form);
  const object = Object.fromEntries(formData);
  const json = JSON.stringify(object);
  result.innerHTML = "Please wait...";

  fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: json
  })
  .then(async (response) => {
    let json = await response.json();
    if (response.status == 200) {
      result.innerHTML = json.message;
      result.style.color = "red";
      // Reload the page after successful submission
      setTimeout(() => {
        location.reload();
      }, 3000);
    } else {
      console.log(response);
      result.innerHTML = json.message;
    }
  })
  .catch(error => {
    console.log(error);
    result.innerHTML = "Something went wrong!";
  });
});

function validateForm() {
  const email = document.getElementById('email').value;
  const mobile = document.getElementById('mobile').value;
  // Basic email validation
  if (!isValidEmail(email)) {
    result.innerHTML = "Please enter a valid email address";
    return false;
  }
  // Basic mobile number validation
  if (!isValidMobile(mobile)) {
    result.innerHTML = "Please enter a valid mobile number";
    return false;
  }
  return true;
}

function isValidEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

function isValidMobile(mobile) {
  const regex = /^[0-9]{10}$/;
  return regex.test(mobile);
}

/** google_map js **/

// function myMap() {
//     var mapProp = {
//         center: new google.maps.LatLng(40.712775, -74.005973),
//         zoom: 18,
//     };
//     var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
// }