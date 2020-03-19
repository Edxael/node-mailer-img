const express = require('express');
const app = express()
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
require('dotenv/config')

// =================================================================
// const emailRecipients = 'zerphyr.r@gmail.com, edmundo.rubio@chghealthcare.com, joseph.vanwagoner@chghealthcare.com'
const emailRecipients = 'zerphyr.r@gmail.com'

const imgName = "02-dev.jpg";
const imgPath = './img/02-dev.jpg';
const imgIdentifier = "tphTkc123";

const emailBody = `<html>
<h1>ImgeStreamer</h1>
<h3>CHG HackDay Project</h3>
<p>Here is the information</p>
<img src="cid:${imgIdentifier}"  alt="HackDay Picture"/>
<p>By: Joseph VanWagoner & Edmundo Rubio</p>
</html>`

async function main() {

    let transporter = nodemailer.createTransport({
      host: process.env.EMAIL_SERVER_HOST,
      port: process.env.EMAIL_SERVER_PORT,
      secure: true, 
      auth: {
        user: process.env.EMAIL_SERVER_USER, 
        pass: process.env.EMAIL_SERVER_PASS 
      }
    });

    let info = await transporter.sendMail({
      from: '"ImgeStreamer 🚀" <imgstream@zyphex.com>', // sender address
      to: emailRecipients,
      subject: "ImgeStreamer CHG-HackDay 💻", // Subject line
      html: emailBody, 
      attachments: [{
        filename: imgName,
        path: imgPath,
        cid: imgIdentifier //same cid value as in the html img src
    }]
    });
  
    console.log("Message sent: %s", info.messageId);    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  }
  
// =================================================================



app.get('/', (req, res) => {
    main().catch(console.error);
    res.send('E-Mail Sent 2 ')
})

app.listen(3030, () => {
    main().catch(console.error);
    console.log("server running... and email send")
})