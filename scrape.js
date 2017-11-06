const puppeteer = require('puppeteer');
const WEBSITE = 'https://www.timeanddate.com/worldclock/full.html?sort=2';

let scrape = async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();

  await page.setRequestInterceptionEnabled(true);

  page.on('request', request => {
    console.log(`Intercepting: ${request.method} ${request.url}`);

    if (request.url === WEBSITE) {
      request.continue();
    } else {
      request.abort();
    }
  });

  await page.goto(WEBSITE, {
    networkIdleTimeout: 5000,
    waitUntil: 'networkidle',
    timeout: 3000000
  });

  const result = await page.evaluate(() => {
    let data = []; // Create an empty array that will store our data

    let cityNameElements = document.querySelectorAll('.main-content-div .fixed table tbody tr td:not(.rbi)');
    let cityTimeElements = document.querySelectorAll('.main-content-div .fixed table tbody tr td.rbi');

    let i = 0;

    for (let cityNameElement of cityNameElements) {
      // Loop through each proudct
      let cityName = cityNameElement.innerText; // Select the cityName
      let cityTime = cityTimeElements[i] ? cityTimeElements[i].innerText : 'No cityTime found'; // Select the cityTime

      data.push({ name: cityName, time: cityTime }); // Push an object with the data onto our array
      i++;
    }

    return data; // Return our data array
  });

  browser.close();
  return result; // Return the data
};

module.exports = scrape;
