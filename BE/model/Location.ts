import mongoose from "mongoose";

const LocationSchema = new mongoose.Schema({
  ubProvinces: String,
  district: String,
  khoroo: String,
  details: String,
});

const Location = mongoose.model("location", LocationSchema, "Locations");

export default Location;
