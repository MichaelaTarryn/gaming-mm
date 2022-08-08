require('dotenv').config();
const express = require('express');
const db = require('./config/dbconn');
const router = require('./routes/routes');
const bodyParser = require('body-parser');
const path = require('path');
const {
    genSalt,
    hash
} = require('bcrypt');
// express app
const app = express();
// Router

const port = parseInt(process.env.PORT) || 4000;
app.use(router, express.json(), express.urlencoded({
    extended: true
}));
let staticPath = path.join(__dirname + "./public")
app.use(express.static(staticPath));

app.get('/', (req, res,next ) => {
    res.sendFile(path.join(staticPath, 'index.html'));
})

app.listen(port, ()=> {
    console.log(`http://localhost:${port}`);
})

// User registration
app.post('/register', bodyParser.json(), async (req, res) => {
    const bd = req.body;
    if (bd.userRole === "" || bd.userRole === null) {
        bd.userRole = "user";
    }
    const emailQ = "SELECT email from users WHERE ?";
    let email = {
        email: bd.email
    }
    db.query(emailQ, email, async (err, results) => {
        if (err) throw err;
        if (results.length > 0) {   
            res.json({
               alert:"Email Exists"
            });
        } else {
            // Encrypting a password
            // Default genSalt() is 10`
            bd.password = await hash(bd.password, 10);
            bd.id = await hash(bdid,10);

            // Query
            const strQry =
                `
    INSERT INTO users(fullName, phoneNumber, joinDate, email, password)
    VALUES(?, ?, ?, ?, ?);
    `;
            //
            db.query(strQry,
                [bd.fullName, bd.phoneNumber, bd.joinDate, bd.email, bd.password],
                (err, results) => {
                    if (err) throw err;
                    res.send(`you have registered successfully: ${results.affectedRows}`)
                    // res.send(window.location.href="login.html")
                    // res.sendFile(__dirname + "/login.html")
                    ;
                })
            }
        }
        )
    })

    //view all mysql data from users in localhost 
    router.get('/users',(req,res)=>{
        const strQry =
            `
        SELECT *
        FROM users;
        `;
        db.query(strQry, (err, results) => {
            if (err) throw err;
            res.json({
                status: 200,
                results: results
            })
        })
    });

    //token
    login: async (context, payload) => {
        const {
          email,
          userpassword
        } = payload;
        fetch("http://localhost:3000/login", {
            method: "POST",
            body: JSON.stringify({
              email: email,
              userpassword: userpassword
            }),
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            },
          })
          .then((response) => response.json())
          .then((data) => {
            alert(data.msg)
            let user = data.user
            context.commit("setuser", user);
          })
        // verify test
        fetch("http://localhost:3000/users/verify")
          .then((response) => response.json())
          .then((data) => {
            console.table(data)
          })
          .then(() => (context.dispatch("getProducts")))
          .then(() => (context.commit("setuser", user)))
          .then((data) => alert(data.msg))
      }
