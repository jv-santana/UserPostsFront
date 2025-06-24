import { type NextRequest, NextResponse } from "next/server"
import { PostService } from "@/lib/services/post.service"
import type { IPostCreateRequest } from "@/lib/interfaces/post/post.request"

const postService = new PostService()

export async function POST(request: NextRequest) {
  try {
    const body: IPostCreateRequest = await request.json()
    const result = await postService.createPost(body)
    return NextResponse.json(result)
  } catch (error) {
    return NextResponse.json({ message: "Invalid request body", status: 400 }, { status: 400 })
  }
}
