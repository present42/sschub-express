// import nodeoutlook from 'nodejs-nodemailer-outlook'

// console.log(nodeoutlook);
// nodeoutlook.sendEmail({
//     auth: {
//         user: 'messageboard.sschub@outlook.com',
//         pass: 'sschub*messageboard1'
//     },
//     from: 'sender@outlook.com',
//     to: 'hkimar@connect.ust.hk',
//     subject: 'hi! there',
//     html: '<b>This is bold text</b>',
//     text: 'This is text version!',
//     onError: (e) => console.log(e),
//     onSuccess: (i) => console.log(i)
// });

import nodemailer from 'nodemailer';

var transporter = nodemailer.createTransport({
    // host: "smtp-mail.outlook.com", // hostname
    // secure: true,
    // port: 587, // port for secure SMTP
    // // tls: {
    // //     ciphers: 'SSLv3'
    // // },
    // auth: {
    //     user: 'messageboard.sschub@outlook.com',
    //     pass: 'sschub*messageboard1'
    // }
    service: 'hotmail',
    auth: {
        user: 'messageboard.sschub@outlook.com',
        pass: 'sschub*messageboard1'
    }
});

var mailOptions = {
    from: '"Our Code World " <mymail@outlook.com>', // sender address (who sends)
    to: 'hyeonjae42@gmail.com, hkimar@connect.ust.hk', // list of receivers (who receives)
    subject: 'Hello ', // Subject line
    text: 'Hello world ', // plaintext body
    html: '<b>Hello world </b><br> This is the first email sent with Nodemailer in Node.js' // html body
};

transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
        return console.log(error);
    }

    console.log('Message sent: ' + info.response);
});