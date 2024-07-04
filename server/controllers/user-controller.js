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

  followUser: async function (userId, followId) {
    try {
      const user = await User.findById(userId);
      const followUser = await User.findById(followId);

      if (!user || !followUser) {
        throw new Error('User not found');
      }

      if (!user.following.includes(followId)) {
        user.following.push(followId);
        followUser.followers.push(userId);
        await user.save();
        await followUser.save();
        return { status: 'success', message: 'User followed successfully' };
      } else {
        return { status: 'error', message: 'Already following this user' };
      }
    } catch (err) {
      throw new Error(err.message);
    }
  },

  unfollowUser: async function (userId, unfollowId) {
    try {
      const user = await User.findById(userId);
      const unfollowUser = await User.findById(unfollowId);

      if (!user || !unfollowUser) {
        throw new Error('User not found');
      }

      user.following = user.following.filter(id => id.toString() !== unfollowId);
      unfollowUser.followers = unfollowUser.followers.filter(id => id.toString() !== userId);
      await user.save();
      await unfollowUser.save();
      return { status: 'success', message: 'User unfollowed successfully' };
    } catch (err) {
      throw new Error(err.message);
    }
  },

};