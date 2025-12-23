import { getServerSession } from "@/lib/getSession";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ todoId: string }> }
) {
  try {
    const body = await req.json();
    const { content, completed } = body;
    const { todoId } = await params;
    const session = await getServerSession();

    if (!session) {
      return NextResponse.json({ message: "unauthorized" }, { status: 401 });
    }

    const todo = await prisma.todo.findFirst({
      where: {
        id: todoId,
        userId: session.user.id,
      },
    });

    if (!todo) {
      return NextResponse.json({ message: "todo not found" }, { status: 404 });
    }

    const updatedTodo = await prisma.todo.update({
      where: { id: todoId },
      data: {
        ...(content !== undefined && { content }),
        ...(completed !== undefined && { completed }),
      },
    });

    return NextResponse.json(
      { message: "todo updated successfully", updatedTodo },
      { status: 200 }
    );
  } catch (error) {
    console.error("error updating todo", error);
    return NextResponse.json(
      { message: "error updating todo" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  {
    params,
  }: {
    params: Promise<{ todoId: string }>;
  }
) {
  try {
    const session = await getServerSession();

    if (!session) {
      return NextResponse.json({ message: "unauthorized" }, { status: 401 });
    }

    const { todoId } = await params;

    const todo = await prisma.todo.findFirst({
      where: { id: todoId, userId: session.user.id },
    });

    if (!todo) {
      return NextResponse.json({ message: "todo not found" }, { status: 404 });
    }

    const deletedTodo = await prisma.todo.delete({ where: { id: todoId } });

    return NextResponse.json(
      { message: "todo deleted successfully", deletedTodo },
      { status: 200 }
    );
  } catch (error) {
    console.error("error deleting todo", error);
    return NextResponse.json(
      { message: "error deleting todo" },
      { status: 500 }
    );
  }
}
