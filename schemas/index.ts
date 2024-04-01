import { z } from 'zod';
import type { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const EventScalarFieldEnumSchema = z.enum(['id','name','description','startDateTime','endDateTime','image','price','maxParticipants','inviteLink','address','lat','lng','status','isPrivate','isFree','createdAt','updatedAt','createdById']);

export const EventParticipantsScalarFieldEnumSchema = z.enum(['id','userId','eventId','createdAt']);

export const AccountScalarFieldEnumSchema = z.enum(['id','userId','type','provider','providerAccountId','refresh_token','access_token','expires_at','token_type','scope','id_token','session_state']);

export const SessionScalarFieldEnumSchema = z.enum(['id','sessionToken','userId','expires']);

export const UserScalarFieldEnumSchema = z.enum(['id','name','username','password','firstName','lastName','email','emailVerified','role','image']);

export const VerificationTokenScalarFieldEnumSchema = z.enum(['identifier','token','expires']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const NullsOrderSchema = z.enum(['first','last']);

export const EventStatusSchema = z.enum(['UPCOMING','IN_PROGRESS','COMPLETED','CANCELED']);

export type EventStatusType = `${z.infer<typeof EventStatusSchema>}`

export const RoleSchema = z.enum(['USER','ADMIN']);

export type RoleType = `${z.infer<typeof RoleSchema>}`

/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// EVENT SCHEMA
/////////////////////////////////////////

export const EventSchema = z.object({
  status: EventStatusSchema,
  id: z.string().cuid(),
  name: z.string(),
  description: z.string(),
  startDateTime: z.coerce.date(),
  endDateTime: z.coerce.date(),
  image: z.string().nullable(),
  price: z.number(),
  maxParticipants: z.number().int().nullable(),
  inviteLink: z.string().nullable(),
  address: z.string(),
  lat: z.number().nullable(),
  lng: z.number().nullable(),
  isPrivate: z.boolean(),
  isFree: z.boolean(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  createdById: z.string(),
})

export type Event = z.infer<typeof EventSchema>

/////////////////////////////////////////
// EVENT PARTICIPANTS SCHEMA
/////////////////////////////////////////

export const EventParticipantsSchema = z.object({
  id: z.string().cuid(),
  userId: z.string(),
  eventId: z.string(),
  createdAt: z.coerce.date(),
})

export type EventParticipants = z.infer<typeof EventParticipantsSchema>

/////////////////////////////////////////
// ACCOUNT SCHEMA
/////////////////////////////////////////

export const AccountSchema = z.object({
  id: z.string().cuid(),
  userId: z.string(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().nullable(),
  access_token: z.string().nullable(),
  expires_at: z.number().int().nullable(),
  token_type: z.string().nullable(),
  scope: z.string().nullable(),
  id_token: z.string().nullable(),
  session_state: z.string().nullable(),
})

export type Account = z.infer<typeof AccountSchema>

/////////////////////////////////////////
// SESSION SCHEMA
/////////////////////////////////////////

export const SessionSchema = z.object({
  id: z.string().cuid(),
  sessionToken: z.string(),
  userId: z.string(),
  expires: z.coerce.date(),
})

export type Session = z.infer<typeof SessionSchema>

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  role: RoleSchema,
  id: z.string().cuid(),
  name: z.string().nullable(),
  username: z.string().nullable(),
  password: z.string().nullable(),
  firstName: z.string().nullable(),
  lastName: z.string().nullable(),
  email: z.string().nullable(),
  emailVerified: z.coerce.date().nullable(),
  image: z.string().nullable(),
})

export type User = z.infer<typeof UserSchema>

/////////////////////////////////////////
// VERIFICATION TOKEN SCHEMA
/////////////////////////////////////////

export const VerificationTokenSchema = z.object({
  identifier: z.string(),
  token: z.string(),
  expires: z.coerce.date(),
})

export type VerificationToken = z.infer<typeof VerificationTokenSchema>
