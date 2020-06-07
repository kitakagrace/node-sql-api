const express = require('express')
const mysql = require('mysql')
const app = express()
const port = 3000


app.use(express.json())

let mysqlconnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'apidb'
});

mysqlconnection.connect((err) =>{
    if (err) {
        console.log(err);
        
    }else{
        console.log('Succesfully connected');
// automatically create db table

        let createUserTable = `CREATE TABLE IF NOT EXISTS users(
            id int primary key auto_increment,
            user varchar(255)not null,
            hobby varchar(255)not null
        )`;

        mysqlconnection.query(createUserTable, (err,results,fields) =>{
            if (err) {
                throw err;
            }else{
                console.log('Table created');
                
            }
        })
        
    }
})
//all users
app.get('/get-users', (req,res)=>{
    let stmt = "SELECT * FROM users";
    mysqlconnection.query(stmt, (err,results) =>{
        if (err) {
            throw err;
        }else{
            console.log(results);
            res.json({
                data: results
            })
        }
    })
})

//sigle user
app.get('/get-single-user/:id', (req,res)=>{
    let stmt = "SELECT * FROM users WHERE id ="+ req.params.id;
    mysqlconnection.query(stmt, (err,results) =>{
        if (err) {
            throw err;
        }else{
            console.log(results);
            res.json({
                data: results
            })
        }
    })
})
// create user
app.post('/create-user', (req,res)=>{
    let data = {user: req.body.user,hobby: req.body.hobby}
    let stmt = "INSERT INTO users SET ?";
    mysqlconnection.query(stmt, data, (err,results,fields) =>{
        if (err) {
            throw err;
        }else{
            console.log(results);
            res.json({
                data: results
            })
        }
    })
})

//update single user
app.put('/get-single-user/:id', (req,res)=>{
    let stmt = "UPDATE users SET user='"+req.body.user+"', hobby='"+req.body.hobby+"' WHERE id="+req.params.id;
    mysqlconnection.query(stmt, (err,results) =>{
        if (err) {
            throw err;
        }else{
            console.log(results);
            res.json({
                data: results
            })
        }
    })
})

//delete single user
app.delete('/get-single-user/:id', (req,res)=>{
    let stmt = "DELETE FROM  users WHERE id="+req.params.id+"";
    mysqlconnection.query(stmt, (err,results) =>{
        if (err) {
            throw err;
        }else{
            console.log(results);
            res.json({
                data: results
            })
        }
    })
})

app.listen(process.env.port || port, (req,res) =>{
    console.log(`Running at port: ${port}`);
    
})