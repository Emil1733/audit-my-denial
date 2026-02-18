import AuditClientPage from "@/components/audit/AuditClientPage";

export async function generateMetadata({ params }: { params: { carrier: string; drug: string } }) {
  const carrier = decodeURIComponent(params.carrier);
  const drug = decodeURIComponent(params.drug);
  
  return {
    title: `Appeal ${carrier} ${drug} Denial | Instant Audit`,
    description: `Generate a legal appeal dossier for your ${carrier} ${drug} denial. Our engine checks Policy CPB 0533 and FDA guidelines to reverse this decision.`,
    openGraph: {
      title: `Failed ${carrier} coverage for ${drug}? We found the loophole.`,
      description: "See the exact clinical policy clause you violated and how to fix it."
    },
    alternates: {
      canonical: `/audit/${params.carrier}/${params.drug}`
    }
  };
}

export default function AuditResultPage({ params }: { params: { carrier: string; drug: string } }) {
  const carrier = decodeURIComponent(params.carrier);
  const drug = decodeURIComponent(params.drug);
  
  return <AuditClientPage carrier={carrier} drug={drug} />;
}
