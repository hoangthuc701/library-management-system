function displayPaginationButtons(sel, page, data) {
  $(sel).each((index, el) => {
    $(el).text(data["_pagi"][index]["value"]);
    $(el).removeClass("");

    if (+data["_pagi"][index]["value"] === page) {
      $(el).addClass("");
    }

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
      var fDate = formatDate(val["Created"]);
      var row = `
              <div class="flex-wr-sb-s p-t-15 p-b-15 how-bor2">
                <div class="cl8 w-100">
                  <a href="javascript:;" class="f1-s-4 cl8 hov-cl10 trans-03">
                    <i class="fa fa-user-circle-o fa-lg" aria-hidden="true"></i> ${val["username"]}
                  </a>
                  <span class="f1-s-3 m-rl-3">-</span>
                  <span class="f1-s-3">
                    <i class="fa fa-calendar fa-lg" aria-hidden="true"></i> ${fDate}
                  </span>
                </div>
                <p class="f1-s-1 cl6 p-t-13">${val["comment"]}</p>
              </div>`;

      return row;
    })
    .join("");
}

$(document).ready(function () {
  $("#btn-send-msg").click(function() {
    var [msgContent, id] = [$("#msg").val(), $("#book-comment-id").val()];
    $("#msg").val("");
    
    if (msgContent !== ''){
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
    else{
      alert("Comment không được comment rỗng!");
    }
  });
});

$("#comments-area button").on("click", function () {
  const page = +$(this).html();

  if (!$(this).hasClass("pagi-active")) {
    $.getJSON(`/bookDetail?id=${$("#bookID").val()}&page=${page}`, (data) => {
      displayPaginationButtons("#comments-area button", page, data);

      var html = getHtmlComments(data);

      $("#users-comments").empty();
      $("#users-comments").append(html);
    });
  }
});
