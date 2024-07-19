import express from 'express';

import validateToken from "../middleware/validateToken.js";

const router = express.Router();

router.use(validateToken);
router.get("/profile", (req, res) => {
  res.json(req.user);
});

export default router;