const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
    try {
        const tags = await Tag.findAll({
            include: [{ model: Product, through: ProductTag, as: 'products' }],
        });
        res.status(200).json(tags);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});


router.get('/:id', async (req, res) => {
    try {
        const tag = await Tag.findByPk(req.params.id, {
            include: [{ model: Product, through: ProductTag, as: 'products' }],
        });

        if (!tag) {
            res.status(404).json({ message: 'No tag found with this id!' });
            return;
        }

        res.status(200).json(tag);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});


router.post('/', async (req, res) => {
    try {
        const { tag_name } = req.body;

        const newTag = await Tag.create({ tag_name });

        res.status(201).json(newTag);
    } catch (err) {
        console.error(err);
        res.status(400).json(err);
    }
});


router.put('/:id', async (req, res) => {
    try {
        const { tag_name } = req.body;

        await Tag.update({ tag_name }, {
            where: { id: req.params.id },
        });

        res.status(200).json({ message: 'Tag updated successfully' });
    } catch (err) {
        console.error(err);
        res.status(400).json(err);
    }
});


router.delete('/:id', async (req, res) => {
    try {
        await Tag.destroy({
            where: { id: req.params.id },
        });

        res.status(200).json({ message: 'Tag deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

module.exports = router;
