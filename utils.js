const node_fetch = require('node-fetch')
const fakeUa = require('fake-useragent')

async function fetch(url) {

  const response = await node_fetch(url, {
    "headers": {
      "accept": "application/json, text/javascript, */*; q=0.01",
      "accept-language": "en-US,en;q=0.9,zh-TW;q=0.8,zh;q=0.7",
      "cache-control": "no-cache",
      "pragma": "no-cache",
      "sec-ch-ua": "\"Google Chrome\";v=\"87\", \" Not;A Brand\";v=\"99\", \"Chromium\";v=\"87\"",
      "sec-ch-ua-mobile": "?0",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
      "x-csrf-token": "bf41bb35f8f51f70f8ad927c4f42b1f6",
      "x-requested-with": "XMLHttpRequest",
      "cookie": "plugin_counter_is_new=1; cookies_accepted=unknown; sess_user_publicv2_larpwesley=6d5sqei8ealk0a6us0evud05m6",
      'User-Agent': fakeUa()
    },
    "referrer": "https://larpwesley.simplybook.asia/v2/",
    "referrerPolicy": "strict-origin-when-cross-origin",
    "body": null,
    "method": "GET",
    "mode": "cors"
  });
  
  if (response.status !== 200) console.error(`Error when fetch:`, response.statusText)  
  const data = await response.json()

  return data
}

const sleep = async (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

module.exports.fetch = fetch
module.exports.sleep = sleep