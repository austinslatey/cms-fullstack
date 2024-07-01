const router = require('express').Router();
const apiRoutes = require('./api');

router.use((req, res) => {
  return res.send('Wrong route!');
});

router.use('/api', apiRoutes);

module.exports = router;