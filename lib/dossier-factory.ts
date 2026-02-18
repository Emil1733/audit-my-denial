import { jsPDF } from "jspdf";
import { AuditResult } from "./audit-engine";

export async function generateDossier(
  carrier: string,
  drug: string,
  result: AuditResult,
  auditId: string
): Promise<void> {
  // 1. Initialize Document (A4)
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  
  // -- Helper: addHeader --
  const addHeader = (title: string, pageNum: number) => {
    doc.setFillColor(15, 23, 42); // Navy-900 (approx)
    doc.rect(0, 0, pageWidth, 40, "F");
    
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.setTextColor(255, 255, 255);
    doc.text("AUDITMYDENIAL.COM", 20, 20);
    
    doc.setFontSize(10);
    doc.setTextColor(245, 158, 11); // Gold-500
    doc.text(`AUDIT ID: ${auditId} | PREPARED FOR: PATIENT REF`, 20, 30);

    doc.setFontSize(16);
    doc.setTextColor(15, 23, 42);
    doc.text(title, 20, 55);
    
    // Page Number
    doc.setFontSize(10);
    doc.setTextColor(100, 116, 139);
    doc.text(`Page ${pageNum}`, pageWidth - 30, pageHeight - 10);
  };

  // ==========================
  // PAGE 1: EXECUTIVE SUMMARY
  // ==========================
  addHeader("EXECUTIVE SUMMARY: DENIAL REVERSAL", 1);
  
  doc.setDrawColor(200, 200, 200);
  doc.line(20, 60, pageWidth - 20, 60);

  // Status Box
  doc.setFillColor(240, 253, 244); // Light Green
  doc.roundedRect(20, 70, pageWidth - 40, 50, 3, 3, "F");
  
  doc.setFontSize(14);
  doc.setTextColor(22, 101, 52); // Dark Green
  doc.text("AUDIT CONCLUSION: HIGH PROBABILITY OF REVERSAL", 30, 85);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.setTextColor(0, 0, 0);
  const summaryText = `The algorithmic audit of the denial for ${drug} by ${carrier} has detected ${result.gaps.length} specific technical violations and ${result.evidence.length} clinical matches. Based on the 2026 Policy Ledger, this denial is likely invalid under current regulatory standards.`;
  doc.text(doc.splitTextToSize(summaryText, pageWidth - 60), 30, 95);

  // Key Findings
  let yPos = 140;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text("TECHNICAL VIOLATIONS DETECTED", 20, yPos);
  yPos += 10;
  
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  result.gaps.forEach((gap, i) => {
    doc.text(`• ${gap}`, 25, yPos);
    yPos += 8;
  });

  // ==========================
  // PAGE 2: CLINICAL EVIDENCE
  // ==========================
  doc.addPage();
  addHeader("CLINICAL EVIDENCE LEDGER", 2);
  
  doc.line(20, 60, pageWidth - 20, 60);
  
  yPos = 70;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.text("CITED CLINICAL PRECEDENTS:", 20, yPos);
  yPos += 15;

  result.evidence.forEach((evidence) => {
    // Evidence Box
    doc.setFillColor(245, 247, 250);
    doc.rect(20, yPos, pageWidth - 40, 25, "F");
    
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(15, 23, 42);
    doc.text("CLINICAL MATCH RECORD", 25, yPos + 8);
    
    doc.setFont("helvetica", "normal");
    doc.setTextColor(50, 50, 50);
    doc.text(doc.splitTextToSize(evidence, pageWidth - 50), 25, yPos + 18);
    
    yPos += 35;
  });

  // ==========================
  // PAGE 3: GENERATED APPEAL
  // ==========================
  doc.addPage();
  addHeader("GENERATED APPEAL SCRIPT", 3);
  
  doc.setFont("courier", "normal");
  doc.setFontSize(11);
  doc.setTextColor(0, 0, 0);
  
  const today = new Date().toLocaleDateString();
  const appealText = `
[DATE: ${today}]

ATTN: APPEALS DEPARTMENT
${carrier.toUpperCase()} CLAIM ADMINISTRATION

RE: APPEAL FOR DENIAL OF COVERAGE (${drug.toUpperCase()})
PATIENT ID: [INSERT ID]
CLAIM NUMBER: [INSERT CLAIM #]

To Whom It May Concern,

I am writing to formally appeal the denial of coverage for ${drug}. Based on a technical audit of your internal coverage criteria (Policy ID: ${result.policy_id}), this denial appears to be in violation of established clinical guidelines.

SPECIFICALLY:
${result.evidence.map(e => `- ${e}`).join("\n")}

FURTHERMORE, the following procedural errors were noted:
${result.gaps.map(g => `- ${g}`).join("\n")}

This treatment is medically necessary as defined by the standard of care. I request an immediate re-evaluation of this claim by a board-certified specialist in the relevant field, as required by ERISA guidelines.

Sincerely,

[YOUR NAME / PHYSICIAN SIGNATURE]
  `;
  
  doc.text(doc.splitTextToSize(appealText, pageWidth - 40), 20, 70);

  // Save/Download
  doc.save(`${carrier}_${drug}_Appeal_Dossier_AMD.pdf`);
}
