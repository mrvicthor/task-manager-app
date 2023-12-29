import prisma from "../../../lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const data = await prisma.board.findMany();
  return NextResponse.json(data);
}
