const express = require('express');
const router = express.Router();
const authorController = require('../controllers/authorControllers')
const blogController = require('../controllers/blogControllers') 
const appMiddleware = require('../middleWares/appMiddleware')


router.post('/createAuthor',authorController.createAuthor)
router.post('/createBlog',blogController.createBlog)
router.get('/filterBlog', blogController.returnBlogsFiltered)
router.put('/update/:id', blogController.updateData)
router.delete('/deleteBlog/:id', blogController.deleteBlog)
router.delete('/deleteSpecific', blogController.deleteSpecific)

module.exports = router;