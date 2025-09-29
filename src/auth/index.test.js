import { hashPassword, authenticate } from './index';

const SAMPLE_PASSWORD = 'foobarfizz';
const OTHER_PASSWORD = 'fizzbuzz';

describe('Auth: Hashed Password Authentication', () => {
  let hashedPass = '';

  it('Should hashed password be in encoded format', async () => {
    hashedPass = await hashPassword(SAMPLE_PASSWORD);
    expect(hashedPass);
    expect(hashedPass.length).toEqual(97);
    expect(hashedPass.startsWith('$argon2id$')).toBe(true);
  });

  it('should return true on correct password', async () => {
    const isAuth = await authenticate(SAMPLE_PASSWORD, hashedPass);
    expect(isAuth).toBe(true);
  });
  
  it('should return false on incorrect password', async () => {
    const isAuth = await authenticate(OTHER_PASSWORD, hashedPass);
    expect(isAuth).toBe(false);
  });

  it('should fail on invalid hash', async () => {
    try {
      await authenticate(SAMPLE_PASSWORD, SAMPLE_PASSWORD);
    } catch (err) {
      expect(err.message).toEqual('Invalid hash');
      return;
    }
    throw new Error('Should have failed');
  });
});
