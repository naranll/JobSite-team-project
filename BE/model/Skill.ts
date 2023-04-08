import mongoose from "mongoose";

const SkillSchema = new mongoose.Schema({
  name: String,
});

const Skill = mongoose.model("skill", SkillSchema, "Skills");

export default Skill;
