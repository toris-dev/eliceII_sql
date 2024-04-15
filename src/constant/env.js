import dotenv from 'dotenv';
import * as env from 'env-var';

dotenv.config();

export const port = env.get('PORT').asInt();
export const jwtSecretKey = env.get('JWT_SCRET_KEY').asString();
export const storeBucketName = env.get('BUCKET_NAME').asString();
