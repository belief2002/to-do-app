import { connect } from "@/dbConfig/db";
import { NextRequest, NextResponse } from "next/server";
import Todo from "@/models/todoSchema";
import { v4 } from "uuid";
connect();
export async function GET(request) {
  try {
    const todos = await Todo.find({});
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
    const { desc } = body;
    console.log("Body:",body);
    console.log("Desc:",desc);
    const todo = new Todo({
      id: v4(),
      desc,
      completed: false,
    });
    const saveTodo = await todo.save();
    return NextResponse.json({ msg:"success", success:true,saveTodo});
  } catch (error) {
    return NextResponse.json(
      { msg: "Issue happened: " + error },
      { status: 500 }
    );
  }
}
export async function DELETE(request) {
  try {
    await Todo.deleteMany({});
    return NextResponse.json({ msg:"success", success: true});
    
  } catch (error) {
    return NextResponse.json(
      { msg: "Issue happened: " + error },
      { status: 500 }
    );
  }
}
