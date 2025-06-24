import { type NextRequest, NextResponse } from "next/server"
import { PostService } from "@/lib/services/post.service"

const postService = new PostService()

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const result = await postService.deletePost(params.id)
  return NextResponse.json(result)
}
