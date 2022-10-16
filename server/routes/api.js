require("dotenv").config({ path: "./config.env" });
const fs = require("fs");
const Superhero = require("../models/superhero.js");
const multer = require("../services/multer.js");
const path = "client/build/uploads/";

module.exports = function (app) {
  // GET all the superheroes
  app.get("/api/superheroes", (req, res) => {
    Superhero.find({})
      .then((superhero) => res.json(superhero))
      .catch((err) => res.status(400).json(`Error: ${err}`));
  });

  // GET one superhero by id from params
  app.get("/api/superheroes/:id", (req, res) => {
    Superhero.findOne({ _id: req.params.id })
      .then((superhero) => res.json(superhero))
      .catch((err) => res.status(400).json(`Error: ${err}`));
  });

  // POST (create) one superhero
  app.post("/api/superheroes", multer.upload.array("images"), (req, res) => {
    if (req.files.length > 0) {
      let images = [];

      for (let i = 0; i < req.files.length; i++) {
        images.push(req.files[i].filename);
      }

      const newSuperhero = new Superhero({ ...req.body, images: images });
      newSuperhero
        .save()
        .then(() => res.json("superhero added"))
        .catch((err) => res.status(400).json(`Error: ${err}`));
    } else {
      const newSuperhero = new Superhero({ ...req.body });
      newSuperhero
        .save()
        .then(() => res.json("superhero added"))
        .catch((err) => res.status(400).json(`Error XYI: ${err}`));
    }
  });

  // PUT (update) one superhero by id from params
  app.put("/api/superheroes/:id", multer.upload.array("images"), (req, res) => {
    const editedSuperhero = { ...req.body };

    if (req.files.length > 0) {
      let images = [];
      for (let i = 0; i < req.files.length; i++) {
        images.push(req.files[i].filename);
      }

      Superhero.findByIdAndUpdate(req.params.id, {
        $set: { ...editedSuperhero },
        $push: { images: images },
      })
        .then(() => res.json("superhero edited"))
        .catch((err) => res.status(400).json(`Error: ${err}`));
    } else {
      Superhero.findByIdAndUpdate(req.params.id, {
        $set: { ...editedSuperhero },
      })
        .then(() => res.json("superhero edited"))
        .catch((err) => res.status(400).json(`Error: ${err}`));
    }
  });

  // DELETE one superhero by id from params
  app.delete("/api/superheroes/:id", (req, res) => {
    Superhero.findOne({ _id: req.params.id }).then((superhero) => {
      if (superhero.images) {
        for (let i = 0; i < superhero.images.length; i++) {
          fs.unlink(path + superhero.images[i], (err) => {
            if (err) {
              console.log(err);
            }
            return;
          });
        }
      }
    });

    Superhero.findByIdAndDelete(req.params.id)
      .then(() => res.json("superhero deleted"))
      .catch((err) => res.status(400).json(`Error: ${err}`));
  });

  // DELETE one image from supehero
  app.delete("/api/superheroes/:id/:path", (req, res) => {
    Superhero.findOne({ _id: req.params.id }).then(() => {
      fs.unlink(path + req.params.path, (err) => {
        if (err) {
          console.log(err);
        }
        return;
      });
    });
    Superhero.updateOne(
      { _id: req.params.id },
      {
        $pullAll: {
          images: [req.params.path],
        },
      }
    )
      .then(() => res.json("image deleted"))
      .catch((err) => res.status(400).json(`Error: ${err}`));
  });
};
