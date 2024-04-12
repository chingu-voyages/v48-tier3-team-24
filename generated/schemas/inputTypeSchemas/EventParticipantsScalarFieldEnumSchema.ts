import { z } from 'zod';

export const EventParticipantsScalarFieldEnumSchema = z.enum(['id','userId','eventId','createdAt']);

export default EventParticipantsScalarFieldEnumSchema;
