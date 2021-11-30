const mongoose = require('mongoose')


const ObjectId = mongoose.Schema.Types.ObjectId
const blogSchema = new mongoose.Schema ({
title : { 
    type : String , 
    require : true
},

body : { 
    type : String , 
    require : true 
},

authorId : {
     type : ObjectId ,
     require : true
     },

tags : [String],

category : {
     type : String ,
      require : true 
    },
subcategory : { 
    type : [String] 
},

deletedAt : Date,

isDeleted : { 
    type : Boolean , 
    default : false 
},

publishedAt : Date,

isPublished : { 
    type : Boolean , 
    default : false
},

},{timestamps : true})

module.exports = mongoose.model('Blog',blogSchema)