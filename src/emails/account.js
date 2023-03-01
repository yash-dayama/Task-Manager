const nodemailer = require('nodemailer');

// let mailTransporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth:{
//         user: 'ex@gmail.com',
//         password: '001'
//     }
// })
// let details = {
//     from: 'ex@gmail.com',
//     to: 'ex@gmail.com',
//     subject: 'Testing Node Mail',
//     text: 'Testing Node Mail using nodemailer'
// }

// mailTransporter.sendMail(details, (err) =>{
//     if(err){
//         console.log('Has and error');
//     }
//     else{
//         console.log("Send success");
//     }
// })

async function main() {
let testAccount = await nodemailer.createTestAccount();

    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'cooper.emmerich37@ethereal.email',
            pass: 'gSX2GyeuaBknE6dwa7'
        },
    });


  let info = await transporter.sendMail({
    from: '"Yash Dayama 👻" <cooper.emmerich37@ethereal.email>', // sender address
    to: "yash280801@gmail.com, ramironit08@gmail.com ", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello thsi is my first mail", // plain text body
    html: "<b>Hello from NodeMailer</b>", // html body
  });
  console.log("Message sent: %s", info.messageId);
  
}  
main().catch(console.error);