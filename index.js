// const express = require("express");
// const app = express();

// app.use(express.json({ extended: false }));

// const PORT = process.env.PORT || 8080;
// app.listen(PORT, () => console.log(`Server is running in port ${PORT}`));

require("dotenv").config();
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const cors = require("cors");
const product = require("./api/product");
const jwtSecret = process.env.JWT_SECRET;
const router = require("./src/routes/router");

const app = express();

const CorsOptions = {
  Credentials: true,
};

app.use(cors(CorsOptions));
app.use(morgan("tiny"));

//serve static files from react app
app.use(express.static(path.join(__dirname, "react/build")));
app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cookieParser(jwtSecret));

app.get("/", (req, res) => {
  res.json({ message: "ok" });
});
// app.use("/api", router);
app.use("/api/product", product);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/react/build/index.html"));
});

/* Error handler middleware */
// app.use((err, req, res, next) => {
//     const statusCode = err.statusCode || 500;
//     console.error(err.message, err.stack);
//     res.status(statusCode).json({ message: err.message });

//     return;
// });
module.exports = app;
