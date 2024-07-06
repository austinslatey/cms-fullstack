const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');
const dateFormat = require('../utils/dateFormat');

const thoughtSchema = new Schema(
  {
    thoughtTitle: {
      type: String,
      required: 'You need to leave a thought title!',
      minlength: 1,
      maxlength: 100
    },
    thoughtText: {
      type: String,
      required: 'You need to leave a thought!',
      minlength: 1,
      maxlength: 280
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: timestamp => dateFormat(timestamp)
    },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    reactions: [reactionSchema]
  },
  {
    toJSON: {
      getters: true
    },
    id: false
  }
);

thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
