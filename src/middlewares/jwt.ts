import { NextFunction, Request, Response } from 'express';
import { ENV } from './../config/env';
import jsonwebtoken from 'jsonwebtoken';
import { UnauthorizedError } from '../errors';

// This function retrieves and decodes the JWT secret from the environment variables.
function getJwtSecret() {
  // Decode the JWT secret from base64, read from the ENV variable.
  return Buffer.from(ENV.JWT_SECRET, 'base64');
}

export function verifyToken(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers['authorization'] as string;

  if (!authHeader) {
    throw new UnauthorizedError('Authorization header not found');
  }

  const parts = authHeader.split(' ');

  if (parts.length !== 2 || parts[0] !== 'Bearer') throw new UnauthorizedError('Invalid authorization header format');

  const token = parts[1];

  const userPayload = verify(token);

  if (!userPayload) throw new UnauthorizedError('Invalid token');
  //
  // req.user = userPayload
  //
  next();
}

// This function generates a new JWT token using a payload and sign options. It returns the generated token as a string.
export async function generateToken(payload: any, options: jsonwebtoken.SignOptions = {}) {
  // Set default signing options if none are provided
  const defaultOption: jsonwebtoken.SignOptions = {
    algorithm: 'HS256', // Default algorithm is HMAC SHA-256
  };

  // Merge provided sign options with default options to ensure all necessary options are present
  const token = jsonwebtoken.sign(payload, getJwtSecret(), {
    ...defaultOption,
    ...options,
  });

  // Return the generated token
  return token;
}

// This function verifies the authenticity of a given JWT token. If the token is valid, it returns the decoded payload. Otherwise, it throws an UnauthorizedError.
export async function verify(token: string) {
  try {
    // Verify the token using the `jsonwebtoken` library and store the decoded payload in a variable.
    const decoded = (await jsonwebtoken.verify(token, getJwtSecret())) as jsonwebtoken.JwtPayload;

    // Return the decoded payload if verification was successful.
    return decoded;
  } catch (err) {
    return null;
  }
}
