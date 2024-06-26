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
  // API
  router.get('/get', async (req, res) => {
    try {
        const annonces = await Annonce.find();
        res.json(annonces)
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/get/:id', async (req, res) =>{
    const id = await Annonce.findById(req.params.id)
        res.json(id)
})
router.post("/post" , async (req, res) => {
    const annonce = new Annonce({
        titre: req.body.titre,
        caracteristique: req.body.caracteristique,
        prix: req.body.prix
    });

    try {
       await annonce.save();
       res.json(req.body)
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
})

router.put('/update/:id', async (req, res) =>{
    try {
    const id = await Annonce.findById(req.params.id)
    const {titre, prix, caracteristique} = req.body
    await Annonce.findByIdAndUpdate(req.params.id, {titre, prix, caracteristique});
       res.json(id)
    } catch (err) {
        res.status(400).json({ message: err.message });
    }   

})
router.delete("/delete/:id", async (req, res) => {
    const id = req.params.id;
    console.log(id);
    try {
      const deleteOne = await Annonce.deleteOne({ _id: id });
      const NewAnnonce = await Annonce.find({});
      res.json(id);
    } catch {
      res.status(400);
    }
  });
module.exports = router
// Swagger

/**
 * @swagger
 * /get:
 *   get:
 *     summary: Get all annonces 
 *     tags: [API]
 *     responses:
 *       200:
 *         description: List of annonces
 *       500:
 *         description: Server error
 */
router.get('/get', async (req, res) => {
    try {
        const annonces = await Annonce.find();
        res.json(annonces);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

/**
 * @swagger
 * /get/{id}:
 *   get:
 *     summary: Get annonce by ID 
 *     tags: [API]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The annonce ID
 *     responses:
 *       200:
 *         description: Annonce data
 *       404:
 *         description: Annonce not found
 */
router.get('/get/:id', async (req, res) =>{
    const id = await Annonce.findById(req.params.id);
    res.json(id);
});

/**
 * @swagger
 * /post:
 *   post:
 *     summary: Create a new annonce 
 *     tags: [API]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - titre
 *               - caracteristique
 *               - prix
 *             properties:
 *               titre:
 *                 type: string
 *               caracteristique:
 *                 type: string
 *               prix:
 *                 type: number
 *     responses:
 *       200:
 *         description: Annonce created successfully
 *       400:
 *         description: Bad request
 */
router.post("/post" , async (req, res) => {
    const annonce = new Annonce({
        titre: req.body.titre,
        caracteristique: req.body.caracteristique,
        prix: req.body.prix
    });

    try {
       await annonce.save();
       res.json(req.body);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

/**
 * @swagger
 * /update/{id}:
 *   put:
 *     summary: Update an annonce by ID 
 *     tags: [API]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The annonce ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titre:
 *                 type: string
 *               caracteristique:
 *                 type: string
 *               prix:
 *                 type: number
 *     responses:
 *       200:
 *         description: Annonce updated successfully
 *       400:
 *         description: Bad request
 */
router.put('/update/:id', async (req, res) =>{
    try {
    const id = await Annonce.findById(req.params.id);
    const {titre, prix, caracteristique} = req.body;
    await Annonce.findByIdAndUpdate(req.params.id, {titre, prix, caracteristique});
       res.json(id);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }   
});

/**
 * @swagger
 * /delete/{id}:
 *   delete:
 *     summary: Delete an annonce by ID 
 *     tags: [API]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The annonce ID
 *     responses:
 *       200:
 *         description: Annonce deleted successfully
 *       400:
 *         description: Bad request
 */
router.delete("/delete/:id", async (req, res) => {
    const id = req.params.id;
    try {
      await Annonce.deleteOne({ _id: id });
      res.json(id);
    } catch {
      res.status(400);
    }
});

module.exports = router;