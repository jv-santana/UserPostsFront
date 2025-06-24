import { Request, Response, Router } from "express";
import {
  IPostCreateRequest,
  IPostUpdateRequest,
} from "../../interface/post/post.request";
import { PostService } from "../../services/post.service";

const routerPost = Router();
const post_service = new PostService();

routerPost.get("/", (_req: Request, res: Response) => {
  res.json({ message: "Post route is working!" });
});

routerPost.post("/create", async (req: Request, res: Response) => {
  const postBody: IPostCreateRequest = req.body;
  const postCreated = await post_service.createPost(postBody);
  res.send(postCreated);
});

routerPost.get("/list", async (_req: Request, res: Response) => {
  const posts = await post_service.listPost();
  res.send(posts);
});

routerPost.delete("/delete/:id", async (req: Request, res: Response) => {
  const postId: string = req.params.id;
  const postDeleted = await post_service.deletePost(postId);
  res.send(postDeleted);
});

routerPost.put("/update/:id", async (req: Request, res: Response) => {
  const postBody: IPostUpdateRequest = req.body;
  const postId: string = req.params.id;
  const postUpdated = await post_service.updatePost(postBody, postId);
  res.send(postUpdated);
});

export default routerPost;
