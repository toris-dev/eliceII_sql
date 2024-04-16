import express from 'express';
import { oauthRouter } from './oauth.controller';
// import { messageRouter } from './message.controller';
// import { treeRouter } from './tree.controller';

export const router = express.Router();

router.use('/oauth', oauthRouter); // 소셜로그인에 대한 Router
// router.use('/message', messageRouter); // 트리 메시지 대한 Router
// router.use('/tree', treeRouter); // 트리에 대한 Router
