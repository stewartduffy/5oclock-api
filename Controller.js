const _ = require('lodash');
const moment = require('moment');
const express = require('express');
const bodyParser = require('body-parser');
const scrape = require('./scrape');

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

// const processDates = (cities) => {
//   return _(cities)
//     .filter(({ time }) => {
//       const isFive = time.indexOf('5:') > 0;
//       const isPm = time.indexOf('p.m') > 0;
//
//       return isFive && isPm;
//     })
//     .map(({ name, time }) => {
//       const cleanTime = time.replace('p.m.', 'pm').replace('a.m.', 'am');
//
//       console.log('cleanTime: ', cleanTime);
//
//       return {
//         name,
//         time,
//         cleanTime,
//         moment: moment(cleanTime, 'ddd h.mm a').format('dddd, MMMM Do YYYY, h:mm:ss a')
//       };
//     })
//     .value();
// };

// RETURNS ALL THE USERS IN THE DATABASE
router.get('/', function(req, res) {
  scrape()
    .then(cities => {
      console.log('xxx why does this not work? xxxx');
      console.log('cities: ', cities);

      // (async () => {
      //   const responseData = await processDates(cities);
      //   console.log('responseData: ', responseData);
      // })();
      //   const responseData = await processDates(cities);

      res.status(200).send(
        _(cities)
          .filter(({ time }) => {
            const isFive = time.indexOf('5:') > 0;
            const isPm = time.indexOf('p.m') > 0;

            return isFive && isPm;
          })
          .map(({ name, time }) => {
            const cleanTime = time.replace('p.m.', 'pm').replace('a.m.', 'am');

            console.log('cleanTime: ', cleanTime);

            return {
              name,
              time,
              cleanTime,
              moment: moment(cleanTime, 'ddd h.mm a').format('dddd, MMMM Do YYYY, h:mm:ss a')
            };
          })
          .value()
      );
    })
    .catch(error => {
      console.log(error);
      res.status(500).send('Something broke!');
    });
});
module.exports = router;
