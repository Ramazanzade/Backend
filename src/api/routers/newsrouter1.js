const router = require('express').Router();
const { Newscontruler1 } = require('../contrulers/Newscontruler1');

router.post('/new1', Newscontruler1.add)
router.get('/news1', Newscontruler1.getAll)
router.get('/new1/:id', Newscontruler1.update)
router.delete('/new1/:id', Newscontruler1.delete)
router.put('/new1/:id', Newscontruler1.put);

module.exports = router;