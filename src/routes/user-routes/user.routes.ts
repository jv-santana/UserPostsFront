import { Request, Response, Router } from "express";
import {
  IUserCreateRequest,
  IUserUpdateRequest,
} from "../../interface/user/user.request";
import { UserService } from "../../services/user.service";

const routerUser = Router();
const user_service = new UserService();

routerUser.get("/", (_req: Request, res: Response) => {
  res.json({ message: "User route is working!" });
});

routerUser.post("/create", async (req: Request, res: Response) => {
  const userBody: IUserCreateRequest = req.body;
  const userCreated = await user_service.createUser(userBody);
  res.send(userCreated);
});

routerUser.get("/list", async (_req: Request, res: Response) => {
  const users = await user_service.listUser();
  res.send(users);
});

routerUser.put("/update/:id", async (req: Request, res: Response) => {
  const userBody: IUserUpdateRequest = req.body;
  const userUpdated = await user_service.updateUser(req.params.id, userBody);
  res.send(userUpdated);
});

routerUser.delete("/delete/:id", async (req: Request, res: Response) => {
  const userDeleted = await user_service.deleteUser(req.params.id);
  res.send(userDeleted);
});

export default routerUser;
