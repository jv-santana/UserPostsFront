import { type NextRequest, NextResponse } from "next/server"
import { UserService } from "@/lib/services/user.service"

const userService = new UserService()

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const result = await userService.deleteUser(params.id)
  return NextResponse.json(result)
}
