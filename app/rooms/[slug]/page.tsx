import { EditorialPageTemplate } from "@/components/editorial-page";
import { getEditorialPage, rooms } from "@/lib/editorial-content";
import { notFound } from "next/navigation";

export function generateStaticParams() { return rooms.map(({ slug }) => ({ slug })); }
export default async function RoomDetail({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const page = getEditorialPage("rooms", slug); if (!page) notFound(); return <EditorialPageTemplate page={page} sectionLabel="Room design" />; }
