const router = require("express").Router();
const { getAll, getOne, getById, create, updateById, deleteById, followUser } = require("../../controllers/user-controller");
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


// user-routes.js
router.post('/:username/follow', async (req, res) => {
  const { followUsername } = req.body;
  const { username } = req.params;

  try {
    const result = await followUser(username, followUsername);
    if (result.status === 'error') {
      return res.status(404).json(result);
    }
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
});

module.exports = router;
