import { connect } from "@/dbConfig/db";
import { NextRequest, NextResponse } from "next/server";
import Todo from "@/models/todoSchema";
import { v4 } from "uuid";
import { getSession } from "next-auth/react";
import { options } from "../auth/[...nextauth]/options";
import { getServerSession } from "next-auth";

connect();
// const email = "patel20satyam@gmail.com"

export async function GET(request) {
  const session = await getServerSession(options);
  const userEmail = session.user.email;
  console.log(userEmail);
  try {
    const todos = await Todo.find({email:userEmail});
    console.log("Api Todo",todos);
    return NextResponse.json({ msg: "success", success: true, todos });
  } catch (error) {
    
    return NextResponse.json(
      { msg: "Issue happened: " + error },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { desc, email } = body;
    // console.log("Body:",body);
    // console.log("Email:",email);
    const todo = new Todo({
      id: v4(),
      desc,
      email,
      completed: false,
    });
    const saveTodo = await todo.save();
    return NextResponse.json({ msg: "success", success: true, saveTodo });
  } catch (error) {
    return NextResponse.json(
      { msg: "Issue happened: " + error },
      { status: 500 }
    );
  }
}
export async function DELETE(request) {
  const session = await getServerSession(options);
  const userEmail = session.user.email;
  console.log(userEmail);
  try {
    await Todo.deleteMany({email: userEmail});
    return NextResponse.json({ msg: "success", success: true });
  } catch (error) {
    return NextResponse.json(
      { msg: "Issue happened: " + error },
      { status: 500 }
    );
  }
}
