// import nodemailer
const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const { OAuth2 } = google.auth;
const oauth_LINK = 'https://developers.google.com/oauthplayground';
const { EMAIL, MAILING_ID, MAILING_REFRESH, MAILING_SECRET } = process.env;

const auth = new OAuth2(MAILING_ID, MAILING_SECRET, MAILING_REFRESH, oauth_LINK);

exports.sendVerificationEmail = (email, name, url) => {
  auth.setCredentials({
    refresh_token: MAILING_REFRESH,
  });
  const accessToken = auth.getAccessToken();
  //STMP
  const stmp = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      // USER from env
      user: EMAIL,
      clientId: MAILING_ID,
      clientSecret: MAILING_SECRET,
      refreshToken: MAILING_REFRESH,
      accessToken,
    },
  });

  const mailOptions = {
    from: EMAIL,
    // to email passed into param
    to: email,
    subject: 'Facebook/Meta verfication',
    // below is compressed html
    html:  ` <body> <div style=" max-width: 700px; margin-bottom: 1rem; display: flex; align-items: center; font-family: Roboto; font-weight: 600; gap: 1.5rem; font-size: 20px; margin: auto; " > <img width="90px" height="80px" src="https://img.welt.de/img/wirtschaft/gruenderszene/mobile234788310/7601350557-ci16x9-w1200/Facebook-Rebranding.jpg" alt="" /> <span>Facebook Project By Jamal : Activate your Facebook account </span> </div> <div style=" padding: 2.5rem; border-top: 6px solid; border-bottom: 6px solid; color: #141823b5; font-size: 25px; font-family: Roboto; font-weight: 550; " > <span>Hello ${name}</span> <div style="padding: 20px 0"> <span style="padding: 1.5rem 0"> You recently created an account on Facebook. To complete your registration , please confirm your account </span> </div> <a href=${url} style=" width: 200px; padding: 10px 20px; color: black; background: #92b3ff; text-decoration: none; font-weight: 500; border-radius: 5px; " >Confirm Account</a > <br /> <div style="padding-top: 25px ;font-size: 15px;" > <span style="margin:1rem 1;color: #898f9c;"> Facebook allows you to stay in touch with all your freinds ! </span> </div> </div>`,
  };
  stmp.sendMail(mailOptions,(err,res) => {
    if (err) return err
    return res
  })
};
