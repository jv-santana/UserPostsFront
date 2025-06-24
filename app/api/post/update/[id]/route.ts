import { type NextRequest, NextResponse } from "next/server"
import { PostService } from "@/lib/services/post.service"
import type { IPostUpdateRequest } from "@/lib/interfaces/post/post.request"

const postService = new PostService()

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body: IPostUpdateRequest = await request.json()
    const result = await postService.updatePost(body, params.id)
    return NextResponse.json(result)
  } catch (error) {
    return NextResponse.json({ message: "Invalid request body", status: 400 }, { status: 400 })
  }
}
