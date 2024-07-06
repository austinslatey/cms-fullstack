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
        throw new Error('User not found');
      }

      if (!user.following.includes(followUser._id)) {
        user.following.push(followUser._id);
        followUser.followers.push(user._id);
        await user.save();
        await followUser.save();
      }

      return { status: 'success', message: `${username} followed ${followUsername}` };
    } catch (err) {
      throw new Error(err.message);
    }
  },

  unfollowUser: async function (username, unfollowUsername) {
    try {
      const user = await User.findOne({ username });
      const unfollowUser = await User.findOne({ username: unfollowUsername });

      if (!user || !unfollowUser) {
        throw new Error('User not found');
      }

      user.following = user.following.filter(id => !id.equals(unfollowUser._id));
      unfollowUser.followers = unfollowUser.followers.filter(id => !id.equals(user._id));
      await user.save();
      await unfollowUser.save();

      return { status: 'success', message: `${username} unfollowed ${unfollowUsername}` };
    } catch (err) {
      throw new Error(err.message);
    }
  },

  getFollowers: async function (userId) {
    try {
      const user = await User.findById(userId).populate('followers');
      if (!user) {
        throw new Error('User not found');
      }
      return { status: 'success', payload: user.followers };
    } catch (err) {
      throw new Error(err.message);
    }
  },

  getFollowing: async function (userId) {
    try {
      const user = await User.findById(userId).populate('following');
      if (!user) {
        throw new Error('User not found');
      }
      return { status: 'success', payload: user.following };
    } catch (err) {
      throw new Error(err.message);
    }
  }
}