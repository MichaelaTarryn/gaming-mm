try {
    let sql = "SELECT * FROM users WHERE ?";
    let user = {
      email: req.body.email,
    };
    con.query(sql, user, (err, result) => {
      if (err) throw err;
      if (result === 0) {
        res.status(400), res.send("Email not found");
      }
      // Allows a connection to the email given
      const transporter = nodemailer.createTransport({
        host: process.env.MAILERHOST,
        port: process.env.MAILERPORT,
        auth: {
          user: process.env.MAILERUSER,
          pass: process.env.MAILERPASS,
        },
      });
      console.log(transporter);
      // How the mail should be sent out
      const mailData = {
        from: process.env.MAILUSER,
        to: result[0].email,
        subject: "Password Reset",
        html: `<div>
            <h3>Hi ${result[0].full_name},</h3>
            <br>
            <h4>Click link below to reset your password</h4>
            <a href="http://localhost:6969/new-psw.html">
              Click Here to Reset Password
              user_id = ${result[0].user_id}
            </a>
            <br>
            <p>For any queries feel free to contact us...</p>
            <div>
              Email: ${process.env.MAILERUSER}
              <br>
              Tel: If needed you can add this
            <div>
          </div>`,
      };
      // Checks if the email can be sent
      // Checks given email in the .env file
      transporter.verify((error, success) => {
        if (error) {
          console.log(error);
        } else {
          console.log("Email valid! ", success);
        }
      });
      transporter.sendMail(mailData, (error, info) => {
        if (error) {
          console.log(error);
        } else {
          res.send("Please check your email");
        }
      });
    });
  } catch (error) {
    console.log(error);
  }
