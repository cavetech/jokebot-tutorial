const Slackbot = require("slackbots");
const axios = require("axios");

const bot = new Slackbot({
  token: "xoxb-518744384768-519684566869-0tT3uUVAjGIdERf6g6hT7HNk",
  name: "jokebot"
});

//Start Handler
bot.on("start", () => {
  const params = {
    icon_emoji: ":cat:"
  };
  bot.postMessageToChannel(
    "general",
    "Get Ready to Laugh with @jokebot!",
    params
  );
});
//Error Handler
bot.on("error", error => console.log(error));

//Message Handler
bot.on("message", data => {
  if (data.type !== "message") {
    return;
  }
  handleMessage(data.text);
});

function handleMessage(message) {
  if (message.includes(" chucknorris")) {
    chuckJoke();
  } else if (message.includes(" yomomma")) {
    yoMommaJoke();
  } else if (message.includes(" random")) {
    randomJoke();
  } else if (message.includes(" help")) {
    runHelp();
  }
}

function chuckJoke() {
  axios.get("http://api.icndb.com/jokes/random").then(response => {
    const joke = response.data.value.joke;

    const params = {
      icon_emoji: ":laughing:"
    };
    bot.postMessageToChannel("general", `${joke}`, params);
  });
}

function yoMommaJoke() {
  axios.get("http://api.yomomma.info").then(response => {
    const joke = response.data.joke;

    const params = {
      icon_emoji: ":laughing:"
    };
    bot.postMessageToChannel("general", `${joke}`, params);
  });
}

function randomJoke() {
  const randomNumber = Math.floor(Math.random() * 2) + 1;
  if (randomNumber === 1) {
    chuckJoke();
  } else {
    yoMommaJoke();
  }
}

function runHelp() {
  const params = {
    icon_emoji: ":question:"
  };

  bot.postMessageToChannel(
    "general",
    `Type @jokebot with either 'chucknorris', 'yomamma' or 'random' to get a joke.`,
    params
  );
}
