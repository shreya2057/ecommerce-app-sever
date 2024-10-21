import loginRouter from "./login";
import registerRouter from "./register";
import otpRouter from "./otp";
import { Router } from "express";

const router = Router();

router.use("/", loginRouter);
router.use("/", registerRouter);
router.use("/", otpRouter);

export default router;
