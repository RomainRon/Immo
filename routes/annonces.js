const express = require('express');
const router = express.Router();
const Annonce = require('../models/Annonce')

router.post("/index" , async (req, res) => {
    const annonce = new Annonce({
        titre: req.body.titre,
        caracteristique: req.body.caracteristique,
        prix: req.body.prix
    });

    try {
       await annonce.save();
       res.redirect('/')
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
})
router.get('/', async (req, res) => {
    try {
        const annonces = await Annonce.find();
        res.render('index', { annonces });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
router.get('/annonces/create', (req, res) => {
    res.render('form', { annonce: {} });
});


router.get('/annonce/:id', async (req, res) =>{
    const id = await Annonce.findById(req.params.id)
        res.render('annonce', id)
})
router.get('/update/:id', async (req, res) =>{
    const id = await Annonce.findById(req.params.id)
    res.render('update', id)
    
})
router.post('/update/:id', async (req, res) =>{
    try {
    const {titre, prix, caracteristique} = req.body
    await Annonce.findByIdAndUpdate(req.params.id, {titre, prix, caracteristique});
       res.redirect('/')
    } catch (err) {
        res.status(400).json({ message: err.message });
    }   

})
router.get("/delete/:id", async (req, res) => {
    const id = req.params.id;
    console.log(id);
    try {
      const deleteOne = await Annonce.deleteOne({ _id: id });
      const NewAnnonce = await Annonce.find({});
      res.redirect("/");
    } catch {
      res.status(400);
    }
  });
module.exports = router