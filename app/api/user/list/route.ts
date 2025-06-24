import { NextResponse } from "next/server"
import { UserService } from "@/lib/services/user.service"

const userService = new UserService()

export async function GET() {
  const result = await userService.listUser()
  return NextResponse.json(result)
}
