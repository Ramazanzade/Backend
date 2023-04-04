const router = require('express').Router();
const { Newscontruler2 } = require('../contrulers/Newscontruler2');

router.post('/new2', Newscontruler2.add)
router.get('/news2', Newscontruler2.getAll)
router.get('/new2/:id', Newscontruler2.update)
router.delete('/new2/:id', Newscontruler2.delete)
router.put('/new2/:id', Newscontruler2.put);

module.exports = router;