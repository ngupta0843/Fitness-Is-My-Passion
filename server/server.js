const express = require("express");
const bodyParser = require("body-parser");
const { spawn } = require('child_process');
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes.js");
const mlRoutes = require("./routes/mlRoutes.js");
const postRoutes = require("./routes/postRoutes.js");
const commentRoutes = require("./routes/commentRoutes.js");

dotenv.config();

const corsOptions = {
  origin: "*",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(bodyParser.json({ limit: "30mb", extended: true }));

app.use("/users", userRoutes);
app.use("/ml", mlRoutes);
app.use("/posts", postRoutes);
app.use("/comment", commentRoutes);

/*
app.get('/ml', (req, res) => {
  const { indata, type } = req.query;

  // Validate inputs
  if (!indata || !type) {
    return res.status(400).send({ error: "Missing required query parameters: indata and type" });
  }

  // Decode in case any URL encoding is used
  const decodedIndata = decodeURIComponent(indata);
  const decodedType = decodeURIComponent(type);

  console.log(`Received request with indata: ${decodedIndata} and type: ${decodedType}`);

  // Validate type value
  if (decodedType !== 'd' && decodedType !== 'w') {
    return res.status(400).send({ error: "Invalid 'type' value. It must be 'd' or 'w'." });
  }

  // Call the Python script using spawn
  const pythonProcess = spawn('python', ['./ML/venv/gpt.py', decodedIndata, decodedType]);

  pythonProcess.stdout.on('data', (data) => {
    const result = data.toString().trim();
    res.send({ result });
  });

  pythonProcess.stderr.on('data', (data) => {
    console.error('Error:', data.toString());
    res.status(500).send({ error: 'Error executing Python script' });
  });

  pythonProcess.on('error', (err) => {
    console.error('Error spawning Python process:', err);
    res.status(500).send({ error: 'Error spawning Python process' });
  });
});
*/

mongoose
  .connect(process.env.CONNECTION_URL)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port: ${process.env.PORT}`);
    });
  })
  .catch((error) => console.log(error.message));
