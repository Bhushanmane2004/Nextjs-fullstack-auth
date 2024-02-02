import express  from "express";
import bodypraser from "body-parser";
import mysql from "mysql2";

const app = express();
const port = 3000;

app.use(bodypraser.urlencoded({extended: true}));
app.use(express.static("public"));

const Db =mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"Bhushan@01",
    database:"Login",
    insecureAuth : true
});



app.get("/",(req,res)=>{
   
 res.render("login.ejs");
});



app.post("/login",(req,res)=>{
    const username= req.body.username;
    const password=req.body.password;
    // console.log(username);
    // console.log(password);
    Db.connect((err)=>{
        if(err){
            console.log(err);
        }
        else{
            const result= Db.connect("Select * from User Where Username=?",[username],(err,result)=>{
                if (err) throw err;
                    if(result>0){
                        console.log("User Exists");
                    }
                    else{
                    Db.query("Insert Into User(Username,Password) Values(?,?)",[username,password],(err,result)=>{
                        if(err) throw err;
                        console.log(result);
                    });
                }
                
            });
          
        }
    });

    res.render("login.ejs");

});

app.listen(port,()=>{
    console.log(`Server running on port ${port}`);
});