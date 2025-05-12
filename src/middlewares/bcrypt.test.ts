import { compare, hash } from './bcrypt';

const mockPassword = 'password123';

describe('bcrypt functions()', () => {
  const MOCK_PASSWORD = 'mockPassword';
  const WRONG_PASSWORD = 'wrongPassword';
  let hashedPassword: string;

  beforeAll(async () => {
    // Set up environment variable for testing purposes
    process.env.SLAT_ROUNDS = '15';

    // Generate a hashed version of the password to compare against.
    hashedPassword = await hash(MOCK_PASSWORD);
  });

  afterAll(() => {
    // Clean up environment variable after each test case
    delete process.env.SLAT_ROUNDS;
  });

  describe('hash', () => {
    it('should hash a password', async () => {
      const result = await hash(MOCK_PASSWORD);
      expect(result).not.toBe(MOCK_PASSWORD); // Make sure the hashed password is not the same as the original password.
    });
  });

  describe('compare', () => {
    it('should return true if passwords match', async () => {
      const result = await compare(MOCK_PASSWORD, hashedPassword);
      expect(result).toBe(true);
    });

    it('should return false if passwords do not match', async () => {
      const result = await compare(WRONG_PASSWORD, hashedPassword);
      expect(result).toBe(false);
    });
  });
});
