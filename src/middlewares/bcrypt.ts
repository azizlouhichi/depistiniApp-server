import * as bcryptjs from 'bcrypt';
import { ENV } from '../config';

async function generateSalt() {
  return bcryptjs.genSalt(ENV.SLAT_ROUNDS);
}

// This function takes in a string password and returns a hashed version of that password after generating a salt.
export async function hash(password: string) {
  const salt = await generateSalt(); // Generate a salt using the generateSalt() function.
  const hashedPassword = await bcryptjs.hash(password, salt); // Hash the password using the bcrypt library and provided salt.
  return hashedPassword; // Return the hashed password.
}

// This function takes in a plaintext password and a hashed password, and returns whether or not they match.
export async function compare(plaintextPassword: string, hashedPassword: string) {
  return await bcryptjs.compare(plaintextPassword, hashedPassword); // Compare the plaintext password with the hashed one using the bcrypt library and return whether or not they match.
}
