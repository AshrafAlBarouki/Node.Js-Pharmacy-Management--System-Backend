const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    roles: {
      User: {
        type: Number,
        default: 6524,
      },
      Editor: Number,
      Admin: Number,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    refreshToken: String,
    salt: { type: String, required: true },
  },
  {toJSON:{
    transform(doc,ret){
      delete ret.password;
      delete ret.salt;
      delete ret.__v;
      delete ret.createdAt;
      delete ret.updatedAt;
    }
  },
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
