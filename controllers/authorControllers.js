const authorModels = require('../models/authorModel')

const mongoose = require('mongoose');
 
const createAuthor= async function (req, res) {
    let regex = (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)

    let checkEmail = regex.test(req.body.email)
    console.log(checkEmail)
    if(checkEmail){
        let myAuthor= req.body
        let authorSaved= await authorModels.create(myAuthor)
        res.send({msg: authorSaved})   
    }else{
        res
        .status(400)
        .send("Input Valid Email Id")
    }
     
    }
 
module.exports.createAuthor = createAuthor;