const Router = require('express')
const PostController = require('./postController.js')
const authMiddlewaree = require('./middlewaree/authMiddlewaree')


const router = new Router();

router.post('/posts', authMiddlewaree, PostController.create)
router.get('/posts', PostController.getAll)
router.get('/posts/:id', PostController.getOne)
router.put('/posts', authMiddlewaree, PostController.update)
router.delete('/posts/:id', authMiddlewaree, PostController.delete)

module.exports = router