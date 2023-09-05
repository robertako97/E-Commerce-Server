const router = require('express').Router();
const { Category, Product, ProductTag} = require('../../models');


router.get('/', async (req, res) => {
    try {
        const categoryData = await Category.findAll();
        res.status(200).json(categoryData);
    } catch (err) {
        res.status(500).json(err);
    }
});
// find all categories
// be sure to include its associated Products


router.get('/:id', async (req, res) => {
    try {
        const categoryData = await Location.findByPk(req.params.id, {
            include: [{ model: Product, through: ProductTag, as: 'category_product' }]
        });

        if (!categoryData) {
            res.status(404).json({ message: 'No category found with this id!' });
            return;
        }

        res.status(200).json(categoryData);
    } catch (err) {
        res.status(500).json(err);
    }
});
// find one category by its `id` value
// be sure to include its associated Products

router.post('/', async (req, res) => {
    try {
        const categoryData = await Category.create(req.body);
        res.status(200).json(categoryData);
    } catch (err) {
        res.status(400).json(err);}
  // create a new category
});

router.put('/:id', async (req, res) => {
    try {
        const categoryData = await Category.update(req.body,
            {
            where: {id: req.params.id }
            },

            );
        res.status(200).json(categoryData);
    } catch (err) {
        res.status(400).json(err);
    }
});
  // update a category by its `id` value

router.delete('/:id',  async (req, res) => {
    try {
        const categoryData = await Category.destroy({
            where: {id: req.params.id,},
        });
        if (!categoryData) {
            res.status(404).json({ message: 'No library card found with that id!' });
            return;
        }

        res.status(200).json(categoryData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
