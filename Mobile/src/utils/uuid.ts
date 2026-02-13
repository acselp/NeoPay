import { v4 as uuidv4 } from 'uuid';

/**
 * Generate a unique UUID for client-generated IDs
 */
export function generateUuid(): string {
  return uuidv4();
}
