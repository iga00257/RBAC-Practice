import UserModel from '../src/models/userModel';
import { type IUser } from '../src/models/userModel';


export async function createUsers() {
    await UserModel.create({name:'john',roles:['admin']})
    await UserModel.create({name:'jane',roles:['guest']})

    if (! UserModel.findOne({ name: 'john' })) {
    }
    if (! UserModel.findOne({ name: 'jane' })) {
    }
        
}



export async function assignRoles() {
  const john:any = await UserModel.findOne({ name: 'john' });
  john.roles = ['guest', 'admin'];
  await john.save();
    const jane:any = await UserModel.findOne({ name: 'jane' });
    jane.roles = ['guest'];
    await jane.save();
}

