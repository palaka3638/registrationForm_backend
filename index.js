const express = require("express");
const bodyparser = require("body-parser");
const app = express();
const cors = require("cors");
const router = require("../RegFormBackend/routes/route");
const connectionDB = require("./db/db");

app.use(cors());

app.use(express.json());

app.use("/", router);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
