import dotenv from 'dotenv';
import * as env from 'env-var';

dotenv.config();

export const port = env.get('PORT').asInt() as number;
export const jwtSecretKey = env.get('JWT_SCRET_KEY').asString() as string;
export const storeBucketName = env.get('BUCKET_NAME').asString() as string;
export const supabaseUrl = env.get('SUPABASE_URL').asString() as string;
export const serviceKey = env.get('SUPABASE_ANON_KEY').asString() as string;

// oauth
export const kakaoClientId = env.get('KAKAO_CLIENT_ID').asString() as string;
export const kakaoRedirectUri = env
  .get('KAKAO_REDIRECT_URI')
  .asUrlString() as string;
export const kakaoSecret = env.get('KAKAO_SECRET_KEY').asString() as string;
export const naverClientId = env.get('NAVER_CLIENT_ID').asString() as string;
export const naverSecretKey = env
  .get('NAVER_SECRET_KE  Y')
  .asString() as string;
export const naverRedirectUri = env
  .get('NAVER_REDIRECT_URI')
  .asUrlString() as string;
