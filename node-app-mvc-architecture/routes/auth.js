const AuthController = {};
const Model = require('./../models/Auth.js');

AuthController.login = function(req, res) {
    /* var users = [
        {
            username : "abc",
            password : 123456
        }
    ]; */
    var username = req.body.username;
    var password = req.body.password;
    Model.login(username, password, function(error, data, userCredentials) {
        if(error) {
			return res.status(500).json(
				{
					status: false,
					error
				}
			);
        }
        req.session.user = userCredentials;
		return res.status(200).json(
			{
				status: true,
				data
			}
		);

    });
    //var user = null;
    /* users.forEach(function(value, index) {
        if(value.username === username) {
            if(value.password === password){
                user = value;
            }
        }
    }); */
    /* if(!user){
        return res.send({
            status: false,
            message: "Invalid username or password"
        })
    }
    req.session.user = user;
    return res.send({
        status: true,
        message: "login successful"
    }); */
}

AuthController.logout = function(req, res) {
    var session = req.session;
    session.destroy();
    console.log(res.cookie);
    //res.cookie({ expires: new Date() });
    res.clearCookie('Somename');
    return res.send({
        status: true,
        message: "Logged out"
    });
};

AuthController.checkIfLoggedIn = function(req, res, next) {
    var url = req.originalUrl;
    var userSession = req.session.user;
    

    Model.checkIfLoggedIn(url, userSession, function(error, data) {
        if(error) {
            return res.json({
                status: false,
                message: error
            })
        }
        return next();
    });

    /* if(req.originalUrl === '/login') {
        return next();
    }
    
    if(typeof req.session.user === "undefined") {
        return res.send({
            status: false,
            message: "Unauthorised Request"
        })
    } else {
        return next();
    } */
}; 
module.exports = AuthController;