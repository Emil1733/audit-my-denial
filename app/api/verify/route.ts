import { NextResponse } from "next/server";
import { runAudit } from "@/lib/audit-engine";

export async function POST(req: Request) {
  try {
    const { carrier, drug, diagnosis, history } = await req.json();

    const auditResult = await runAudit(carrier, drug, diagnosis, history);

    return NextResponse.json(auditResult);
  } catch (error) {
    console.error("Audit API Error:", error);
    return NextResponse.json({ error: "Failed to process audit" }, { status: 500 });
  }
}
