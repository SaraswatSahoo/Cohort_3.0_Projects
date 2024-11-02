const express = require("express");
const app = express();

const fs = require('fs');

app.use(express.json());

app.post('/',function(req,res){
    const taskData = req.body;
    fs.readFile("task.json", (err, data) => {
        if(err){
            console.log(err);
            res.status(400).send("Not Successfull");
        } else {
            const dataFromFile = JSON.parse(data);
            dataFromFile.push(taskData);
            fs.writeFile("task.json", JSON.stringify(dataFromFile, null, 4), (err) => {
                if(err) {
                    console.log(err);
                    res.status(400).send("Not Successfull");
                } else res.status(200).send("Successfull");
            })
        }
    })
})

app.put('/',function(req,res){
    const taskData = req.body;
    fs.readFile("task.json", (err, data) => {
        if(err){
            console.log(err);
            res.status(400).send("Not Successfull");
        } else {
            const dataFromFile = JSON.parse(data);
            dataFromFile.map((item) => {
                if(item.id === taskData.id) item.mark = taskData.mark;
            })
            fs.writeFile("task.json", JSON.stringify(dataFromFile, null, 4), (err) => {
                if(err) {
                    console.log(err);
                    res.status(400).send("Not Successfull");
                } else res.status(200).send("Successfull");
            })
        }
    })
})

app.delete('/', function(req,res){
    const taskData = req.body;
    fs.readFile("task.json", (err, data) => {
        if(err){
            console.log(err);
            res.status(400).send("Not Successfull");
        } else {
            let dataFromFile = JSON.parse(data);
            dataFromFile = dataFromFile.filter( (item) => item.id !== taskData.id);
            fs.writeFile("task.json", JSON.stringify(dataFromFile, null, 4), (err) => {
                if(err) {
                    console.log(err);
                    res.status(400).send("Not Successfull");
                } else res.status(200).send("Successfull");
            })
        }
    })
})

app.get('/',function(req,res){
    fs.readFile("task.json",(err, data) => {
        if(err) {
            console.log(err);
            res.status(400).send("Not Successfull");
        } else {
            res.status(200).send(data);
        }
    })
})

app.listen(4000);