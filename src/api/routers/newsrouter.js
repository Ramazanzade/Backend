const router = require('express').Router();
const { Newscontruler } = require('../contrulers/Newscontruler');

router.post('/new', Newscontruler.add)
router.get('/news', Newscontruler.getAll)
router.get('/new/:id', Newscontruler.update)
router.delete('/new/:id', Newscontruler.delete)
router.put('/new/:id', Newscontruler.put);

module.exports = router;