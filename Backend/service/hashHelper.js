const bcrypt = require('bcryptjs');

// This function is used to get the hash Password
exports.getHashPassword = (password) => {
	return new Promise(function (resolve, reject) {
        bcrypt.hash(password, 10, (err, hash) => {
            if (err) {
                resolve({
                    "isError": true,
                });
            
                return;
            } else {
                resolve(hash);
            
                return;
            }
        });     
	}) // END return new Promise(function (resolve, reject) {
}

// This function is used to authenticate the password during login
exports.compareHashPassword = (hashPassword, password) => {
	return new Promise(function (resolve, reject) {
        
        bcrypt.compare(password, hashPassword, 
            (err, result) => {
                
                if (err) {
                    resolve({
                        "isError": true,
                    });
                } else {
                    resolve(result);
                } 
    
        }); // END bcrypt.compare(password, hashPassword,   
	}) // END return new Promise(function (resolve, reject) {
}