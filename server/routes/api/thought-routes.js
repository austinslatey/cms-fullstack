const router = require("express").Router();
const { getAll, getById, create, updateById, deleteById, getByUsername, addReaction, likeThought, unlikeThought } = require("../../controllers/thought-controller");

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

router.post('/', async (req, res) => {
  try {
    console.log('Thought creation request body:', req.body);

    const { username, thoughtTitle, thoughtText } = req.body;

    // Verify the user before creating the thought
    const userBefore = await getByUsername(username);
    console.log('User before thought creation:', userBefore);

    // Log password hash before creation
    const userPasswordHashBefore = userBefore[0]?.user_id?.password;
    console.log('User password hash before thought creation:', userPasswordHashBefore);

    const thoughtData = {
      username,
      thoughtTitle,
      thoughtText
    };

    // Create the new thought
    const newThought = await create(thoughtData);

    // Verify the user after creating the thought
    const userAfter = await getByUsername(username);
    console.log('User after thought creation:', userAfter);

    // Log password hash after creation
    const userPasswordHashAfter = userAfter[0]?.user_id?.password;
    console.log('User password hash after thought creation:', userPasswordHashAfter);

    res.status(200).json(newThought);
  } catch (error) {
    console.error('Error creating thought:', error);
    res.status(500).json({ status: 'error', msg: error.message });
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

router.post('/:id/reactions', async (req, res) => {
  try {
    const thoughtId = req.params.id;
    const reactionData = req.body;
    const updatedThought = await addReaction(thoughtId, reactionData);
    res.status(200).json({ status: 'success', payload: updatedThought });
  } catch (err) {
    res.status(500).json({ status: 'error', msg: err.message });
  }
});

router.post('/:id/like', likeThought);
router.post('/:id/unlike', unlikeThought);

module.exports = router;
