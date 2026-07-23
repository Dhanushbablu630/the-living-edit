import { EditorialPageTemplate } from "@/components/editorial-page";
import { getEditorialPage, services } from "@/lib/editorial-content";
import { notFound } from "next/navigation";

export function generateStaticParams() { return services.map(({ slug }) => ({ slug })); }
export default async function ServiceDetail({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const page = getEditorialPage("services", slug); if (!page) notFound(); return <EditorialPageTemplate page={page} sectionLabel="Service" />; }
