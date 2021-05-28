const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let postItList = [
  { id: 1, title: "Title 1", message: "Message 1" },
  { id: 2, title: "Title 2", message: "Message 2", color: "#CCCCCC" },
];

let postIt = {
  id: null,
  title: null,
  message: null,
  color: null,
};

let response = {
  error: false,
  codigo: 200,
  mensaje: "",
};
app.get("/", function(req, res) {
  response = {
    error: true,
    codigo: 200,
    mensaje: "Punto de inicio",
  };
  res.send(response);
});
app
  .route("/postit")
  .get(function(req, res) {
    response = {
      error: false,
      codigo: 200,
      mensaje: "",
    };
    response = {
      error: false,
      codigo: 200,
      mensaje: "PostIt list",
      respuesta: postItList,
    };
    res.send(response);
  })
  .post(function(req, res) {
    if (!req.body.id || !req.body.message) {
      response = {
        error: true,
        codigo: 502,
        mensaje: "Required id and message fields",
      };
    } else {
      if (postItList.find((item) => item.id === req.body.id)) {
        response = {
          error: true,
          codigo: 503,
          mensaje: "PostIt already created",
        };
      } else {
        postIt = {
          id: req.body.id,
          title: req.body.title,
          message: req.body.message,
          color: req.body.color,
        };

        postItList.push(postIt);
        response = {
          error: false,
          codigo: 200,
          mensaje: "PostIt created",
          respuesta: postIt,
        };
      }
    }

    res.send(response);
  })
  .delete(function(req, res) {
    if (!postItList.find((item) => item.id === req.body.id)) {
      response = {
        error: true,
        codigo: 501,
        mensaje: "PostIt not created",
      };
    } else {
      postItList = postItList.filter((item) => item.id !== req.body.id);

      response = {
        error: false,
        codigo: 200,
        mensaje: "PostIt deleted",
      };
    }
    res.send(response);
  });
app.use(function(req, res, next) {
  response = {
    error: true,
    codigo: 404,
    mensaje: "URL not found",
  };
  res.status(404).send(response);
});
app.listen(port, () => {
  console.log("Server started. Port 3000");
});
