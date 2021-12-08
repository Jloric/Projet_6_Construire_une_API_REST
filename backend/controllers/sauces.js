const Sauces = require('../model/sauces');
const fs = require('fs');

exports.createSauces = (req, res, next) => {
  const saucesObject = JSON.parse(req.body.sauce); 
  const sauces = new Sauces({
    ...saucesObject,
    imageUrl:`${req.protocol}:// ${req.get('host')}/images/${req.file.filename}`
  });
  console.log(sauces)
  sauces.save()
  
    .then(() => {
      res.status(201).json({
        message: 'Post saved successfully!'});
    })
    .catch((error) => {
      res.status(400).json({error: error});
    });
};

exports.getOneSauces = (req, res, next) => {
  Sauces.findOne({
    _id: req.params.id
  }).then((sauces) => {
      res.status(200).json(sauces);
    })
    .catch((error) => {
      res.status(404).json({ error: error});
    });
};

exports.modifySauces = (req, res, next) => {
    const saucesObject = req.file ?
    {
      ...JSON.parse(req.body.sauces),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
  Sauces.updateOne({ _id: req.params.id }, { ...saucesObject, _id: req.params.id })
  .then(() => {
      res.status(201).json({message: 'Sauces updated successfully!'});
    })
  .catch(
    (error) => {
      res.status(400).json({ error: error});
  });
};

exports.deleteSauces = (req, res, next) => {
  Sauces.findOne({ _id: req.params.id})
  .then(thing => {
      const filename = thing.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`,()=>{
        Sauces.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
        .catch(error => res.status(400).json({ error }));
      });
  })
  .catch(error => res.status(500).json({error}));

};

exports.getAllSauces = (req, res, next) => {
  Sauces.find()
  .then((Sauces) => {
      res.status(200).json(Sauces);
    })
  .catch((error) => {
      res.status(400).json({error: error});
    });
};
exports.saucesLiked = (req, res, next) => {
//a faire
}