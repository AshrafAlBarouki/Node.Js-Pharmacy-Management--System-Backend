const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const prescriptionSchema = new Schema({
  customer_id: { type: mongoose.Schema.ObjectId, ref: "Customer" },
  drugs_ids: [{ type: mongoose.Schema.ObjectId, ref: "Drug" }],
  price:Number,
}, {
  toJSON: {
    transform(doc, ret) {
      delete ret.__v;
      delete ret.createdAt;
      delete ret.updatedAt;
    },
  },
  timestamps: true,
});
module.exports = mongoose.model("Prescription", prescriptionSchema);
