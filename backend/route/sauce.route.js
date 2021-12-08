const express = require('express');
const router = express.Router();

const saucesCtrl = require('../controllers/sauces');
const multer = require('../middleware/multer-config');
const auth = require('../middleware/auth');

router.get('/',auth ,saucesCtrl.getAllSauces);
router.post('/', multer ,saucesCtrl.createSauces);
router.get('/:id',auth ,saucesCtrl.getOneSauces);
router.put('/:id',auth ,multer ,saucesCtrl.modifySauces);
router.delete('/:id',auth ,saucesCtrl.deleteSauces);
router.put('/:id/like',auth ,saucesCtrl.saucesLiked);


module.exports = router;