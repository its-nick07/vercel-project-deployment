const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
const port = 8000;
const cors = require("cors");
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose
  .connect(
    "mongodb+srv://nickwilliamsxx:9pF3W6y2A1tFDzWU@cluster0.0yewz3q.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("Connected To MongoDB");
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB", error);
  });

app.listen(port, () => {
  console.log("Server is running on port 8000");
});

const Member = require("./models/member");

//Endpoint to register members
app.post("/addMember", async (req, res) => {
  try {
    const { memberName, memberEmail, phoneNumber } = req.body;

    //Create A New Member
    const newMember = new Member({
      
      // memberId,
      memberName,
      memberEmail,
      phoneNumber,
    });

    await newMember.save();

    res.status(201).json({
      message: "Member has been saved successfully",
      member: newMember,
    });
  } catch (error) {
    console.log("Error regestering member", error);
    res.status(500).json({
      message: "Failed to add member",
    });
  }
});

//Endpoint to fetch all the members
app.get("/members", async (req, res) => {
  try {
    const members = await Member.find();
    res.status(200).json(members);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve the member" });
  }
});
