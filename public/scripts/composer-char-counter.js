$(document).ready(function() {
  $(".new-tweet textarea").on("keyup", function(event) {
    let charactersRemaining = 140 - $(this).val().length;
    let counter = $(this).siblings(".counter").text(charactersRemaining);
    if (charactersRemaining < 0) {
      counter.addClass("color-red");
    } else {
      counter.removeClass("color-red");
    }
  })
});