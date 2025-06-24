import { NextResponse } from "next/server"
import { PostService } from "@/lib/services/post.service"

const postService = new PostService()

export async function GET() {
  const result = await postService.listPost()
  return NextResponse.json(result)
}
