import { type NextRequest, NextResponse } from "next/server"
import { UserService } from "@/lib/services/user.service"
import type { IUserUpdateRequest } from "@/lib/interfaces/user/user.request"

const userService = new UserService()

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body: IUserUpdateRequest = await request.json()
    const result = await userService.updateUser(params.id, body)
    return NextResponse.json(result)
  } catch (error) {
    return NextResponse.json({ message: "Invalid request body", status: 400 }, { status: 400 })
  }
}
