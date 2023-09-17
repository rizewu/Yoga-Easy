const express = require("express");
const app = express();
const mongoose = require("mongoose");
//const UserModel = require("./models/Users");
const TestModel = require("./models/testing");
const RegisterModel = require("./models/register");
const BookingModel = require("./models/booking");
const AdminModel = require("./models/admin");
const TeacherModel = require("./models/teacher");
const RteacherModel = require("./models/RegisteredTeachers");
const PackageModel = require("./models/package");
const BlogModel = require("./models/blogs");
const ClassModel = require("./models/class");
const ContactModel = require("./models/contact");
const YogaidModel = require("./models/yogaid");
const ReviewModel = require("./models/review");
var bodyParser = require('body-parser')
var nodemailer = require('nodemailer');

const stripe = require('stripe')('sk_test_51N4SHcSHIzORDD4VxPjTM3sNPPTK893XC4eXRInqoVdg0QWzxPu124dHcoHx1R2VIERsf3nySgPmOu1MtQ18OJ4400U0Y2YYZH')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

const cors = require("cors");
const TestingModel = require("./models/testing");

app.use(express.json());
app.use(cors());
app.set("view engine", "ejs");
app.set("views", "./views")

mongoose.connect(
  "mongodb+srv://admin:admin@cluster0.08lzzzh.mongodb.net/college", {
  useNewUrlParser: true,

}
);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});
app.get("/", (req, res) => {

  res.render("adminlogin")
})

app.get("/dashboard", (req, res) => {

  res.render("admin")
})

app.get("/addpackage", (req, res) => {

  res.render("addpackage")
})

app.get("/addTeachers", (req, res) => {  // rteacher model lgna hai
 
  res.render("addTeachers")
})


// app.get("/editUser/:id", (req, res) => {
//   console.log(req.params.id)
//   RegisterModel.findOne({_id:req.params.id}).then((data) => {
//     // res.json(data);
//     console.log(data)
//     res.render("edituser", { usdata: data })
//   })
  
 
// })



app.get("/getUsers", (req, res) => {

  res.render("allUsers")
})

app.post("/admin", (req, res) => {

  AdminModel.find({ username: req.body.uname }).then((data) => {
    console.log(data);
    if (data.length > 0) {
      res.redirect("dashboard")
    }
    else {
      res.redirect("/")
    }

  })
})
app.get("/getUSERS",(req,res)=>{
RegisterModel.find().then((data)=>{
  res.json(data);
})

})

 

app.get("/getAllbookings", (req, res) => {
  BookingModel.find().then((data) => {
    // res.json(data);

    res.render("allBooking", { udata: data })
  })
});

app.get("/getAllusers", (req, res) => {
   let ustatus = req.query.valid
   console.log(ustatus)
  RegisterModel.find().then((data) => {
    // res.json(data);
    
    res.render("allUsers", { usdata: data, msg:ustatus})
  })
});

app.get("/getTeacherRequest", (req, res) => {   // teacher model
  TeacherModel.find().then((data) => {

    res.render("TeacherRequest", { tdata: data })
  })
});

app.get("/getPackages", (req, res) => {
  PackageModel.find().then((data) => {

    res.render("allpackages", { udata: data })
  })
});
app.get("/getAllteachers", (req, res) => { 
  let tstatus = req.query.valid
  console.log(tstatus)
  RteacherModel.find().then((data) => {

    res.render("allTeachers", { tdata: data,msg:tstatus })
  })
});






app.post("/register", async (req, res) => {
  console.log(req.body.userReg)

  const newUReg = new RegisterModel(req.body.userReg);
  await newUReg.save();

  //const newUser1 = new RegisterModel(req.body);
  await newUReg.save();

  // res.json(user);
  //res.redirect("/")

})

app.get("/editUser/:id", (req, res) => {
  console.log(req.params.id)
  RegisterModel.findOne({_id:req.params.id}).then((data) => {
    // res.json(data);
    console.log(data)
    res.render("edituser", { usdata: data })
  })
  
 
})



app.post("/updateUser", async (req, res) => {
  let string ="ok"
  const updatedDocument = await RegisterModel.findOneAndUpdate({_id:req.body.uid}, req.body, {
    upsert: true,
    new: true,
  })
  console.log(updatedDocument, req.body.uid)
  res.redirect("getAllusers?valid=" + string)

})

// app.get('/deleteUser/:id', function(req, res, next) {
//   RegisterModel.findByIdAndDelete(req.params.id, (err, doc) => {
//       if (!err) {
//           res.redirect('/allUsers');
//       } else {
//           console.log('Failed to Delete user Details: ' + err);
//       }
//   });
// })
app.get("/removeUser/:rid",(req,res)=>{
  RegisterModel.findOneAndRemove({_id: req.params.rid}).then((data)=>{
    res.redirect("/getAllusers")
  })
})


app.post("/booking", async (req, res) => {
  console.log(req.body.userbook)
  return false

  const newBook = new BookingModel(req.body.userbook);
  await newBook.save();

})

app.post("/teacher", async (req, res) => {   // teacher model connected with frontend 
  console.log(req.body.teacher)
 
  const newTeacher = new TeacherModel(req.body.teacher);    
  await newTeacher.save();

})


app.post("/createpackages",async(req,res)=>{
  console.log(req.body)
  const pack=req.body;
  const newPack = new PackageModel(req.body);
  await newPack.save();

// res.json(pack);
})
app.post("/createTeacher",async(req,res)=>{   //creating new object in registered teachers (rteach)
  console.log(req.body)
  const teach=req.body;
  const newTeach = new RteacherModel(req.body);
  await newTeach.save();

// res.json(pack);
})

app.post("/create", async (req, res) => {
  //console.log(req.body)
  //testing 
  const user = {
    username: "Ravi@ghgh",
    password: 37,

  };
  const newUser = new TestModel(req.body);
  await newUser.save();

  const newAd = new AdminModel(req.body);
  await newAd.save();

  const newUser1 = new RegisterModel(req.body);
  await newUser1.save();

  const newBook = new BookingModel(req.body);
  await newBook.save();

  // const newPack = new PackageModel(req.body);
  // await newPack.save();

  const newTeacher = new TeacherModel(req.body);
  await newTeacher.save();

  // res.json(user);
  res.redirect("/")
});

app.listen(5050, () => {
  console.log("SERVER RUNS PERFECTLY! hghgh");
});

app.get("/getMentors",(req,res)=>{
RteacherModel.find().then((data)=>{
  res.json(data);
})

});
app.get("/getsingleMentor/:uid",(req,res)=>{
  RteacherModel.find({_id:req.params.uid}).then((data)=>{
  res.json(data);
  })
  
  })

//blogs
app.get("/addblogs", (req, res) => {

  res.render("addBlogs")
})

app.post("/createblogs",async(req,res)=>{
  console.log(req.body)
  const blog=req.body;
  const newblog = new BlogModel(req.body);
  await newblog.save();

// res.json(pack);
})
app.get("/getallBlogs", (req, res) => {
  BlogModel.find().then((data) => {

    res.render("allBlogs", { udata: data })
  })
});

app.get("/getBlogs",(req,res)=>{
  BlogModel.find().then((data)=>{
    res.json(data);
  })
  
  });
   
app.get("/getsingleblogs/:uid",(req,res)=>{
BlogModel.find({_id:req.params.uid}).then((data)=>{
res.json(data);
})

})
// edit teacher
app.get("/editTeacher/:id", (req, res) => {
  console.log(req.params.id)
  RteacherModel.findOne({_id:req.params.id}).then((data) => {
    // res.json(data);
    console.log(data)
    res.render("editTeacher", { tdata: data })
  })
  
 
})

app.post("/updateTeacher", async (req, res) => {
  let string ="ok"
  const updatedDocument = await RteacherModel.findOneAndUpdate({_id:req.body.tid}, req.body, {
    upsert: true,
    new: true,
  })
  console.log(updatedDocument, req.body.tid)
  res.redirect("/getAllteachers?valid=" + string)

})
// packages
app.get("/getpacks",(req,res)=>{
  PackageModel.find().then((data)=>{
    res.json(data);
  });
  
  });

  app.post("/loginuser", async (req, res) => {
    let string ="ok"
    RegisterModel.find({email:req.body.email, password:req.body.pass}).then((data)=>{
      res.json(data);
      console.log(data)
    });
    //console.log(req.body)
  
  })
  app.get("/getsinglePackages/:uid",(req,res)=>{
    PackageModel.find({_id:req.params.uid}).then((data)=>{
    res.json(data);
    })
    
    })

    app.post('/create-checkout-session', async (req, res) => {

      console.log(req.body)
    const newBook = new BookingModel(req.body);
     await newBook.save();
      //return false
      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            price_data: {
              currency: 'inr',
              product_data: {
                name: req.body.submit,
              },
              unit_amount: req.body.package*100,
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: 'http://localhost:3000/paymentsuccess',
        cancel_url: 'http://localhost:4242/cancel',
      });
    
      res.redirect(303, session.url);
    });

    //classes

    app.get("/addClass", (req, res) => {

      res.render("addClass")
    })
    
    app.post("/createclass",async(req,res)=>{
      console.log(req.body)
      const clas=req.body;
      const newclas = new ClassModel(req.body);
      await newclas.save();
    
    // res.json(pack);
    })
    app.get("/getallClass", (req, res) => {
      ClassModel.find().then((data) => {
    
        res.render("allClass", { udata: data })
      })
    });
    
    app.get("/getClass",(req,res)=>{
      ClassModel.find().then((data)=>{
        res.json(data);
      })
      
      });

      //  contact us
      app.post("/contactus", async (req, res) => {
        console.log(req.body.contactus)
      
        const newcont = new ContactModel(req.body.contactus);
        await newcont.save();
      
      })
      app.get("/getallContactus", (req, res) => {
        ContactModel.find().then((data) => {
      
          res.render("allcontactus", { udata: data })
        })
      });


      
      app.get("/getUsers1/:uid", (req, res) => {
 RegisterModel.find({_id:req.body.uid}).then((data) => {  //Admin dashboard
        res.json(data);
    
       })
});


// edit user profile in frontend
app.get("/editprof", (req, res) => {
  console.log(req.params.id)
  RegisterModel.findOne({_id:req.params.id}).then((data) => {
    // res.json(data);
    console.log(data)
    // res.render("editTeacher", { tdata: data })
  })
  
 
})
app.post("/updateProf", async (req, res) => {
  // let string ="ok"
  const updatedDocument = await RegisterModel.findOneAndUpdate({_id:req.body.tid}, req.body, {
    upsert: true,
    new: true,
  })
  console.log(updatedDocument, req.body.tid)
  // res.redirect("/getAllteachers?valid=" + string)

})

// reviews
app.post("/review", async (req, res) => {
  console.log(req.body.review)

  const newrev = new ReviewModel(req.body.review);
  await newrev.save();

})
app.get("/getallReviews", (req, res) => {
  ReviewModel.find().then((data) => {

    res.render("allreviews", { udata: data })
  })
});

app.get("/reviews",(req,res)=>{
  ReviewModel.find().then((data)=>{
    res.json(data);
  })
  
  });

//forgot password
app.post("/mail",async (req,res)=>{
  //console.log(req.body.tomail)
  RegisterModel.find({email:req.body.tomail}).then((data)=>{
    console.log(data.length);
    if(data.length<1){
    res.status(200).json({message: 'Email not found', type: 'fail'})

  }
    else {

 
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'ishachaudhary3699@gmail.com',
      pass: 'ejskksrozpnulyxh'
    }
  });
  
  var mailOptions = {
    from: 'ishachaudhary3699@gmail.com',
    to:   `${data[0].email}`,
    subject: 'Sending Email using Node.js',
    text: `That was easy! ${data[0].password}`
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
  res.status(200).json({message: 'Emain successfull sent!', type: 'success'})
    }
      })
    })

//get my bookings to frontend

app.get("/getMyBookings/:userid", (req, res) => {
  console.log(req.params.userid)
  BookingModel.find({user_id:req.params.userid}).then((data) => {
    res.json(data);
    // console.log(data)
    
  })
})

app.get("/getMyPackage", (req, res) => {
  console.log(req.params.id)
  PackageModel.find().then((data) => {
    res.json(data);
    // console.log(data)
    
  })
})

app.get("/getMyTeacher", (req, res) => {
  console.log(req.params.id)
  RteacherModel.find().then((data) => {
    res.json(data);
    // console.log(data)
    
  })
})
// RegisterModel.find({_id:req.body.uid}).then((data) => {  //Admin dashboard
//   res.json(data);

//get yoga id to the booking form
// app.post("/passonid", async (req, res) => {
//   console.log(req.body.teacher)

//   const newyid = new YogaidModel(req.body.teacher);
//   await newyid.save();

// })
// app.get("/getallContactus", (req, res) => {
//   ContactModel.find().then((data) => {

//     res.render("allcontactus", { udata: data })
//   })
// });


// teacher panel login
app.post("/tloginuser", async (req, res) => {
  let string ="ok"
  RteacherModel.find({email:req.body.email, phone:req.body.phone}).then((data)=>{
    res.json(data);
    console.log(data)
  });
  //console.log(req.body)
})

