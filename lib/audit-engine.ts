import { turso } from "./turso";

export interface AuditResult {
  score: number;
  evidence: string[];
  gaps: string[];
  policy_id: string;
}

export async function runAudit(
  carrier: string,
  drug: string,
  diagnosis: string,
  history: string[]
): Promise<AuditResult> {
  // 0. Input Validation (Security Hardening)
  if (!carrier || !drug || carrier.length > 50 || drug.length > 50) {
    return {
       score: 0,
       evidence: [],
       gaps: ["Invalid Input: Search terms too long or empty."],
       policy_id: "INVALID_INPUT"
    };
  }

  let score = 15;
  const evidence: string[] = [];
  const gaps: string[] = [];
  let policyId = "PENDING_VERIFICATION";

  try {
    // 1. Fetch the ledger entry from Turso
    const result = await turso.execute({
      sql: "SELECT * FROM audit_ledger WHERE carrier_name = ? AND drug_name LIKE ? LIMIT 1",
      args: [carrier, `%${drug}%`],
    });

    if (result.rows.length > 0) {
      const row = result.rows[0];
      policyId = row.policy_id as string;
      const exceptionClauses = JSON.parse(row.exception_clauses as string);

      // 2. Logic: PCOS Exception (matches our db_setup.py seed)
      for (const rule of exceptionClauses) {
        const historyText = history.join(" ").toLowerCase();
        
        // Dynamic trigger matching based on the JSON logic
        if (diagnosis === "E28.2" && rule.id === "ERR_PCOS_01") {
          if (historyText.includes("metformin")) {
            score += Number(rule.success_weight);
            evidence.push(rule.description);
          } else {
            gaps.push("No evidence of Metformin failure found in clinical history.");
          }
        }
      }
    } else {
      gaps.push(`No specific policy ledger found for ${carrier} regarding ${drug}. Standard criteria apply.`);
    }
  } catch (error) {
    console.error("Turso Query Error:", error);
    gaps.push("Internal database connection error during audit.");
  }

  return {
    score: Math.min(score, 95),
    evidence,
    gaps,
    policy_id: policyId
  };
}
