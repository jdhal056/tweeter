const loadTweets = function() {
  $.ajax({
    url: "/tweets",
    method: "GET", 
    data: $("#compose").serialize(), 
    datatype: "json", 
    success: function(data) {
      renderTweets(data);
    }
  })
};

const submitTweet = function(event) {
  event.preventDefault();
  let thisData = $(this).serialize();
  let tweetLength = $("textarea").val().length;
  if (tweetLength === 0) {
    $(".error").text("Please enter something!").toggle(true);
    return;
  } else if (tweetLength > 140) {
    $(".error").text("Preet too long!").toggle(true);
    return;
  } else {
    $.ajax({
      url: "/tweets",
      method: "POST", 
      data: thisData
    }).then(function() {
      $("textarea").val("");
      loadTweets();
    })
  }
};

const renderTweets = function(tweets) {
  $(".tweet-container").empty();
  for (let tweet of tweets) {
    $(".tweet-container").prepend(createTweetElement(tweet));
  }
};

const createTweetElement = function(tweetData) {
  let $tweet = $("<article>").addClass("tweet");

  let $header = $("<header>");
  let $img = $("<img>").attr("src", tweetData.user.avatars);
  let $h1 = $("<h1>").text(tweetData.user.name);
  let $h2 = $("<h2>").text(tweetData.user.handle);
  $header.append($img);
  $header.append($h1);
  $header.append($h2);
  $tweet.append($header);

  let $div = $("<div>").text(tweetData.content.text);
  $tweet.append($div);

  let $footer = $("<footer>");
  let $p = $("<p>").text(getTime(tweetData.created_at));
  $footer.append($p);
  $tweet.append($footer);

  let html = 
  `<span><img class="flag" src="/images/iconfinder_flag_216203.png"><img class="retweet" src="/images/iconfinder_basics-14_296820.png"><img class="heart" src="/images/heart.png"></span>`
  $tweet = $tweet.append(html);
  return $tweet;
};

const getTime = function(date) {
  let currentTime = Date.now();
  let timePassed = (currentTime - date) / 1000 / 60;
  let hoursPassed = (currentTime - date) / 1000 / 60 / 60;
  let daysPassed = hoursPassed / 24;
  if (timePassed < 1) {
    return `${Math.floor(timePassed)} seconds ago`;
  } else if (timePassed > 1 && timePassed < 60) {
    return `${Math.floor(timePassed)} minutes ago`;
  } else if (timePassed > 60 && hoursPassed < 24) {
    return `${Math.floor(hoursPassed)} hours ago`;
  } else if (hoursPassed > 24) {
    return `${Math.floor(daysPassed)} days ago`;
  }
};

$(document).ready(function() {
  loadTweets();
  $("#compose").on("submit", submitTweet);
});