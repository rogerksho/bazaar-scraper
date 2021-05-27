const fetch = require("node-fetch");
const cheerio = require('cheerio');
const https = require('https');

const httpsAgent = new https.Agent({
    rejectUnauthorized: false,
});

const DATA_URL = "https://timessquare.com.hk/happenings?lang=en"

const loadBazaar = async () => {
    const res = await fetch(DATA_URL,
        {
            agent: httpsAgent,
        })
    return res.text()
}

async function generateMessageTS() {
    bare_html = await loadBazaar()

    const $ = cheerio.load(bare_html);

    const BAZAAR_DIV = $("h2:contains('Bazaar')").parent()

    const BAZAAR_TITLE = BAZAAR_DIV.find("h2").text()
    const BAZAAR_DATE = BAZAAR_DIV.find("p").text()

    formatted_message = "== TIMES SQUARE BAZAAR ==" + '\n' + BAZAAR_TITLE + '\n\n' + BAZAAR_DATE
    return formatted_message
};

module.exports = generateMessageTS
