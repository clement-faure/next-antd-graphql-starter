import mongoose from 'mongoose';

const { Schema } = mongoose;
const { ObjectId } = Schema;

const UserSchema = new Schema(
  {
    _id: ObjectId,
    username: String,
    email: String,
    workspaces: [ObjectId],
    active_workspace: ObjectId,
  },
  { timestamps: true }
);

if (!mongoose.models.User) {
  mongoose.model('User', UserSchema);
}

export default UserSchema;
