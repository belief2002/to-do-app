import { connect } from "@/dbConfig/db";
import { NextRequest, NextResponse } from "next/server";
import Todo from "@/models/todoSchema";



// export async function GET(request) {
//   try {
//     const path = request.nextUrl.pathname.split("/");
//     const email = path[path.length - 1];
//     console.log("email: " + path);
//     const todos = await Todo.find({email:email});
//     console.log("Api Todo",todos);
//     return NextResponse.json({ msg: "success", success: true, todos });
//   } catch (error) {
//     return NextResponse.json(
//       { msg: "Issue happened: " + error },
//       { status: 500 }
//     );
//   }
// }


export async function DELETE(request) {
  try {
    //getting id from request
    const path = request.nextUrl.pathname.split("/");
    const id = path[path.length - 1];
    // console.log("id", id);
    //todo delete
    await Todo.deleteOne({ id });

    return NextResponse.json({ msg: "success", success: true });
  } catch (error) {
    return NextResponse.json(
      { msg: "Issue happened: " + error },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  try {
    //getting id from request
    const path = request.nextUrl.pathname.split("/");
    const id = path[path.length - 1];
    const reqBody = await request.json();
    const { desc, completed } = reqBody;
    await Todo.updateOne({id},{$set:{desc,completed}});
    return NextResponse.json({ msg: "success edit", success: true });

  } catch (error) {
    return NextResponse.json(
      { msg: "Issue happened: " + error },
      { status: 500 }
    );
  }
}
