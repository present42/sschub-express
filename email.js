import nodeoutlook from 'nodejs-nodemailer-outlook'

nodeoutlook.sendEmail({
    auth: {
        user: 'messageboard.sschub@outlook.com',
        pass: 'sschub*messageboard1'
    },
    from: 'sender@outlook.com',
    to: 'hkimar@connect.ust.hk',
    subject: 'hi! there',
    html: '<b>This is bold text</b>',
    text: 'This is text version!',
    onError: (e) => console.log(e),
    onSuccess: (i) => console.log(i)
});