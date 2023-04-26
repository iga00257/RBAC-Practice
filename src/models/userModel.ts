
import { Document, Model, model, Schema } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  roles: string[];
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: false, unique: true },
  password: { type: String, required: false },
  roles: [{ type: String, required: true }],
});

const UserModel: Model<IUser> = model<IUser>('User', UserSchema);

export default UserModel;