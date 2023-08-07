const express = require("express");
const UserModel = require("../Models/userModel");
const AddPassWord = require("../Models/addPassWord");

const router = express.Router();

router.get("/gett", async (req, res) => {
  res.send("hello...");
});

router.post("/signup", async (req, res) => {
  const data = new UserModel({
    name: req.body.name,
    password: req.body.password,
  });
  const mydata = await UserModel.find({ name: req.body.name });
  if (mydata.length > 0) {
    const response = {
      message: `Username ${req.body.name}, Already exist`,
    };
    res.status(400).json(response);
  } else {
    try {
      const dataToSave = await data.save();
      res.status(200).json(dataToSave);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
});

router.post("/login", async (req, res) => {
  const username = req.body.name;
  const pass = req.body.password;
  const mydata = await UserModel.find({ name: username, password: pass });
  if (mydata.length === 1) {
    const response = {
      message: "auth successful",
      id: mydata[0]._id,
    };
    res.status(200).json(response);
  }
  if (mydata.length === 0) {
    const response = {
      info: "auth successful",
    };
    res.status(400).json({ message: "incorrect Id pas" });
  }
});

router.post("/addPassword", async (req, res) => {
  const { username, webpassword, webUrl, userId } = req.body;
  const mydata = await UserModel.findOne({ _id: userId }); //getId
  console.log(mydata._id);
  const data = new AddPassWord({
    username: username,
    webpassword: webpassword,
    webUrl: webUrl,
    userId: mydata._id,
    userIdName: userId,
  });

  try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/passwordList/:id", async (req, res) => {
  console.log(req.headers);

  try {
    const username = req.params.id;
    const mydata = await AddPassWord.find({ userId: username }); //getId
    console.log(mydata);
    res.status(200).json(mydata);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
