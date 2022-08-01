import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import errorsMiddleware from "./src/middleware/errorsMiddleware.js";
import usersRouter from "./src/routes/userRoutes.js";

const router = express.Router();

router.route('/node')
  .get((req, res) => {
    res.send('Course node GET')
  })
  .post((req, res) => {
    res.send('Course node POST')
  })
  .put((req, res) => {
    res.send('Course node PUT')
  })
  .delete((req, res) => {
    res.send('Course node DELETE')
  })

router.all('/react', (req, res) => {
  res.send('We are not doing this now')
})

router.get('/test', (req, res, next) => {
  console.log('Another');
  res.send('Success')
})

dotenv.config();

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.json({ message: "ok" });
});

app.use('/courses', router);

app.use("/users", usersRouter);

app.use(errorsMiddleware);

app.listen(port, "0.0.0.0", () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
