// import { verify } from 'jsonwebtoken';
// import { jwtSecretKey } from '../constant/env';
// // import { auth } from '../utils/firebase';
// import { RequestHandler } from 'express';
// // OIDC 토큰 검증 미들웨어

// const verifyAuthToken:RequestHandler  = async (req, res, next) => {
//   try {
//     const { accessToken } = req.cookies;
//     if (!accessToken) {
//       return res
//         .status(401)
//         .json({ message: 'Authorization token is missing.' });
//     }

//     // 토큰 검증 및 디코딩
//     const decoded = verify(
//       accessToken,
//       jwtSecretKey,
//       {
//         ignoreExpiration: false
//       },
//       (err, decode) => {
//         if (err) {
//           console.error('Error verifying auth token:', err);
//           return res.status(500).json({ message: '토큰 에러' });
//         }
//         console.log('Decoded token:', decode); // 해석된 토큰 내용 출력
//         return decode;
//       }
//     );

//     const { uid } = decoded;
//     const user = await auth.getUser(uid);

//     // 검증된 UID를 요청 객체에 추가
//     req.user = { uid: user.uid };
//     next();
//   } catch (error) {
//     if (error.name === 'TokenExpiredError') {
//       console.error('토큰이 만료되었습니다.');
//       return res.status(500).json({ message: '다시 로그인하세요' });
//     }
//     console.error('Error verifying auth token:', error);
//     return res.status(500).json({ message: 'Unauthorizesd' });
//   }
// };

// export default verifyAuthToken;
