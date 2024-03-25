import { z } from 'zod';

export const UserScalarFieldEnumSchema = z.enum(['id','name','username','password','firstName','lastName','email','emailVerified','role','image']);

export default UserScalarFieldEnumSchema;
