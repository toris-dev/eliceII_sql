// import { type Request, type Response, Router } from 'express';
// import verifyAuthToken from '../middleware/oauth.middleware';
// import TreeService from '../service/tree.service';

// export const treeRouter = Router();
// const treeService = new TreeService();

// // 질문 생성 후 트리 생성 , 기존에 트리가 있는지 검사 O
// treeRouter.post(
//   '/add',
//   verifyAuthToken,
//   async (req: Request, res: Response) => {
//     try {
//       const { uid } = req.user;
//       const questions = req.body;
//       console.log(questions);
//       if (!Array.isArray(questions) || questions.length === 0) {
//         return res.status(403).json({ message: '질문을 등록해주세요' });
//       }
//       const treeData = await treeService.createTree(uid);
//       if (treeData?.error) {
//         // 트리가 존재한다면 return
//         return res.status(401).json(treeData);
//       }
//       await treeService.createQuestion(uid, questions);

//       res.status(200).json({ message: '트리가 생성되었습니다.', treeData });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({
//         message: '트리가 생성되지 않았습니다.'
//       });
//     }
//   }
// );
