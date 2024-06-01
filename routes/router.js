import express from 'express';
import { homeControl, signinControl, dashControl } from '../controller/agentControl.js';

const router = express.Router();

router.get('/', homeControl);
router.get('/SignIn', signinControl);
router.get('/dashboard', dashControl);

export default router;