import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const todos = await prisma.todo.findMany();

  return NextResponse.json(todos, { status: 200 });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { content } = body;

    if (!content.trim()) {
      return NextResponse.json(
        { message: "You must enter a valid todo" },
        { status: 400 }
      );
    }

    const newTodo = await prisma.todo.create({
      data: {
        content,
      },
    });

    return NextResponse.json(
      { meesage: "Todo created successfully", newTodo },
      { status: 201 }
    );
  } catch (error) {
    console.error("failed to create todo", error);
    return NextResponse.json(
      { message: "failed to create todo" },
      { status: 500 }
    );
  }
}
