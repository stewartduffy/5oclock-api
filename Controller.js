const _ = require('lodash');
const moment = require('moment');
const express = require('express');
const bodyParser = require('body-parser');
const scrape = require('./scrape');

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

const processDates = cities => {
  return _(cities)
    .filter(({ time }) => {
      const isFive = time.indexOf('5:') > 0;
      const isPm = time.indexOf('p.m') > 0;
      return isFive && isPm;
    })
    .map(function({ name, time }) {
      const cleanTime = time.replace('p.m.', 'pm').replace('a.m.', 'am');
      return {
        name,
        time,
        cleanTime,
        moment: moment(cleanTime, 'ddd h.mm a').format('dddd, MMMM Do YYYY, h:mm:ss a')
      };
    })
    .value();
};

// RETURNS ALL THE USERS IN THE DATABASE
router.get('/', function(req, res) {
  scrape()
    .then(cities => {
      console.log('cities: ', cities);
      const responseData = processDates(cities);
      console.log('responseData: ', responseData);

      res.status(200).send(responseData);
    })
    .catch(error => {
      console.log(error);
      res.status(500).send('Something broke!');
    });
});
module.exports = router;
