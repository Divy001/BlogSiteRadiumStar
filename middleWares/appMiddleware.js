const authorModels = require('../models/authorModel')
const jwt = require('jsonwebtoken')

const doLogin = async function (req, res) {
    userEmail = req.body.email
    userPassword = req.body.password
    let user = await authorModels.findOne({ email: userEmail, password: userPassword, isDeleted: false })
    let fname = user.fname
    let lname = user.lname
    console.log(fname,lname)
    if (user) {
       let payload = { userId: user._id , email :user.email }
       const generatedToken = jwt.sign(payload , "Radium Star")
       res.header("x-api-key" , generatedToken)
       res.send({ Message: fname+" "+lname+ " you have logged in Succesfully",YourId: user._id, token: generatedToken })
    } else {
       res.send({ status: false, message: 'Oops...Invalid credentials' })
    }
 }
 
 const getAuthorDetails = async function (req, res) {
   let token = req.headers['x-api-key']
   if (!token) {
      return res.send({ status: false, message: 'Sorry , No authentication token present' })
   } else {
      let decodedToken = jwt.verify(token, "Radium Star")
      console.log(decodedToken)
      let decodedId = decodedToken.userId
      let paramsId = req.params.userId
      if ( decodedId == paramsId) {
         let userDetails = await authorModels.findOne({ _id: req.params.userId, isDeleted: false })
         if (userDetails) {
            res.send({ Message: "You are authorize and your details are given below", data: userDetails })
         } else {
            res.send({ status: false, message: 'Author not found' })
         }
      } else {
         res.send({ status: false, message: 'Token not valid' })
      }
   }
}

module.exports.doLogin = doLogin;
module.exports.getAuthorDetails = getAuthorDetails;