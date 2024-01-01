import prisma from "../../../lib/prisma";
import { NextResponse } from "next/server";

export async function handle() {
  const data = await prisma.board.findMany();
  return NextResponse.json(data);
}
