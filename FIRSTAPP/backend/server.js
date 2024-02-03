const express=require("express")
const mysql=require("mysql")
const cors=require("cors")
const morgan = require('morgan')
let app=express();
app.use(cors());
app.use(express.json());

//mysql connection
const db=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"Root",
    database:"login"
})
app.use(morgan('dev'))
app.get("/Test", (req,resp)=>{
    resp.send("Test Case Success")
})

app.post('/signup',(req,resp)=>{
    const sql="INSERT INTO signup (name,email,password) VALUES (?,?,?)";
    const values=[
        req.body.name,
        req.body.email,
        req.body.password
    ]
    console.log(values)
    db.query(sql,values ,(err,data)=>{
        console.log(err)
        if(err){
            return resp.json(err)
            
        }
        console.log(data)
        return resp.send(data);
    })
})

app.post('/login',(req,resp)=>{
    const sql="SELECT * FROM signup WHERE email=? AND password=?";

    db.query(sql,[req.body.email,req.body.password],(err,data)=>{
        if(err){
            return resp.json(err)
        }
        if(data.length>0){
            return resp.json("Success")
        }
        else{
            return resp.json("Falied")
        }
    })
})

app.listen(8081,'127.0.0.1',()=>{
    console.log("listening")
})