function displayPaginationButtons(sel, page, data) {
  $(sel).each((index, el) => {
    $(el).text(data["_pagi"][index]["value"]);
    if (+data["_pagi"][index]["value"] !== -1) {
      $(el).css("display", "block");
    } else {
      $(el).css("display", "none");
    }
  });
}

function getHtmlComments(data) {
  return data["_comments"]
    .map((val) => {
      var m = new Date(val["Created"]);
      var dateString = m.getDate() + "/" + (m.getMonth()) + "/" + m.getFullYear() + " " + m.getHours() + ":" + m.getMinutes() + ":" + m.getSeconds();
      var row = `
              <div class="flex-wr-sb-s p-t-15 p-b-20 how-bor2">
                  <div class="cl8 w-100 al-self-s">
                      <a class="f1-s-4 cl8 hov-cl10 trans-03 " style="color: white; background-image:url('../../public/bookTitleImage/wood-button.jpg');">
                          <i class="fa fa-user-circle-o fa-lg" aria-hidden="true"></i>
                              ${val["username"]}
                      </a>
                                                    
                      <span class="f1-s-3 m-rl-3">
                        -
                      </span>
                      <a href="javascript:;" class="f1-s-4 cl8 hov-cl10 trans-03 " style="color: white; background-image:url('../../public/bookTitleImage/wood-button.jpg');">
                        <i class="fa fa-user-circle-o fa-lg" aria-hidden="true"></i>
                          ${dateString}
                        </a>
                        <p class="f1-s-1 cl6 p-t-20 p-b-20 p-l-20 flex-wr" style="color:darkslategrey; background-color:#f9f2ec;word-break:break-all">
                          ${val["comment"]}
                        </p>
                  </div>
                </div>`;

      return row;
    })
    .join("");
}

$(document).ready(function () {
  $("#btn-send-msg").click(function () {
    var [msgContent, id] = [$("#msg").val(), $("#book-comment-id").val()];
    $("#msg").val("");

    if (msgContent !== '') {
      $.post(
        "/book-comment",
        { Comment: msgContent, BookID: id },
        function (data) {
          $("#head-quantity").text(data["_quantity"]);
          $("#tail-quantity").text(`(${data["_quantity"]})`);
          displayPaginationButtons("#comments-area button", 1, data);
          var html = getHtmlComments(data);
          $("#users-comments").empty();
          $("#users-comments").append(html);
        }
      );
    }
    else {
      alert("Comment không được comment rỗng!");
    }
  });
});

$("#comments-area button").on("click", function () {
  const page = +$(this).html();


  $.getJSON(`/bookDetail?id=${$("#bookID").val()}&page=${page}`, (data) => {
    displayPaginationButtons("#comments-area button", page, data);

    var html = getHtmlComments(data);

    $("#users-comments").empty();
    $("#users-comments").append(html);
  });

});
