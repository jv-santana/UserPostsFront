import { Request, Response, Router } from "express";
import routerPost from "./post-routes/post.routes";
import routerUser from "./user-routes/user.routes";

const router = Router();

router.get("/", (_req: Request, res: Response) => {
  res.json({ message: "Welcome to the API!" });
});

router.use("/user", routerUser);
router.use("/post", routerPost);

export default router;
