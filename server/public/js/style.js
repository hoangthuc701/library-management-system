function snackbarToggle(msg) {
  var x = document.getElementById("snackbar");

  x.innerHTML = msg;
  x.className = "_show";

  setTimeout(function () {
    x.className = x.className.replace("_show", "");
  }, 3000);
}

function clearInputValue(inputs) {
  inputs.forEach(el => {
    $(el).val('');
  })
}

function formatDate(date) {
  var myDate = new Date(date);
  var day = myDate.getDate() < 10 ? `0${myDate.getDate()}` : `${myDate.getDate()}`;
  var month = myDate.getMonth() + 1 < 10 ? `0${myDate.getMonth() + 1}` : `${myDate.getMonth() + 1}`;

  return day + '/' + month;
}

$(document).ready(function () {
  $("#btn-register").on("click", function (e) {
    var passwordMatch = $("#password").val() === $("#repassword").val();

    if (passwordMatch === false) {
      e.preventDefault();

      $("#alert").html("Mật khẩu đánh lại không khớp, vui lòng kiểm tra lại!");
      $("#alert").css("display", "block");
    } else {
      e.preventDefault();

      $.getJSON(`/user/checkUniqueUser&username=${$("#username").val()}`, (data) => {
        if (data["Result"] === true) {
          $("#alert").html("Email này đã được đăng kí, vui lòng kiểm tra lại!");
          $("#alert").css("display", "block");
        }
        if((data["Result"] === false){
          $("#alert").html("Tên người dùng này đã được đăng kí, vui lòng kiểm tra lại!");
          $("#alert").css("display", "block");
        }
        if(data["Result"] === 0){
          $("#alert").css("display", "none");
          $("#form-register").submit();
        }
      });
    }
  });

  $("#btn-login").on("click", (e) => {
    e.preventDefault();

    $.post(
      "/login-validate",
      { username: $("#_username").val(), password: $("#_password").val() },
      (data) => {
        if (!data) {
          $("#alert-login").html(
            "Đăng nhập không thành công, vui lòng kiểm tra lại!"
          );
          $("#alert-login").css("display", "block");
        } else {
          $("#form-login").submit();
        }
      }
    );
  });

});
