import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import notFound from "./controllers/notfound.js";
import { postUser } from "./controllers/index.js";
import expressCallback from "./callback/index.js"

dotenv.config();

// global variables
const port = 3000;

const app = express();
app.use(bodyParser.json());
app.use((_, res, next) => {
  res.set({ Tk : '!' })
  next()
})

// handle POST /users
app.post(`/users`, expressCallback(postUser))

// test base url
app.get("/", (_req, res) => {
  res.json({ error: false, msg: "It works !" });
});

// ketika terjadi kesalahan, dan function sebelumnya nge-thrown error
// dihandle di sini. return response code eror 500
app.use((err, req, res, next) => {
  console.error(
    `${err.status || 500} - ${res.statusMessage} - ${req.originalUrl} - ${
      req.method
    } - ${req.ip} - origin: ${req.origin}`
  );

  // error handler
  if (res.headersSent) {
    return next(err);
  }

  res.status(500);
  res.json({ error: true, msg: err.message });
});


// jika semua routes tidak ada yang match, kasih error 404 not found
app.use(expressCallback(notFound))

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
})

export default app
