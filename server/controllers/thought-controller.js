const { Thought, User } = require("../models");

module.exports = {
  getAll: async function () {
    try {
      return await Thought.find({})
        .populate('user_id', 'username avatar bio')
        .populate('reactions.user_id', 'username avatar');
    } catch (err) {
      throw new Error(err.message);
    }
  },

  getOne: async function (criteriaObj) {
    try {
      return await Thought.findOne(criteriaObj)
        .populate('user_id', 'username avatar bio')
        .populate('reactions.user_id', 'username avatar');
    } catch (err) {
      throw new Error(err.message);
    }
  },

  getById: async function (id) {
    try {
      return await Thought.findById(id)
        .populate('user_id', 'username avatar bio')
        .populate('reactions.user_id', 'username avatar');
    } catch (err) {
      throw new Error(err.message);
    }
  },

  getByUsername: async function (username) {
    try {
      console.log(`Fetching thoughts for username: ${username}`);
      const user = await User.findOne({ username });
      if (!user) {
        throw new Error('User not found');
      }
      const thoughts = await Thought.find({ user_id: user._id })
        .populate('user_id', 'username avatar bio')
        .populate('reactions.user_id', 'username avatar');
      console.log(`Fetched ${thoughts.length} thoughts for username: ${username}`);
      return thoughts;
    } catch (err) {
      throw new Error(`Error fetching thoughts by username: ${err.message}`);
    }
  },

  create: async function (data) {
    try {
      const user = await User.findOne({ username: data.username });
      if (!user) {
        throw new Error('User not found');
      }
      const newThought = new Thought({
        thoughtTitle: data.thoughtTitle,
        thoughtText: data.thoughtText,
        user_id: user._id,
      });
      const savedThought = await newThought.save();
      user.thoughts.push(savedThought._id);
      await user.save();
      return savedThought;
    } catch (err) {
      throw new Error(err.message);
    }
  },

  updateById: async function (id, data, currentUserUsername) {
    try {
      const thought = await Thought.findById(id).populate('user_id');
      if (!thought) {
        throw new Error('Thought not found');
      }
      const user = await User.findById(thought.user_id);
      if (user.username !== currentUserUsername) {
        throw new Error('You can only update your own thoughts.');
      }
      thought.thoughtTitle = data.thoughtTitle;
      thought.thoughtText = data.thoughtText;
      const updatedThought = await thought.save();
      return updatedThought;
    } catch (err) {
      throw new Error(err.message);
    }
  },

  deleteById: async function (id, currentUserUsername) {
    try {
      const thought = await Thought.findById(id).populate('user_id');
      if (!thought) {
        throw new Error('Thought not found');
      }
      const user = await User.findById(thought.user_id);
      if (user.username !== currentUserUsername) {
        throw new Error('You can only delete your own thoughts.');
      }
      return await Thought.findByIdAndDelete(id);
    } catch (err) {
      throw new Error(err.message);
    }
  },

  addReaction: async function (thoughtId, reactionData) {
    try {
      const thought = await Thought.findById(thoughtId);
      if (!thought) {
        throw new Error('Thought not found');
      }

      const user = await User.findOne({ username: reactionData.username });
      if (!user) {
        throw new Error('User not found');
      }

      const reaction = {
        reactionBody: reactionData.reactionBody,
        username: user.username,
        user_id: user._id
      };

      thought.reactions.push(reaction);
      await thought.save();

      // Retrieve the thought again to populate the fields
      const populatedThought = await Thought.findById(thoughtId)
        .populate('user_id', 'username avatar bio')
        .populate('reactions.user_id', 'username avatar');

      return populatedThought;
    } catch (err) {
      throw new Error(err.message);
    }
  },
};
