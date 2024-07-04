const router = require("express").Router();
const { getAll, getOne, getById, create, updateById, deleteById, followUser, unfollowUser } = require("../../controllers/user-controller");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

async function createToken(user) {
  const tokenData = { email: user.email }
  const token = await jwt.sign(tokenData, process.env.TOKEN_ENCRYPT_KEY)
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

  if (!cookie) {
    return res.status(500).json({ status: 'error', msg: 'Could not authenticate user' });
  }

  try {
    const decryptedCookie = jwt.verify(cookie, process.env.TOKEN_ENCRYPT_KEY);
    const user = await getOne({ email: decryptedCookie.email });

    if (!user) {
      return res.status(500).json({ status: 'error', msg: 'Could not authenticate user' });
    }

    return res.status(200).json({ status: 'success', payload: user });
  } catch (err) {
    return res.status(500).json({ status: 'error', msg: err.message });
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

// Follow a user
router.post('/:id/follow', async (req, res) => {
  const { id } = req.params;
  const { followId } = req.body;

  try {
    const result = await followUser(id, followId);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

// Unfollow a user
router.post('/:id/unfollow', async (req, res) => {
  const { id } = req.params;
  const { unfollowId } = req.body;

  try {
    const result = await unfollowUser(id, unfollowId);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

module.exports = router;
