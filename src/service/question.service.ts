// import { db } from '../utils/firebase';

// export default class QuestionService {
//   /**
//    *
//    * @param {string} uid user에 uid값
//    * @param {Array<string>} message 질문에 대한 응답값
//    */
//   // eslint-disable-next-line class-methods-use-this
//   async createQuestion(uid, message) {
//     const querySnapshot = await db
//       .collection('tree')
//       .where('uid', '==', uid)
//       .get();
//     const docRef = querySnapshot.docs[0].ref;
//     await docRef.update({
//       question: message
//     });
//     return (await docRef.get()).data();
//   }
// }
