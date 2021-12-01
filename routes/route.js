const express = require('express');
const router = express.Router();
const authorController = require('../controllers/authorControllers')
const blogController = require('../controllers/blogControllers') 
const appMiddleware = require('../middleWares/appMiddleware')

//Project 1 - Phase - 1
router.post('/Authors',authorController.createAuthor)
router.post('/createBlog',appMiddleware.getAuthorDetails,blogController.createBlog)
router.get('/getBlog',appMiddleware.getAuthorDetails, blogController.returnBlogsFiltered) //
router.put('/getUpdate/:id',appMiddleware.getAuthorDetails, blogController.updateData);
router.delete('/deleteUpdate/:id',appMiddleware.getAuthorDetails, blogController.deleteBlog);
router.delete('/deleteUpdate2',appMiddleware.getAuthorDetails, blogController.deleteSpecific);

//Project 1 - Phase - 2
router.post('/doLogin',authorController.doLogin)

module.exports = router;