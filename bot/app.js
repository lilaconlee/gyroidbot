require('dotenv').config();

const Twit = require('twit');
const T = new Twit({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

const fs = require('fs');
const puppeteer = require('puppeteer');

const imageName = 'dinkoid.jpeg';

function tweet(payload) {
  T.post('statuses/update', payload, (err, data, res) => {
    if (err) {
      console.log('Failed to update status:', err);
      return;
    }
  });
}

function mediaUpload(media_data) {
  T.post('media/upload', { media_data }, (err, data, res) => {
    if (err) {
      console.log('Failed to upload image:', err);
      return;
    }

    tweet({ media_ids: [data.media_id_string] });
  });
}

async function capture() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 1000, height: 500 });
  await page.goto('http://lilaconlee.com/gyroidbot');
  await page.screenshot({ path: imageName, type: 'jpeg', quality: 100 });
  await browser.close();
}

function encodeImage() {
  const path = `./${imageName}`;

  return fs.readFileSync(path, { encoding: 'base64' });
}

function post() {
  mediaUpload(encodeImage());
}

capture();
post();
