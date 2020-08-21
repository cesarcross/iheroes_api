// require("dotenv").config();

const cors = require("cors");
const express = require("express");
const app = express();
const mongoose = require("mongoose");

mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Conectado ao banco de dados"));

app.use(express.json());

app.use(
  cors({
    credentials: true,
    origin: true,
  })
);

app.options("*", cors());

const usersRouter = require("./routes/users");
app.use("/users", usersRouter);

const threatsRouter = require("./routes/threats");
app.use("/threats", threatsRouter);

const heroesRouter = require("./routes/heroes");
app.use("/heroes", heroesRouter);

app.get("/", (req, res) => res.send("Working!!!"));

app.listen(process.env.PORT || 5000, () => console.log("funcionando no ar"));
