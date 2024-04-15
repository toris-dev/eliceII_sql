// import { v4 as uuidv4 } from 'uuid';
// import { db } from '../utils/firebase';

// export default class TreeService {
//   /**
//    *
//    * @param {string} uid - 사용자 고유번호
//    * @param {string} name - 사용자 이름
//    * @returns {Promise<{message: string, treeId: string}>|{error: string, tree: {uid: string}}>}
//    */
//   async createTree(uid, name) {
//     const treeSnapshot = await db
//       .collection('tree')
//       .where('uid', '==', uid)
//       .select('uid')
//       .get();

//     if (!treeSnapshot.empty) {
//       return {
//         error: '트리가 존재합니다.',
//         tree: treeSnapshot.docs[0].data()
//       };
//     }
//     const id = uuidv4().replace(/-/g, '');
//     const treeRef = db.collection('tree').doc(id);

//     treeRef.set({
//       treeId: id,
//       uid,
//       name,
//       created_at: new Date(),
//       treeImage: ''
//     });

//     return {
//       message: '트리가 생성되었습니다.',
//       treeId: id
//     };
//   }
// }
