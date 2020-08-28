const express = require("express");
const mongoose = require("mongoose");
const six = require("./data/9.json");
const Year_2076 = require("./model/Year");
require("dotenv/config");
const app = express();

/***
DataBase Connect
****/
mongoose.connect(
  process.env.DATABASE_CONNECTION,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Connected to DB.");
  }
);
app.get("/", async (req, res) => {
  //   await pushMyData(req, res);
  await six.res.forEach(async (student) => {
    await pushMyData(req, res, student);
  });
  res.status(200).send("Submitted");
});

app.get("/delete/class/:className", (req, res) => {
  var className = req.params.className;
  //   await pushMyData(req, res);
  Year_2076.find({ class: `${className}` })
    .then((data) => {
      data.forEach((student) => {
        Year_2076.findByIdAndDelete(`${student._id}`)
          .then((deletedData) => {
            console.log(deletedData);
          })
          .catch((e) => console.error(e));
      });
      res.status(200).send(data);
    })
    .catch((e) => console.error(e));
});

app.get("/api/v1/getStudentData/:className", async (req, res) => {
  let className = req.params.className;
  //   await pushMyData(req, res);
  Year_2076.find({ class: `${className}` })
    .sort({ name: 1 }) //This '1' indicates ascending sort ( A-Z )
    //   .limit(15)  // Commenting this means No-LIMIT
    .then((data) => {
      console.log(`Fetched ${data.length} data. From class ${className} ❤`);
      res.status(200).send(data);
    })
    .catch((e) => console.error(e));
  //   res.status(200).send("Submitted");
});

// Listening To PORT
let port = process.env.PORT || 3000;
app.listen(3000, () => {
  console.log(`Listening @${port} Visit @ http://localhost:${port}/`);
});

async function pushMyData(req, res, student) {
  let individualStudentData = new Year_2076(student);
  try {
    // //save a user
    individualStudentData
      .save()
      .then((addedData) => {
        console.log("Added!");
      })
      .catch((e) => {
        console.error(e);
      });
    // const savedData = await individualStudentData.save();
    // console.log(`New Student having name ${savedData.name} registered.`);
    // res.send(savedData);
    // res.status(201).redirect('/page/poshakBhatta')
  } catch (e) {
    // res.status(400).send(e);
  }
}
