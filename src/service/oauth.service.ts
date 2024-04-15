// import axios from 'axios';
// import {
//   kakaoClientId,
//   kakaoRedirectUri,
//   kakaoSecret,
//   naverClientId,
//   naverRedirectUri,
//   naverSecretKey
// } from '../constant/env';
// import {
//   kakaoReqMeUrl,
//   kakaoTokenUrl,
//   naverReqMeUrl,
//   naverTokenUrl
// } from '../constant/url';
// import { auth, db } from '../utils/firebase';

// export default class OAuthService {
//   /**
//    * 생성자
//    * @param {"naver" | "kakao"} provider - 제공자 (네이버 또는 카카오)
//    */
//   constructor(provider) {
//     this.provider = provider;
//   }

//   /**
//    * 액세스 토큰을 요청합니다.
//    * @param {string} code - 코드
//    * @returns {Promise<any>} 토큰 응답 데이터
//    */
//   async getToken(code) {
//     try {
//       const body =
//         this.provider === 'kakao'
//           ? {
//               grant_type: 'authorization_code',
//               client_id: kakaoClientId,
//               redirect_uri: kakaoRedirectUri,
//               client_secret: kakaoSecret,
//               code
//             }
//           : {
//               grant_type: 'authorization_code',
//               client_id: naverClientId,
//               client_secret: naverSecretKey,
//               redirect_uri: naverRedirectUri,
//               code,
//               state: 'RAMDOM_STATE'
//             };
//       const tokenUrl =
//         this.provider === 'kakao' ? kakaoTokenUrl : naverTokenUrl;
//       const res = await axios.post(tokenUrl, new URLSearchParams(body));
//       return res.data;
//     } catch (error) {
//       throw new Error('토큰 요청 Error: ', error);
//     }
//   }

//   async getUser(token) {
//     try {
//       const reqTokenUrl =
//         this.provider === 'kakao' ? kakaoReqMeUrl : naverReqMeUrl;
//       const res = await axios.get(reqTokenUrl, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       return res.data;
//     } catch (error) {
//       throw new Error('유저정보 요청 error: ', error);
//     }
//   }

//   async updateOrCreateUser(user, refreshToken) {
//     const properties = {
//       uid: `${this.provider}:${user.id}`,
//       provider: `oidc.${this.provider}`,
//       displayName:
//         user.kakao_account?.profile?.nickname ?? user?.name ?? 'null',
//       email: user.kakao_account?.email ?? user?.email ?? 'example@example.com',
//       created_at: new Date(),
//       refreshToken
//     };
//     const userRef = db.collection('users').doc(`${this.provider}:${user.id}`);

//     try {
//       const [, authResult] = await Promise.all([
//         userRef.set(properties),
//         auth.updateUser(properties.uid, properties)
//       ]);
//       return authResult;
//     } catch (error) {
//       if (error.code === 'auth/user-not-found') {
//         const [, authResult] = await Promise.all([
//           userRef.set(properties),
//           auth.createUser(properties)
//         ]);
//         return authResult;
//       }
//       throw error;
//     }
//   }

//   /**
//    * @param {string} uid 소셜로그인 uid값
//    * @returns {Promise<boolean>} 존재하지 않으면 false 존재하면 true
//    */
//   async userCheck(uid) {
//     const user = await db
//       .collection('users')
//       .where('uid', '==', `${this.provider}:${uid}`)
//       .get();
//     if (user.empty) {
//       return false;
//     }
//     return true;
//   }

//   async userTreeFind(uid) {
//     try {
//       const snapshot = await db
//         .collection('tree')
//         .where('uid', '==', uid)
//         .get();
//       if (!snapshot.empty) {
//         return snapshot.docs[0].id; // 첫 번째 문서의 트리 ID 반환
//       }
//       // 트리가 없을 경우에 대한 처리 추가 가능
//       throw new Error('트리가 아직 존재하지 않습니다.');
//     } catch (error) {
//       console.error('Error finding user tree:', error);
//       throw new Error('사용자 트리를 찾는 중에 오류가 발생했습니다.');
//     }
//   }
//   // refreshAccessToken 관리를 어떻게?
//   // async refreshAccessToken(refreshToken) {
//   //   try {
//   //     const config = {
//   //       headers: {
//   //         'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
//   //       }
//   //     };

//   //     const params = new URLSearchParams();
//   //     params.append('grant_type', 'refresh_token');
//   //     params.append('client_id', kakaoClientId);
//   //     params.append('refresh_token', refreshToken);

//   //     const response = await axios.post(kakaoTokenUrl, params, config);
//   //     return response.data;
//   //   } catch (error) {
//   //     console.error('Error refreshing access token:', error);
//   //     throw error;
//   //   }
//   // }
// }
