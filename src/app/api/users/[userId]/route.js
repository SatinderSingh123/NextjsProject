import { connectDb } from "@/helper/db";
import { User } from "@/models/user";
import { NextResponse } from "next/server";

//get user

export async function GET(request, { params }) {
  const { userId } = params;
  await connectDb();
  const user = await User.findById(userId).select("-password");
  return NextResponse.json(user);
}

export async function DELETE(request, { params }) {
  // console.log(params)
  const { userId } = params;

  try {
    await User.deleteOne({
      _id: userId,
    });
    return NextResponse.json({
      message: "user Deleted",
      succedd: true,
    });
  } catch (error) {
    return NextResponse.json({
      message: "error in deleting user",
    });
  }
}

export async function PUT(request, { params }) {
  const { userId } = params;
  const { name, about, email, password } = await request.json();

  try {
    const user = await User.findById(userId);
    (user.name = name),
      (user.password = password),
      (user.email = email),
      (user.about = about);

    const updatedUser = await user.save();
    return NextResponse.json(updatedUser);
  } catch (error) {
    return NextResponse.json({
      message: "Failed to update",
    });
  }
}
