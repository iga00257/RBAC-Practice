import Role from "../src/models/role";


export async function createRoles() {
  if (! await Role.findOne({ name: 'admin' })) {
    await Role.create({
        name: 'admin',
        permissions: ['readUsers', 'createUsers', 'updateUsers', 'deleteUsers'],
      });
  }
  if (!await Role.findOne({ name: 'guest' })) {
    await Role.create({
        name: 'guest',
        permissions: ['readUsers'],
      });           
  }
 
}

