const express=require('express');
const { MongoClient } = require('mongodb');

//to POST API
const cors=require('cors');

//to deleting id
const ObjectId=require('mongodb').ObjectId;
const app=express();
const port=5000;
//user:mudbuser1
//password:3w.JtcTbSun8MRc


//middleWare
app.use(cors());
app.use(express.json());


const uri = "mongodb+srv://mudbuser1:3w.JtcTbSun8MRc@cluster0.dyo1y.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


async function run(){
  try{
    await client.connect();
    const database=client.db('foodMaster');
    const useCollection=database.collection('users');


    //GET API
    app.get('/users',async(req,res)=>{
      const cursor=useCollection.find({});
      const users=await cursor.toArray();
      res.send(users);
    });

    //UPDATE API
    app.get('/users/:id',async(req,res)=>{
      const id=req.params.id;
      const query={_id:ObjectId(id)};
      const user = await useCollection.findOne(query);

      // console.log('load user with id',id);
      // res.send('getting soon');
      res.send(user);
    })

    //POST API
    app.post('/users',async(req,res)=>{
      const newUser=req.body;
      const result=await useCollection.insertOne(newUser);
      // console.log('got new user',req.body);
      // res.send('added user',res.result);
      res.json(result);
    });

    //DELETE API
    app.delete('/users/:id',async(req,res)=>{
      const id=req.params.id;
      //SELECT ID TO DELETING
      const query={_id:ObjectId(id)};
      const result = await useCollection.deleteOne(query);
      // console.log('Deleting users with id',result);
      res.json(result);
    })

  }
  finally{
    // await client.close();
  }
}

run().catch(console.dir)

app.get('/',(req,res)=>{
    res.send('Running My CURD Server');
});

app.listen(port,()=>{
    console.log('Running Server in port',port);
  
})