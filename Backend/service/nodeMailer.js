const nodemailer = require('nodemailer');

// const EMAIL = "ankurbardhan2019@gmail.com";
// const PASSWORD = "gita4200@";

const EMAIL = "distribte@gmail.com";
const PASSWORD = "Etainement#1";

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: EMAIL,
    pass: PASSWORD
  }
});

// var transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: "distribte@gmail.com",
//     pass: "Etainement#1"
//   }
// });

exports.sendMail = (email, subject, message) => {

    return new Promise(function (resolve, reject) {
        var mailOptions = {
            from: 'Distribte',
            to: email,
            subject: subject,
            html: `<h1>${message}</h1>`
        };
        
        transporter.sendMail(mailOptions, function(error, info){
            console.log("email", EMAIL);
            if (error) {
            console.log("Error Occur In Sending Mail",error);
            } else {
            console.log("Mail Sent Successfully");
            }
        });
    });    
}

exports.sendMonthlyReportMail = (email, subject, message, fileUrlMonthly) => {

    return new Promise(function (resolve, reject) {
        var mailOptions = {
            from: 'Distribte',
            to: email,
            subject: subject,
            html: `<h3>${message}</h3><h4>${fileUrlMonthly}</h4>`
        };
        
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
            console.log("Error Occur In Sending Mail",error);
            } else {
            console.log("Mail Sent Successfully");
            }
        });
    });    
}

// This function is used to send mail with attachment
exports.sendMailWithAttachment = (email, subject, message) => {
    return new Promise(function (resolve, reject) {
        var mailOptions = {
            from: 'Distribte',
            to: email,
            subject: subject,
            html: `<h1>${message}</h1>`,
            attachments: [
                {
                    filename: 'test.xlsx',
                    path: filePath
                }
            ]
        };
      
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
            console.log("Error Occur In Sending Mail",error);
            } else {
            console.log("Mail Sent Successfully");
            }
        });
    });    
}