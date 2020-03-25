const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

const renderTweets = function(tweets) {
  for (let tweet of tweets) {
    let $tweet = createTweetElement(tweet);
    $(".tweet-container").prepend($tweet);
  }
}

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
}

renderTweets(data);