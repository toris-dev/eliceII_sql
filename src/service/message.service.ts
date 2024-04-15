// import firebase from 'firebase-admin';
// import { db, storage } from '../utils/firebase';

// export default class MessageService {
//   /**
//    *
//    * @param {string} messageId - 메시지 고유번호
//    * @returns {Promise<{treeId: string, coordinate: {x:number, y:number}, icon: string, created_at: Date, messaeg:string} | {error: string}}
//    */
//   async findOne(messageId) {
//     try {
//       const messageRef = await db.collection('messages').doc(messageId).get();
//       if (!messageRef.exists) {
//         console.error('메시지를 찾을 수 없습니다.');
//         return { error: '메시지를 찾을 수 없습니다.' };
//       }
//       const messageData = messageRef.data();
//       return messageData;
//     } catch (error) {
//       console.error('메시지 1개 받아오기 에러:', error);
//       throw new Error('메시지를 가져오지 못했습니다.');
//     }
//   }

//   /**
//    *
//    * @param {string} treeId - 트리 고유번호(treeId)
//    * @param {string[]} message - 질문에 대한 대답
//    * @param {string} icon - icon url
//    * @param {{x:number, y:number}} coordinate - x,y 위치
//    * @returns {Promise<string> | {error: string}} - 메시지 고유번호(messageId)
//    */
//   async writeMessage(treeId, message, icon, coordinate) {
//     const docRef = db.collection('tree').doc(treeId);
//     const docSnapshot = await docRef.get();

//     if (!docSnapshot.exists) {
//       // 문서가 존재하는 경우
//       return { error: '트리가 존재하지 않습니다.' };
//     }
//     await docRef.update({ count: firebase.firestore.FieldValue.increment(1) });

//     const messageRef = await db.collection('messages').add({
//       treeId,
//       message,
//       icon,
//       created_at: new Date(),
//       coordinate: coordinate ?? { x: 0, y: 0 }
//     });
//     const messageId = (await messageRef.get()).id;
//     return messageId;
//   }

//   /**
//    *
//    * @param {*} messageId
//    * @param {*} uid
//    * @returns {Promise<{treeId: string, coordinate: {x:number, y:number}, icon: string, created_at: Date, messaeg:string}|{error: string}>}
//    */
//   async deleteOne(messageId, uid) {
//     // questions 컬렉션에서 questionId로 문서 조회
//     const messageDocSnapshot = await db
//       .collection('messages')
//       .doc(messageId)
//       .get();
//     if (!messageDocSnapshot.exists) {
//       return { error: '해당 메시지가 없습니다.' };
//     }
//     console.log(messageDocSnapshot.exists);
//     const { treeId } = messageDocSnapshot.data();
//     const docRef = db.collection('tree').doc(treeId);
//     const tree = (await docRef.get()).data();
//     if (tree.uid !== uid) {
//       return { error: '호스트가 아닌 이용자는 삭제할 수 없습니다.' };
//     }

//     await messageDocSnapshot.ref.delete();

//     await docRef.update({
//       count: firebase.firestore.FieldValue.increment(-1)
//     });
//     return messageDocSnapshot.data();
//   }

//   /**
//    *
//    * @returns {Promise<string[]>}
//    */
//   async iconAll() {
//     const [files] = await storage.bucket().getFiles({
//       prefix: 'icons/'
//     });
//     const iconUrlsPromises = files.map((file) =>
//       file.getSignedUrl({
//         action: 'read',
//         expires: '03-17-2025' // 만료 시간
//       })
//     );

//     const iconUrlsArray = await Promise.all(iconUrlsPromises);
//     const flattenedUrls = iconUrlsArray
//       .flat()
//       .slice(1)
//       .map((urlArr) => urlArr.toString());
//     return flattenedUrls;
//   }

//   /**
//    *
//    * @param {string} treeId - 트리 고유번호(treeId)
//    * @returns {Promise<{treeId: string, coordinate: {x:number, y:number}, icon: string, created_at: Date, messaeg:string}[]|{error: string}>}
//    */
//   async findAll(treeId) {
//     const doc = await db
//       .collection('messages')
//       .where('treeId', '==', treeId)
//       .get();

//     if (doc.empty) {
//       return { error: '메시지를 찾을 수 없습니다.' };
//     }

//     const messages = doc.docs.map((msg) => msg.data());
//     return messages;
//   }
// }
