const { User } = require("../models")

module.exports = {

  getAll: async function () {
    try {
      return await User.find({})
    } catch (err) {
      throw new Error(err.message)
    }
  },

  getOne: async function (criteriaObj) {
    try {
      return await User.findOne(criteriaObj)
    } catch (err) {
      throw new Error(err.message)
    }
  },

  getById: async function (id) {
    try {
      return await User.findById(id)
    } catch (err) {
      throw new Error(err.message)
    }
  },

  create: async function (data) {
    try {
      return await User.create(data)
    } catch (err) {
      throw new Error(err.message)
    }
  },

  updateById: async function (id, data) {
    try {
      return await User.findByIdAndUpdate(
        id,
        data,
        { new: true }
      )
    } catch (err) {
      throw new Error(err.message)
    }
  },

  deleteById: async function (id) {
    try {
      return await User.findByIdAndDelete(id)
    } catch (err) {
      throw new Error(err.message)
    }
  },

  followUser: async function (username, followUsername) {
    try {
      const user = await User.findOne({ username });
      const followUser = await User.findOne({ username: followUsername });

      if (!user || !followUser) {
        return { status: 'error', message: 'User not found' };
      }

      if (!user.following.includes(followUser._id)) {
        user.following.push(followUser._id);
        await user.save();
      }

      if (!followUser.followers.includes(user._id)) {
        followUser.followers.push(user._id);
        await followUser.save();
      }

      return { status: 'success', message: 'User followed successfully' };
    } catch (err) {
      return { status: 'error', message: 'Internal server error' };
    }
  },
}