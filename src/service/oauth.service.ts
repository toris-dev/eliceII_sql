import { User } from '@prisma/client';
import axios from 'axios';
import {
  kakaoClientId,
  kakaoRedirectUri,
  kakaoSecret,
  naverClientId,
  naverRedirectUri,
  naverSecretKey
} from '../constant/env';
import {
  kakaoReqMeUrl,
  kakaoTokenUrl,
  naverReqMeUrl,
  naverTokenUrl
} from '../constant/url';
import { prisma } from '../lib/prisma';
import { tokenTypes, UserData } from '../types/oauth';

export default class OAuthService {
  provider: 'NAVER' | 'KAKAO';
  constructor(provider: 'KAKAO' | 'NAVER') {
    this.provider = provider;
  }

  async getToken(code: string): Promise<tokenTypes> {
    try {
      const body =
        this.provider === 'KAKAO'
          ? {
              grant_type: 'authorization_code',
              client_id: kakaoClientId,
              redirect_uri: kakaoRedirectUri,
              client_secret: kakaoSecret,
              code
            }
          : {
              grant_type: 'authorization_code',
              client_id: naverClientId,
              client_secret: naverSecretKey,
              redirect_uri: naverRedirectUri,
              code,
              state: 'RAMDOM_STATE'
            };
      const tokenUrl =
        this.provider === 'KAKAO' ? kakaoTokenUrl : naverTokenUrl;
      const res = await axios.post(
        tokenUrl,
        new URLSearchParams(body as { state: string })
      );
      return res.data;
    } catch (error: unknown) {
      throw new Error(error as string);
    }
  }

  async getUser(token: string): Promise<UserData> {
    try {
      const reqTokenUrl =
        this.provider === 'KAKAO' ? kakaoReqMeUrl : naverReqMeUrl;
      const res = await axios.get(reqTokenUrl, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return res.data;
    } catch (error: unknown) {
      throw new Error(error as string);
    }
  }

  async updateOrCreateUser(
    user: UserData,
    refreshToken: string
  ): Promise<User> {
    const properties = {
      email: user.kakao_account.email,
      provider: this.provider,
      refreshToken
    };

    // firebase -> supabase 로 교체
    const existingUser = await prisma.user.findFirst({
      where: {
        // email or id 필수
        provider: this.provider,
        email: user.kakao_account.email
      }
    });
    if (existingUser) {
      // 이미 계정이 존재하는 경우
      console.log('이미 존재하는 계정입니다.');
      return existingUser;
    }
    // 계정을 생성
    const newUser = await prisma.user.create({
      data: {
        ...properties
      }
    });
    console.log('새로운 계정이 생성되었습니다.');
    return newUser;
  }

  async userTreeFind(id: string) {
    try {
      const existingUser = await prisma.user.findFirst({
        where: {
          id
        }
      });
      if (existingUser) {
        const tree = await prisma.tree.findFirst({
          where: {
            userId: id
          }
        });
        return tree?.id ?? null;
      }
      // 트리가 없을 경우에 대한 처리 추가 가능
      return null;
    } catch (error) {
      console.error('Error finding user tree:', error);
      return null;
    }
  }
  // refreshAccessToken 관리를 어떻게?
  // async refreshAccessToken(refreshToken) {
  //   try {
  //     const config = {
  //       headers: {
  //         'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
  //       }
  //     };

  //     const params = new URLSearchParams();
  //     params.append('grant_type', 'refresh_token');
  //     params.append('client_id', kakaoClientId);
  //     params.append('refresh_token', refreshToken);

  //     const response = await axios.post(kakaoTokenUrl, params, config);
  //     return response.data;
  //   } catch (error) {
  //     console.error('Error refreshing access token:', error);
  //     throw error;
  //   }
  // }
}
