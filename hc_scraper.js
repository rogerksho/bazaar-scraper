const fetch = require("node-fetch");
const cheerio = require('cheerio');

const DATA_URL = "https://www.thebazaar.com.hk/happenings.html"

const loadBazaar = async () => {
    const res = await fetch(DATA_URL)
    return res.text()
}

async function generateMessageHC() {
    bare_html = await loadBazaar()

    const $ = cheerio.load(bare_html);

    const BAZAAR_TITLE = $("h2").text()
    const BAZAAR_DATE = $("[class*='date']")

    const BAZAAR_DATE_ARRAY = []

    $( "[class*='date'] > p" ).each(function( index ) {
        BAZAAR_DATE_ARRAY.push($( this ).text())
    });

    formatted_message = "== TST BAZAAR ==" + '\n' + BAZAAR_TITLE + '\n\n' + BAZAAR_DATE_ARRAY[0]
    return formatted_message
};

module.exports = generateMessageHC
