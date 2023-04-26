import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/userModel';
import Role from '../models/role';
import { type IRole } from '../models/role';
import dotenv from 'dotenv';
dotenv.config();

export default function checkPermissions(permissions: string[]) {
  console.log(permissions)

  return async (req: Request, res: Response, next: NextFunction) => {
    try {

      const token = req.headers.authorization?.split(' ')[1];

      if (!token) {
        return res.status(401).json({ message: 'Unauthorized No token' });
      }
      let decodedToken: any
      try {
        decodedToken = jwt.verify(token, process.env.JWT_SECRET as string);
        
      } catch (error) {
        res.status(401).json({ message: error });
        return
      }

      const userId = decodedToken.userId;
      const user = await User.findById(userId);
      
      if (!user) {
        return res.status(401).json({ message: 'Unauthorized No User' });
      }
      
      const hasPermission = await Promise.all(
        user.roles.map(async (role: any) => {
          const roleName = typeof role === 'string' ? role : role.name;
          const roleSchema = await Role.findOne({ name: roleName });
          const rolePermissions = roleSchema?.permissions || [];
          console.log(`role: ${roleName}, permissions: ${rolePermissions}`);
          if (!rolePermissions) {
            return false;
          }
          const result = permissions.every((permission) =>
            rolePermissions.includes(permission)
          );
          console.log(`permissions.every(): ${result}`);
          return result;
        })
      ).then((results) => results.some((result) => result))
      console.log("hasPermission", hasPermission)
      if (!hasPermission) {
        console.log("noPermission")
        return res.status(403).json({ message: 'Forbidden' });
      }
      console.log(hasPermission)
      next();
    } catch (error) {
      console.log(error)
      return res.status(401).json({ message: 'error' });
    }
  };
}
