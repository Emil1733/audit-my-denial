import { NextResponse } from "next/server";
import { turso } from "@/lib/turso";
import { randomUUID } from "crypto";

export async function POST(req: Request) {
  try {
    const { email, claimValue, auditId } = await req.json();

    if (!email || !claimValue) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Insert lead into Turso
    // Note: We use the auditId if provided, or generate a new one if it's missing (fallback)
    const id = auditId || randomUUID();
    const createdAt = new Date().toISOString();

    // Utilizing the new 'claim_value' column
    await turso.execute({
      sql: `INSERT INTO user_audits (id, email, claim_value, created_at) VALUES (?, ?, ?, ?)`,
      args: [id, email, claimValue, createdAt],
    });

    return NextResponse.json({ success: true, id });
  } catch (error) {
    console.error("Lead Capture Error:", error);
    return NextResponse.json({ error: "Failed to capture lead" }, { status: 500 });
  }
}
