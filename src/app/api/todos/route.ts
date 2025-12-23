import { getServerSession } from "@/lib/getSession";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await getServerSession();

    if (!session) {
      return NextResponse.json({ message: "unauthorized" }, { status: 401 });
    }

    const todos = await prisma.todo.findMany({
      where: {
        userId: session?.user.id,
      },
    });

    return NextResponse.json(todos, { status: 200 });
  } catch (error) {
    console.error("failed to fetch todos", error);
    return NextResponse.json(
      { message: "failed to fetch todos" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession();
    const body = await req.json();
    const { content } = body;

    if (!session) {
      return NextResponse.json({ message: "unauthorized" }, { status: 401 });
    }

    if (!content.trim()) {
      return NextResponse.json(
        { message: "You must enter a valid todo" },
        { status: 400 }
      );
    }

    const newTodo = await prisma.todo.create({
      data: {
        userId: session.user.id,
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
