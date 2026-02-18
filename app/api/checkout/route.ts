import { NextResponse } from "next/server";
import { turso } from "@/lib/turso";

export async function POST(req: Request) {
  try {
    const { auditId, carrier, drug } = await req.json();

    if (!auditId) {
      return NextResponse.json({ error: "Missing Audit ID" }, { status: 400 });
    }

    // 1. Log the initiation in DB
    try {
        await turso.execute({
            sql: "UPDATE user_audits SET payment_status = 'initiated' WHERE id = ?",
            args: [auditId],
        });
    } catch (e) {
        console.error("DB Log Error (Non-fatal):", e);
    }

    // 2. Redirect to Generic Payment Provider
    // Supports Lemon Squeezy, Gumroad, Paddle, etc.
    const paymentUrl = process.env.PAYMENT_PROVIDER_URL;
    
    // If no provider URL is set, we'll simulate a Mock Provider for testing
    if (!paymentUrl) {
       console.log("Mock Payment Initiated for:", auditId);
       // Return a URL that the frontend follows to the success page
       return NextResponse.json({ 
         url: `/audit/success?session_id=mock-session&audit_id=${auditId}&mock=true` 
       });
    }

    return NextResponse.json({ url: paymentUrl });
  } catch (error) {
    console.error("Payment Initiation Error:", error);
    return NextResponse.json({ error: "Payment initiation failed" }, { status: 500 });
  }
}
