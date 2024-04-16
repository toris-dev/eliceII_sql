import { Request, Response, Router } from 'express';
import jwt from 'jsonwebtoken';
import { jwtSecretKey } from '../constant/env';
import OAuthService from '../service/oauth.service';

export const oauthRouter = Router();

const authKakao = new OAuthService('KAKAO');
const authNaver = new OAuthService('NAVER');

oauthRouter.get('/kakao', async (req: Request, res: Response) => {
  try {
    const { code } = req.query;
    if (!code) {
      return res.status(400).json({
        code: 400,
        message: 'code is a required parameter.'
      });
    }
    const response = await authKakao.getToken(code as string);
    const token = response.access_token;
    const kakaoUser = await authKakao.getUser(token);
    const authUser = await authKakao.updateOrCreateUser(
      kakaoUser,
      response.refresh_token
    );
    const accessToken = jwt.sign({ uid: authUser.id }, jwtSecretKey, {
      expiresIn: '24h'
    });

    const treeId = await authKakao.userTreeFind(authUser.id);

    // 질문 입력 여부에 따라 리디렉션할 경로 결정
    return res
      .cookie('accessToken', accessToken, { httpOnly: true })
      .cookie('kakaoToken', token, { httpOnly: true })
      .status(200)
      .json({ treeId });
  } catch (error) {
    console.error('Error occurred:', error);
    return res.status(500).json({ error: '로그인 실패' });
  }
});

// oauthRouter.get('/naver', async (req: Request, res: Response) => {
//   try {
//     const { code } = req.query;
//     if (!code) {
//       return res.status(400).json({
//         code: 400,
//         message: 'code is a required parameter.'
//       });
//     }

//     const response = await authNaver.getToken(code); // 네이버 OAuth를 통해 액세스 토큰을 받아옴
//     const naverUser = await authNaver.getUser(response.access_token); // 액세스 토큰을 사용하여 네이버 사용자 정보를 가져옴
//     // 이후에 필요한 처리를 수행하고 클라이언트에게 응답을 보냄
//     const authUser = await authNaver.updateOrCreateUser(
//       naverUser.response,
//       response.refresh_token
//     );
//     const accessToken = jwt.sign({ uid: authUser.uid }, jwtSecretKey, {
//       expiresIn: '24h'
//     });
//     const treeId = await authNaver.userTreeFind(authUser.uid);

//     // 질문 입력 여부에 따라 리디렉션할 경로 결정
//     return res
//       .cookie('accessToken', accessToken, { httpOnly: true })
//       .cookie('naverToken', response.access_token, { httpOnly: true })
//       .json({ treeId });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ error: '로그인 실패' });
//   }
// });

// oauthRouter.delete(
//   '/user/delete',
//   verifyAuthToken,
//   async (req: Request, res: Response) => {
//     const { uid } = req.user;
//     try {
//       const message = await authKakao.deleteUser(uid);
//       res.status(200).json({ message });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: error });
//     }
//   }
// );
