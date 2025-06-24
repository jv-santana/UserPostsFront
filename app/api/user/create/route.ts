import { type NextRequest, NextResponse } from "next/server"
import { UserService } from "@/lib/services/user.service"
import type { IUserCreateRequest } from "@/lib/interfaces/user/user.request"

const userService = new UserService()

export async function POST(request: NextRequest) {
  try {
    const body: IUserCreateRequest = await request.json()
    const result = await userService.createUser(body)
    return NextResponse.json(result)
  } catch (error) {
    return NextResponse.json({ message: "Invalid request body", status: 400 }, { status: 400 })
  }
}
