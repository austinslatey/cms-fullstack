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

  addFriend: async function (userId, friendId) {
    try {
      const user = await User.findById(userId);
      const friend = await User.findById(friendId);

      if (!user || !friend) {
        throw new Error('User not found');
      }

      if (!user.friends.includes(friendId)) {
        user.friends.push(friendId);
        await user.save();
        return { status: 'success', message: 'Friend added successfully' };
      } else {
        return { status: 'error', message: 'Already friends' };
      }
    } catch (err) {
      throw new Error(err.message);
    }
  }

}