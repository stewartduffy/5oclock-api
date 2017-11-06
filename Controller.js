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
      // console.log('cities: ', cities);

      // (async () => {
      //   const responseData = await processDates(cities);
      //   console.log('responseData: ', responseData);
      // })();
      //   const responseData = await processDates(cities);

      res.status(200).send(
        _.filter(cities, ({ time }) => {
            const isFive = time.indexOf('5:') > 0;
            const isPm = time.indexOf('p.m') > 0;

            console.log('time.indexOf(\'5:\'): ', time.indexOf('5:'));
            console.log('isFive: ', isFive);

            console.log('time.indexOf(\'p.m\'): ', time.indexOf('p.m'));
            console.log('isPm: ', isPm);
            console.log('isFive && isPm: ', isFive && isPm);

            return isFive && isPm;
          })

        //   _.filter(cities, ({ time }) => {
        //     const isFive = time.indexOf('5:') > 0;
        //     const isPm = time.indexOf('p.m') > 0;
        //
        //     return isFive && isPm;
        //   });

        // _.map(cities, ({ name, time }) => {
        //   const cleanTime = time.replace('p.m.', 'pm').replace('a.m.', 'am');
        //
        //   console.log('cleanTime: ', cleanTime);
        //
        //   return {
        //     name,
        //     time,
        //     cleanTime,
        //     moment: moment(cleanTime, 'ddd h.mm a').format('dddd, MMMM Do YYYY, h:mm:ss a')
        //   };
        // })

      // _(cities)
        //   .filter(({ time }) => {
        //     const isFive = time.indexOf('5:') > 0;
        //     const isPm = time.indexOf('p.m') > 0;
        //
        //     return isFive && isPm;
        //   })
        //   .map(({ name, time }) => {
        //     const cleanTime = time.replace('p.m.', 'pm').replace('a.m.', 'am');
        //
        //     console.log('cleanTime: ', cleanTime);
        //
        //     return {
        //       name,
        //       time,
        //       cleanTime,
        //       moment: moment(cleanTime, 'ddd h.mm a').format('dddd, MMMM Do YYYY, h:mm:ss a')
        //     };
        //   })
        //   .value()


      );
    })
    .catch(error => {
      console.log(error);
      res.status(500).send('Something broke!');
    });
});
module.exports = router;
