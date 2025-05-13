import { getMockReq, getMockRes } from '@jest-mock/express';
import { Request } from 'express';
import { generateToken, verify, verifyToken } from './jwt';

const mockPayload = { id: 123, username: 'test_user' };
const mockOptions = { expiresIn: '1h' };

describe('JWT functions', () => {
  beforeEach(() => {
    // Set up environment variable for testing purposes
    process.env.JWT_SECRET = 'dGhpcyBpcyBhIHRlc3Qgc2VjcmV0';
  });

  afterEach(() => {
    // Clean up environment variable after each test case
    delete process.env.JWT_SECRET;
  });

  describe('generateToken()', () => {
    it('should generate a valid JWT token', async () => {
      const token = await generateToken(mockPayload, mockOptions);
      expect(token).toBeDefined();
      expect(typeof token).toBe('string');

      // Verify token with jwt.verify()
      const decoded = await verify(token);
      expect(decoded).toBeDefined();
    });
  });

  describe('verify()', () => {
    it('should decode a valid JWT token', async () => {
      // Generate a token to test with
      const token = await generateToken(mockPayload, mockOptions);

      // Attempt to verify the token and expect it to succeed
      const decoded = await verify(token);
      expect(decoded).toHaveProperty('id', 123);
    });

    it('should return null for an invalid JWT token', async () => {
      // Generate a random string as an invalid JWT token
      const invalidToken = Math.random().toString(36).substring(7);
      const res = await verify(invalidToken);
      // Try to verify the invalid token and expect it to throw an UnauthorizedError
      expect(res).toBe(null);
    });
  });

  describe('verifyToken()', () => {
    const { res, next, clearMockRes } = getMockRes();

    beforeEach(() => {
      clearMockRes();
    });
    it('should return an error response if no authorization header is present', () => {
      // Mock the token verification function
      const req = getMockReq<Request>({
        headers: {
          // not valid token
          // authorization: 'Bearer',
        },
      });
      expect(() => verifyToken(req, res, next)).toThrow('Authorization header not found');
    });
  });
});
