const express = require("express");
const router = express.Router();
const fs = require("fs");

router.post("/login", (req, res) => {
  const admin = JSON.parse(fs.readFileSync("./data/admin.json"));
  const { username, password } = req.body;

  if (username === admin.username && password === admin.password) {
    res.json({ success: true });
  } else {
    res.status(401).json({ success: false });
  }
});

module.exports = router;
