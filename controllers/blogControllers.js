const blogModels = require("../models/blogsModel");
const authorModels = require("../models/authorModel");

const createBlog = async function (req, res) {
  try {
    let myBlog = req.body;
    let authorId = req.body.authorId;
  
    let authorFromRequest = await authorModels.findById(authorId);
    if (authorFromRequest) {
      let isPublished = req.body.isPublished
      if (isPublished == true){
          myBlog.publishedAt = Date();
          let savedBlog1 = await blogModels.create(myBlog);
          res.status(201).send({ status: true, data: savedBlog1 });
      } else {
          let savedBlog2 = await blogModels.create(myBlog);
          res.status(201).send({ status: true, data: savedBlog2 });
      }
     
  } else {
      res.send("This author Id doesn't exist")
  }
} catch (error) {
  res.status(500).send({ status: false, msg: error.message })
}
}
const returnBlogsFiltered = async function (req, res) {
  let blogFound = await blogModels.find(req.query);
  let len = blogFound.length;
  let arr = [];
  for (let i = 0; i < len; i++) {
    if (
      (blogFound[i].isDeleted == false && blogFound[i].isPublished == true) ||
      blogFound[i].isPublished == false
    ) {
      arr.push(blogFound[i]);
    } else {
      continue;
    }
  }
  console.log(arr);
  if (arr) {
    res.status(200).send({ msg: "success", data: arr });
  } else {
    res.status(404).send({ msg: "No such book is found" });
  }
};
const updateData = async function (req, res) {
  try {
    let blogId = req.params.id;
    let data = await blogModels.findOne({ _id: blogId });
    let update = req.body;
    if (!data) {
      return res
        .status(404)
        .send({ status: false, msg: "Provide valid BlogId" });
    }
    if (data.isDeleted == true) {
      return res.send({ status: false, msg: "This book is no longer exists" });
    }

    if (update) {
      if (update.title) {
        data.title = update.title;
      }

      if (update.subcategory) {
        data.subcategory = update.subcategory;
      }
      if (update.Body) {
        data.Body = update.Body;
      }
      if (update.tags) {
        data.tags = update.tags;
      }
      data.save();
    } else {
      res.send({ msg: "Please provide data to update" });
    }
    res.status(200).send({ msg: "Successful", data: data });
  } catch (err) {
    res.status(400).send({ msg: "err.message" });
  }
};
const deleteBlog = async function (req, res) {
  try {
    let id1 = req.params.id;
    let data = await blogModels.findOne({ _id: id1 });
    if (!data) {
      return res
        .status(404)
        .send({ status: false, msg: "Blog id does not exits" });
    } else {
      data.isDeleted = true;
      data.save();
      res
      .status(200)
      .send({ msg: "successful", data: data });
    }
  } catch (err) {
    res
    .status(500)
    .send({ msg: err.message });
  }
};
const deleteSpecific = async function (req, res) {
  try {
    let obj = {};
    if (req.query.category) {
      obj.category = req.query.category;
    }
    if (req.query.authorId) {
      obj.authorId = req.query.authorId;
    }
    if (req.query.tag) {
      obj.tag = req.query.tag;
    }
    if (req.query.subcategory) {
      obj.subcategory = req.query.subcategory;
    }
    if (req.query.published) {
      obj.published = req.query.published;
    }
    let data = await blogModels.findOne(obj);
    if (!data) {
      return res
        .status(404)
        .send({ status: false, msg: "The given data is Invalid" });
    }
    data.isDeleted = true;
    data.save();
    res
    .status(200)
    .send({ msg: "successful", data: data });
  } catch (err) {
    res
    .status(500)
    .send({ msg: "Some error occur" });
  }
};

module.exports.createBlog = createBlog;
module.exports.returnBlogsFiltered = returnBlogsFiltered;
module.exports.updateData = updateData;
module.exports.deleteBlog = deleteBlog;
module.exports.deleteSpecific = deleteSpecific;