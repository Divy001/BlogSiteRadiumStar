const blogModels = require('../models/blogsModel')

const createBlog = async function (req, res) {
    try{
        let myBlog = req.body;
        let authorId = req.body.authorId;
        let authorFromRequest = await blogModels.findById(authorId)
        if(authorFromRequest){
         let savedBlog = await blogModels.create(myBlog);
         res.status(201).send({ status: true , data: savedBlog });
        } else {
          res.send('')
           }
    }catch(error){
        res.status(500).send({status: false, msg:error})
    }
};


// const createBlog = async function (req, res) {
//     try{
//         let myBlog = req.body;
//         let authorId = req.body.authorId;
//         let authorFromRequest = await blogModels.findById(authorId)
//         if(authorFromRequest){
//          let savedBlog = await blogModels.create(myBlog);
//          res.status(201).send({ status: true , data: savedBlog });
//         } else {
//           res.send('')
//            }
//     }catch(error){
//         res.status(500).send({status: false, msg:error})
//     }
// };

module.exports.createBlog = createBlog