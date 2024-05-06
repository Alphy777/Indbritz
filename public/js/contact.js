$.validator.addMethod("phoneNumber", function(value, element) {
  return this.optional(element) || /^(\+\d{1,4})?\s?\d{10}$/.test(value);
}, "Please enter a valid phone number");

$("#form").validate({
  rules: {
    Name: {
      required: true
    },
    MailId: {
      required: true,
      email: true
    },
    MobileNumber:{
      required: true,
      phoneNumber: true
    },
    Message: {
      required: true
    }
  },
  submitHandler: function(form) {
    var recaptcha = grecaptcha.getResponse();
    if (recaptcha.length == 0) {
      document.getElementById("captcha").style.display = "block";
      return false;
    } 
    else {
      $("#loading-overlay").removeClass("d-none");

      var formData = {
        'Name': $('input[name=Name]').val(),
        'MailId': $('input[name=MailId]').val(),
        'MobileNumber': $('input[name=MobileNumber]').val(),
        'Message': $('input[name=Message]').val()
      };

      $.ajax({
        url: "https://script.google.com/macros/s/AKfycbyKWnUL18WVRg5f1PQp-iu3uNpsIH8PAMU2gMCBa46Hv471rrA1cC8RG0XxD5X8XCbnLA/exec",
        data: formData,
        method: "post",
        success: function(response) {
          $("#loading-overlay").addClass("d-none");
          $("#alert-popup").text("Submitted Successfully!").removeClass("alert-danger").addClass("alert-success");
          $("#alert-popup").removeClass("d-none");
          setTimeout(function() {
            $("#alert-popup").addClass("d-none");
            location.reload();
          }, 2000);
        },
        error: function(err) {
          $("#loading-overlay").addClass("d-none");
          $("#alert-popup").text("Error submitting form").removeClass("alert-success").addClass("alert-danger");
          $("#alert-popup").removeClass("d-none");
          setTimeout(function() {
            $("#alert-popup").addClass("d-none");
          }, 2000);
        }
      });
    }
  }
});
