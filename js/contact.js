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

    $.ajax({
      url: "https://script.google.com/macros/s/AKfycbwNNaHCPyWrDhr6H6XVa-JopjXmAVjYQDae0yysxCSKFjCwm7HErb2pdL8li4mEdYUH/exec",
      data: $(form).serialize(),
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
