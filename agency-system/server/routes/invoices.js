const express = require("express");
const router = express.Router();
const fs = require("fs");

const path = "./data/invoices.json";

router.get("/", (req, res) => {
  res.json(JSON.parse(fs.readFileSync(path)));
});

router.post("/", (req, res) => {
  const invoices = JSON.parse(fs.readFileSync(path));
  invoices.push(req.body);
  fs.writeFileSync(path, JSON.stringify(invoices, null, 2));
  res.status(201).json({ message: "Invoice created" });
});

module.exports = router;
