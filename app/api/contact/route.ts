import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  if (!body?.email || !body?.message) {
    return NextResponse.json({ ok: false, message: "Missing fields" }, { status: 400 });
  }
  return NextResponse.json({ ok: true });
}
