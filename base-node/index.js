var express = require('express'),
  app = express(),
  port = process.env.PORT || 3001,
  mongoose = require('mongoose'),
  bodyParser = require('body-parser');
  cors = require('cors')
mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://user:dauxanh09@cluster0.2w1k1.mongodb.net/?retryWrites=true&w=majority',
{useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }).then(() => {
  console.log("Connected !!!")
}).catch(err => {
  console.log(err);
});

app.use(cors({}))

res.setHeader("Access-Control-Allow-Origin", "*");
		res.setHeader("Access-Control-Allow-Credentials", "true");
		res.setHeader("Access-Control-Max-Age", "1800");
		res.setHeader("Access-Control-Allow-Headers", "content-type");
		res.setHeader("Access-Control-Allow-Methods","PUT, POST, GET, DELETE, PATCH, OPTIONS");

app.use(bodyParser.json());

var routes = require('./api/route');
routes(app);

app.use(function(req, res) {
  res.status(200).send({success: true})
});

app.get("/", (req, res) => {
  res.send("Express on Vercel");
});

app.listen(port);

console.log('Server started on: ' + port);
