const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Must match an email address!'],
    },
    password: {
      type: String,
      required: true,
      trim: true,
      allowNull: false,
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought',
      },
    ],
    following: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    followers: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },

  {
    id: false,
    timestamps: true
  }
);

userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.virtual('followingCount').get(function () {
  return (this.following || []).length;
});

userSchema.virtual('followersCount').get(function () {
  return (this.followers || []).length;
});

const User = model('User', userSchema);

module.exports = User;
