const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(cors()); 


const DATA_FILE = path.join(__dirname,"data.json");

if(!fs.existsSync(DATA_FILE)){
fs.writeFileSync(DATA_FILE,"[]");
}

app.use(express.json());

app.use(express.static(path.join(__dirname,"public")));


app.get('/favicon.ico',(req,res)=>res.status(204).end());



app.get('/api/entries',(req,res)=>{

try{

const data =
JSON.parse(fs.readFileSync(DATA_FILE,"utf8"));

res.json(data);

}catch{

res.status(500).json({
error:"خطا در خواندن داده"
});

}

});


app.post('/api/entries',(req,res)=>{

try{

const {type,dayNumber,relative}=req.body;

if(!type || !dayNumber || !relative){

return res.status(400).json({
error:"تمام فیلدها الزامی هستند"
});

}

const dayNum = Number(dayNumber);

if(dayNum<1 || dayNum>16){

return res.status(400).json({
error:"عدد باید بین 1 تا 16 باشد"
});

}

const data =
JSON.parse(fs.readFileSync(DATA_FILE,"utf8"));

if(
data.some(
x=>x.type===type &&
x.dayNumber===dayNum
)
){

return res.status(400).json({
error:"قبلاً ثبت شده"
});

}

const newEntry={

type,
dayNumber:dayNum,
relative

};

data.push(newEntry);

fs.writeFileSync(
DATA_FILE,
JSON.stringify(data,null,2)
);

res.json(newEntry);

}catch{

res.status(500).json({
error:"خطا در افزودن"
});

}

});



app.delete('/api/entries',(req,res)=>{

try{

const {type,dayNumber}=req.body;

const dayNum=Number(dayNumber);

let data=
JSON.parse(fs.readFileSync(DATA_FILE,"utf8"));

const newData=data.filter(

x=>!(
x.type===type &&
x.dayNumber===dayNum
)

);

fs.writeFileSync(

DATA_FILE,
JSON.stringify(newData,null,2)

);

res.json({success:true});

}catch{

res.status(500).json({
error:"خطا در حذف"
});

}

});


app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
