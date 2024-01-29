const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const customerSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    address: String,
    phone: Number,
    nationalNumber: {
      type: String,
      required: true,
      unique: true,
    },
    prescreptions_ids: [
      { type: mongoose.Schema.ObjectId, ref: "Prescription" },
    ],
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.nationalNumber;
        delete ret.__v;
        delete ret.createdAt;
        delete ret.updatedAt;
      },
    },
    timestamps: true,
  }
);

module.exports = mongoose.model("Customer", customerSchema);
