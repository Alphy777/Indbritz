// Form validation with jQuery Validate plugin
$("#form").validate({ // Change to your form's ID if different
    rules: {
      Name: {
        required: true
      },
      MailId: {
        required: true,
        email: true,
      },
      MobileNumber:{
        required: true
      },
      Message: {
        required: true
      }
    },
    messages: {
    },
  });

// For sending the data from the website
$("#form").submit(function(e){
    e.preventDefault();
    
    // Check if the form is valid
    if($("#form").valid()){ 
      alert("Submitting, please wait!");
      $.ajax({
        url:"https://script.google.com/macros/s/AKfycbw_DU2rGVrVN9gETO23cxXdVzLB0IotJxWq01YOWTu7G7zx6q3KmfGoLkhEwbtq_bUftw/exec",
         data:$("#form").serialize(),
        method:"post",
        success:function (response){
            alert("Submitted successfully")
          window.location.reload();
        },
        error:function (err){
          alert("Something Error")
        }
      });
    }
  });
    