const router = require("express").Router();
const { getAll, getById, create, updateById, deleteById, getByUsername } = require("../../controllers/thought-controller");

// GET all thoughts or thoughts by username
router.get('/', async (req, res) => {
  const { username } = req.query;

  try {
    let thoughts;
    if (username) {
      thoughts = await getByUsername(username);
    } else {
      thoughts = await getAll();
    }

    console.log(`Returning ${thoughts.length} thoughts`);
    res.status(200).json({ status: 'success', payload: thoughts });
  } catch (err) {
    console.error('Error fetching thoughts:', err);
    res.status(500).json({ status: 'error', msg: err.message });
  }
});

// GET a single thought by ID
router.get('/:id', async (req, res) => {
  try {
    const payload = await getById(req.params.id);
    res.status(200).json({ status: 'success', payload: payload });
  } catch (err) {
    res.status(500).json({ status: 'error', msg: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const payload = await create(req.body);
    res.status(200).json({ status: 'success', payload: payload });
  } catch (err) {
    res.status(500).json({ status: 'error', msg: err.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const payload = await updateById(req.params.id, req.body, req.body.username);
    res.status(200).json({ status: 'success', payload: payload });
  } catch (err) {
    res.status(500).json({ status: 'error', msg: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const payload = await deleteById(req.params.id, req.body.username);
    res.status(200).json({ status: 'success', payload: payload });
  } catch (err) {
    res.status(500).json({ status: 'error', msg: err.message });
  }
});

module.exports = router;
