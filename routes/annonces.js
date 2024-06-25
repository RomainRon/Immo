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


router.get('/update/:id', async (req, res) =>{
    const id = await Annonce.findById(req.params.id)
        res.render('annonce', id)
})
router.post('/update/:id', async (req, res) =>{
    const id = await Annonce.findById(req.params.id)
    res.render('annonce', id)
    
})
module.exports = router;