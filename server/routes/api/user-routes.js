const router = require("express").Router();
const { getAll, getOne, getById, create, updateById, deleteById, followUser, unfollowUser, getFollowers, getFollowing, checkFollowingStatus } = require("../../controllers/user-controller");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

async function createToken(user) {
  const tokenData = { email: user.email }
  const token = jwt.sign(tokenData, process.env.TOKEN_ENCRYPT_KEY)
  return token
}



router.get("/", async (req, res) => {
  try {
    const payload = await getAll();
    res.status(200).json({ status: 'success', payload: payload });
  } catch (err) {
    res.status(500).json({ status: 'error', msg: err.message });
  }
});

router.post("/login", async (req, res) => {
  let user
  try {
    user = await getOne({ email: req.body.email });
  } catch (err) {
    return res.status(500).json({ status: 'error', msg: 'Could not authenticate user' });
  }

  if (!user) {
    return res.status(500).json({ status: 'error', msg: 'Could not authenticate user' });
  }

  const verify = await bcrypt.compare(req.body.password, user.password);

  if (!verify) {
    return res.status(500).json({ status: 'error', msg: 'Could not authenticate user' });
  }

  const token = await createToken(user);

  res
    .status(200)
    .cookie('auth-cookie', token, {
      maxAge: 86400 * 1000,
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production'
    })
    .json({ status: 'success', payload: user });
});


router.get("/verify", async (req, res) => {
  const cookie = req.cookies['auth-cookie'];

  console.log('Received cookie:', cookie);

  if (!cookie) {
    return res.status(401).json({ status: 'error', msg: 'No cookie found' });
  }

  try {
    const decryptedCookie = jwt.verify(cookie, process.env.TOKEN_ENCRYPT_KEY);
    console.log('Decrypted cookie:', decryptedCookie);
    const user = await getOne({ email: decryptedCookie.email });

    if (!user) {
      return res.status(404).json({ status: 'error', msg: 'User not found' });
    }

    return res.status(200).json({ status: 'success', payload: user });
  } catch (err) {
    console.error('Error verifying user:', err.message);
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ status: 'error', msg: 'Token expired' });
    }
    if (err.name === 'JsonWebTokenError') {
      return res.status(401).json({ status: 'error', msg: 'Invalid token' });
    }
    return res.status(500).json({ status: 'error', msg: 'Could not authenticate user' });
  }
});
router.post("/", async (req, res) => {
  try {
    const payload = await create(req.body);
    const token = await createToken(payload);
    return res
      .status(200)
      .cookie('auth-cookie', token, {
        maxAge: 86400 * 1000,
        httpOnly: false,
        secure: process.env.NODE_ENV === 'production'
      })
      .json({ status: 'success', payload: payload });
  } catch (err) {
    return res.status(500).json({ status: 'error', msg: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const payload = await getById(req.params.id);
    return res.status(200).json({ status: 'success', payload: payload });
  } catch (err) {
    return res.status(500).json({ status: 'error', msg: err.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const payload = await updateById(req.params.id, req.body);
    return res.status(200).json({ status: 'success', payload: payload });
  } catch (err) {
    return res.status(500).json({ status: 'error', msg: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const payload = await deleteById(req.params.id);
    return res.status(200).json({ status: 'success', payload: payload });
  } catch (err) {
    return res.status(500).json({ status: 'error', msg: err.message });
  }
});




router.post('/:username/follow', async (req, res) => {
  const { username } = req.params;
  const { followUsername } = req.body;

  try {
    const result = await followUser(username, followUsername);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

// Unfollow a user
router.post('/:username/unfollow', async (req, res) => {
  const { username } = req.params;
  const { unfollowUsername } = req.body;

  try {
    const result = await unfollowUser(username, unfollowUsername);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

// Get followers count
router.get('/:id/followers', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await getFollowers(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

// Get following count
router.get('/:id/following', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await getFollowing(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

// Check if the current user is following the profile user
router.get('/:currentUsername/following/:profileUsername', async (req, res) => {
  const { currentUsername, profileUsername } = req.params;

  try {
    const result = await checkFollowingStatus(currentUsername, profileUsername);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

// Get user by username
router.get('/username/:username', async (req, res) => {
  try {
    const payload = await getOne({ username: req.params.username });
    if (!payload) {
      return res.status(404).json({ status: 'error', msg: 'User not found' });
    }
    res.status(200).json({ status: 'success', payload });
  } catch (err) {
    res.status(500).json({ status: 'error', msg: err.message });
  }
});



module.exports = router;
