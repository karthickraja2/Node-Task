import express from "express";
import fs from "fs";
import path from "path";
import { format } from "date-fns";


const app = express();
const PORT = 4200;



app.post("/Create",(req,res)=>{
    let today = format(new Date(),"dd-mm-yyyy-hh-mm-ss");
  console.log(("today",today))

  const filePath = `Timestamp/${today}.txt`;

  fs.writeFileSync(filePath,`${today}`,"utf8");
  res.status(200).json({msg: "Created file sucessfully"});
});

app.get("/getfiles",(req,res)=>{
     
    const filePath ="Timestamp";

    fs.readdir(filePath,(err,files)=>{
        if(err){
            console.log(err);
            res.status(500).send("error on reading file");
            
        }else{
            const textFiles = files.filter((file)=> path.extname(file)=== '.txt');
            res.status(200).json(textFiles);
        }
    });
});

app.listen(PORT,()=>{
console.log(`Port is running on :${PORT}`);
});