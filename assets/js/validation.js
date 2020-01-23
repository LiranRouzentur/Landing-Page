


$('#contact-form').on('submit', function (event) {

  // when submit is clicked it would prevent it from refreshing the page so that the php validation would be able to work after the js validation
  event.preventDefault();

  // if anywhere in the DOM there is a p with a class "text-danger" and he has a text inside return empty string (remove the error message)
  $('p.text-danger').text('');


  // the '$' in $name/$email/$phone/$type says that the var is an Element from the DOM.
  var $name = $('#name'),
    $email = $('#email'),
    $phone = $('#phone'),
    $type = $('#type'),
    $btn = $('#submit-btn'),
    formValid = true ,
    emailRegExp = /^[\w-]+(\.[\w-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/i,
    phoneRegExp = /^0[2-9]\d{7,8}$/;

  var userData = {
    // collect and clean the values 
    name: $name.val().trim(),
    email: $email.val().trim(),
    phone: $phone.val().trim(),
    type: $type.val().trim()
  };

  //"attr()" : add attribute like "class"/"id" to en element in the DOM . in this case after the client will click the $btn he wont be able to do it again because it would be disabled (just one request to the server).
  $btn.attr('disabled', true);

  //"find()" - find in the element , in this case span.btn-text and hide it
  $btn.find('span.btn-text').hide();

  //"find()" - find in the element , in this case div.loader and display it as inline-block.
  $btn.find('div.loader').css('display', 'inline-block');

  // validation
  if (userData.name.length < 2 || userData.name.length > 70) {

    formValid = display_error($name, '* A valid name is required');

  }

  if (userData.email.length < 6 || !emailRegExp.test(userData.email)) {

    formValid = display_error($email, '* A valid email is required');


  }
  if (!phoneRegExp.test(userData.phone)) {

    formValid =  display_error($phone, '* A valid phone is required');


  }

  if (userData.type == '') { // if the client didn't pick from the select menu

  formValid = display_error($type, '* Please select Experience');


  }
  if (formValid) {

    $.ajax({
      type: 'POST',
      url: 'save-user-data.php',
      dataType: 'html',
      data: userData,
      success: function (res) {
        if (res) {
          window.location = 'tnx.html'; 
        }
      }

    });



  } else {

    setTimeout(function () {
      //if there is a problem in one of the fields don't disable the submit button
      $btn.attr('disabled', false);

      //"find()" - find in the element , in this case span.btn-text and show it
      $btn.find('span.btn-text').show();

      //"find()" - find in the element , in this case div.loader and  dont display it. 
      $btn.find('div.loader').css('display', 'none');
    }, 1000);
  }
});

//"next()" is referring to the next element in the DOM . in this case the p.text-danger.
function display_error(element, message) {
  setTimeout(function () {
    element.next().text(message);
  }, 1000);
return false;
}





// a way to show somthing insted of somthing . change the "after" in line 136

// $('#save-btn').on('click', function () {

//   var self = $(this);

//   var userData = {

//     userId : 45,
//     title: $('#title').val().trim(),
//     body: $('#body').val().trim()

//   };

//   if (userData.title.length > 0 && userData.body.length > 0) {

//     $.ajax ({

//       url: 'https://jsonplaceholder.typicode.com/posts',
//       type: 'POST',
//       dataType: 'json',
//       data: userData,
//       success: function (res) {

//         if (res && typeof res.id != 'undefined') {

//           self.after('<span><br><br> Your Post IS saved </span>');
//         }
//       }



//     });

//   }


// });