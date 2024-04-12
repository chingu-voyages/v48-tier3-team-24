import { z } from 'zod';

export const EventScalarFieldEnumSchema = z.enum(['id','name','description','startDateTime','endDateTime','image','price','maxParticipants','inviteLink','streetAddress','city','state','zip','lat','lng','status','isPrivate','isFree','createdAt','updatedAt','createdById']);

export default EventScalarFieldEnumSchema;
