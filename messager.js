const login = require("facebook-chat-api");
const fs = require("fs")

const generateMessageHC = require("./hc_scraper.js")
const generateMessageTS = require("./ts_scraper.js")

// you will need to create your own appstate.json from your cookies after logging into fb on browser
const credential = { appState : JSON.parse(fs.readFileSync("appstate.json", "utf-8"))};

(async () => {
    messageHC_promise = generateMessageHC()
    messageTS_promise = generateMessageTS()

    const [messageHC, messageTS] = await Promise.all([generateMessageHC(), generateMessageTS()])

    // send
    login(credential, (err, api) => {
        if(err) return console.error(err);

        api.sendMessage(messageHC, '100005271150428')
        api.sendMessage(messageTS, '100005271150428')
    });
})();

