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
    alert("Please enter something!");
    return;
  } else if (tweetLength > 140) {
    alert("Preet too long!");
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
  for (let tweet of tweets) {
    $(".tweet-container").prepend(createTweetElement(tweet));
  }
};

const createTweetElement = function(tweetData) {
  const $tweet = $("<article>").addClass("tweet");
  let html = 
  `<header>
    <img src=${tweetData.user.avatars} />
    <h1>${tweetData.user.name}</h1>
    <h2>${tweetData.user.handle}</h2>
  <header>
  <div class="tweet-content">
    <p>
      ${tweetData.content.text}
    </p>
  </div>
  <footer>
    <p>
      ${tweetData.created_at}
    </p>
    <span>
      <img class="flag" src="/images/iconfinder_flag_216203.png">
      <img class="retweet" src="/images/iconfinder_basics-14_296820.png">
      <img class="heart" src="/images/heart.png">
    </span>
  </footer>`;
  $tweet = $tweet.append(html);
  return $tweet;
};

$(document).ready(function() {
  loadTweets();
  $("#compose").on("submit", submitTweet);
})