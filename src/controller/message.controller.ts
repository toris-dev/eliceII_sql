// import { Router, type Request, type Response } from 'express';

// import verifyAuthToken from '../middleware/oauth.middleware';
// import MessageService from '../service/message.service';

// export const messageRouter = Router();
// const messageService = new MessageService();
// // 메시지 1개 받아오기 O
// messageRouter.get('/:messageId', async (req: Request, res: Response) => {
//   try {
//     const { messageId } = req.params;
//     const messageData = await messageService.findOne(messageId);
//     if (messageData.error) {
//       return res.status(404).json({ error: messageData.error });
//     }

//     res.json(messageData);
//   } catch (error) {
//     console.error('메시지 1개 받아오기 에러:', error);
//     res.status(500).send({ error: '메시지를 가져오지 못했습니다.' });
//   }
// });

// // 메시지 작성 O
// messageRouter.post('/:treeId/write', async (req: Request, res: Response) => {
//   try {
//     const { treeId } = req.params;
//     const { message, icon, coordinate } = req.body;
//     const messageId = await messageService.writeMessage(
//       treeId,
//       message,
//       icon,
//       coordinate
//     );
//     if (messageId.error) {
//       return res.status(404).json({ error: messageId.error });
//     }
//     res.status(200).json({
//       message: '메시지 작성 완료',
//       messageId
//     });
//   } catch (error) {
//     console.error('Error:', error);

//     if (error.code === 404) {
//       res.status(404).json({ error: '질문 메시지 작성에 실패하였습니다.' });
//     }
//     res.status(500).json({ error: '질문 메시지 작성에 실패하였습니다.' });
//   }
// });

// messageRouter.delete(
//   '/:messageId/delete',
//   verifyAuthToken,
//   async (req: Request, res: Response): Promise<Response> => {
//     const { messageId } = req.params;
//     const { uid } = req.user;

//     try {
//       // questions 컬렉션에서 questionId로 문서 조회
//       const message = await messageService.deleteOne(messageId, uid);
//       if (message.error) {
//         return res.status(404).json({ error: message.error });
//       }
//       return res.status(200).send({
//         message: '메시지를 성공적으로 삭제하였습니다.',
//         messageData: message
//       });
//     } catch (error) {
//       console.error('메시지 삭제 도중 오류가 발생하였습니다.', error);
//       return res.status(500).send({ message: '메시지를 삭제하지 못했습니다.' });
//     }
//   }
// );

// // 모든 아이콘 보여주기
// messageRouter.get('/icon/all', async (req: Request, res: Response) => {
//   try {
//     const iconsUrl = await messageService.iconAll();

//     res.status(200).json(iconsUrl);
//   } catch (error) {
//     return res.status(500).json({
//       message: `아이콘을 불러오지 못했습니다. error: ${error}`
//     });
//   }
// });

// // 트리 메시지 전체 받아오기 O
// messageRouter.get('/:treeId/all', async (req: Request, res: Response) => {
//   try {
//     const { treeId } = req.params;
//     const { count, size } = req.query;
//     const messages = await messageService.findAll(treeId, count, size); // 페이지네이션 11개씩

//     res.json(messages);
//   } catch (error) {
//     console.error('Error:', error);
//     return res
//       .status(500)
//       .json({ message: '메시지를 가져오지 못했습니다.', error: error.message });
//   }
// });
