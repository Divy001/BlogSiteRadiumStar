const { findOne } = require('../models/BlogModels');
const blogModels = require("../models/blogsModel");
const jwt = require(jsonwebtoken);

const logIn = async function (req, res) {
    let data = req.body;
    let name1 = data.name;
    let password1 = data.password;
    let usercred = await userLog.findOne({ name: name1, password: password1, isDeleted: false });
    if (!usercred) {
        return res.send({ status: "false", msg: "The given credential is not match" });
    }
    else {
        let payload = { _id: usercred._id };
        let token = jwt.sign(payload, "radium");//token creation
        console.log(token);
        res.send({
            status: "True",
            data: usercred, token: token
        });

    }
}
module.exports.logIn= logIn;