const express=require('express');
const cors=require('cors')
const mysql=require('mysql')

const app=express();
app.use(cors());

const db=mysql.createConnection({
    host:"localhost",
    user:'root',
    password:'Root',
    database:'crud'
})

app.get('/',(req,resp)=>{
    const sql='select * from employee';
    db.query(sql,(err,data)=>{
        if(err) return resp.json("Error")
        return resp.json(data)
    })
})
app.listen(8081,()=>{
    console.log("listening")
})