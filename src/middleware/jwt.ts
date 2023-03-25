import jwt, { SignOptions } from 'jsonwebtoken';
import config from 'config';

const jwtKey = 'SomerandomText@!23';

export const signJwt = (
  payload: Object,
  key: 'accessTokenPrivateKey' | 'refreshTokenPrivateKey',
  options: SignOptions = {},
) => {
  const privateKey = Buffer.from(config.get<string>(key), 'base64').toString(
    'ascii',
  );
  //console.log(privateKey);
  return jwt.sign(payload, jwtKey, {
    ...(options && options),
    algorithm: 'HS256',
  });
};

export const verifyJwt = <T>(
  token: string,
  key: 'accessTokenPublicKey' | 'refreshTokenPublicKey',
): T | null => {
  try {
    const publicKey = Buffer.from(config.get<string>(key), 'base64').toString(
      'ascii',
    );
    return jwt.verify(token, jwtKey) as T;
  } catch (error) {
    return null;
  }
};
