const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const drugSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique:true
  },
  type: {
    type: String,
  },
  description: {
    type: String,
  },
  unitPrice: Number,
  numberOfUnit:Number,
  totalPrice: Number,
},
{
  toJSON: {
    transform(doc, ret) {
      delete ret.__v;
      delete ret.createdAt;
      delete ret.updatedAt;
    },
  },
  timestamps: true,
});

module.exports = mongoose.model("Drug", drugSchema);
