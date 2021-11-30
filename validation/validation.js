const logIn = require("../controller/Blogcontroller");
const jwt = require("jsonwebtoken");

const validation = async function (req, res, next) {
    let token = req.headers['x-api-key'];
    let validate = jwt.verify(token, "radium");
    if (validate) {
        if (validate._id == req.params.userId) {
            next();
        }
        else {
            res.send({ status: "false", msg: "user not found" });
        }
    }
    else {
        res.status(200).send({ status: "false", msg: "Token is invalid" });
    }
}
module.exports.validation = validation;