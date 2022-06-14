// import nodemailer
const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const { OAuth2 } = google.auth;
const oauth_LINK = 'https://developers.google.com/oauthplayground';
const { EMAIL, MAILING_ID, MAILING_REFRESH, MAILING_SECRET } = process.env;

const auth = new OAuth2(MAILING_SECRET, MAILING_ID, MAILING_SECRET, oauth_LINK);

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
    html: '',
  };
  stmp.sendMail(mailOptions,(err,res) => {
    if (err) return err
    return res
  })
};
