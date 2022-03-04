const Sauces = require('../model/sauces');
const fs = require('fs');

exports.createSauces = (req, res) => {
  const saucesObject = JSON.parse(req.body.sauce);
  const sauces = new Sauces({
    ...saucesObject,
    imageUrl:`${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    likes:0,
    dislikes:0,
    usersLiked:[],
    usersDisliked:[]
  });
  sauces.save()
  .then(() => {
    res.status(201).json({message: 'Sauces updated successfully!'}
  )})
  .catch((error) => {
    res.status(400).json({error: error});
  })
};

exports.getOneSauces = (req, res) => {
  Sauces.findOne({_id: req.params.id})
  .then((sauce) => {
      res.status(200).json(sauce);
    })
    .catch((error) => {
      res.status(404).json({ error: error});
    });
};

exports.modifySauces = (req, res) => {
    const saucesObject = req.file ?
    {
      ...JSON.parse(req.body.sauce),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
  Sauces.updateOne({ _id: req.params.id }, { ...saucesObject, _id: req.params.id })
  .then(() => {
      res.status(201).json({message: 'Sauce updated successfully!'});
    })
  .catch(
    (error) => {
      res.status(400).json({ error: error});
  });
};

exports.deleteSauces = (req, res) => {
  Sauces.findOne({_id: req.params.id})
  .then((sauce) => {
      const filename = sauce.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`,()=>{
        Sauces.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
        .catch(error => res.status(400).json({ error }));
      });
  })
  .catch(error => res.status(500).json({error}));

};

exports.getAllSauces = (req, res) => {
  Sauces.find()
  .then((sauce) => {
      res.status(200).json(sauce);
    })
  .catch((error) => {
      res.status(400).json({error: error});
    });
};
exports.saucesLiked = (req, res) => {
  Sauces.findOne({_id: req.params.id})
  .then((sauce) => {
    if((sauce.usersDisliked || sauce.usersliked).includes(req.body.userId)){
      Sauces.findOne({ _id: req.params.id })
        .then((sauce) => {
          console.log("l'utilisateur a pas déjà noté cette sauce")
          if (sauce.usersLiked.includes(req.body.userId)) {
            Sauces.updateOne(
              { _id: req.params.id },
              { $pull: { usersLiked: req.body.userId }, $inc: { likes: -1 } }
            )
              .then((sauce) => {
                res.status(200).json({ message: "Like supprimé !" });
              })
              .catch((error) => res.status(400).json({ error }));
          } 
          else if (sauce.usersDisliked.includes(req.body.userId)) {
            Sauces.updateOne(
              { _id: req.params.id },
              {
                $pull: { usersDisliked: req.body.userId },
                $inc: { dislikes: -1 },
              }
            )
              .then((sauce) => {
                res.status(200).json({ message: "Dislike supprimé !" });
              })
              .catch((error) => res.status(400).json({ error }));
          }
        })
        .catch((error) => res.status(400).json({ error }));
    }
    else {
      console.log("l'utilisateur n'a pas encore noté cette sauce")
      if (req.body.like === 1) {
        console.log(req.body.like)
        Sauces.updateOne(
          { _id: req.params.id },
          {
            $inc: { likes: 1},
            $push: { usersLiked: req.body.userId }
          }
        )
        console.log("Update ok")
        console.log(sauce)
        .then(() => res.status(200).json({ message: "Like ajouté !" }))
        .catch((error) => res.status(400).json({ error }));
      } 
      else if (req.body.like === -1) {
        console.log(req.body.like)
        Sauces.updateOne(
          { _id: req.params.id },
          {
            $inc: { dislikes: 1 },
            $push: { usersDisliked: req.body.userId }
          }
        )
        console.log("Update ok")
          .then((sauce) => res.status(200).json({ message: "Dislike ajouté !" }))
          .catch((error) => res.status(400).json({ error }));
      }
    }})
  .catch(error => res.status(500).json({error}),console.log("une erreur s'est produite"));
}