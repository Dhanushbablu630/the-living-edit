import type { Capability } from "@/lib/content";
import styles from "./services.module.css";

const fallback = [["01", "Residential interiors", "Homes with warmth, clarity and an unmistakable sense of you."], ["02", "Commercial design", "Purposeful workplaces and hospitality spaces with a memorable point of view."], ["03", "2D planning", "Spatial plans that make every square foot work beautifully."], ["04", "3D Visuals & Modeling", "Rendering, modeling, materials, lighting, animation and visualisation before the work begins."], ["05", "SketchUp", "Clear spatial studies that make early design decisions easier to see and refine."]];

export function Services({ capabilities }: { capabilities?: Capability[] }) {
  const content = capabilities?.length ? capabilities.map((capability, index) => [String(index + 1).padStart(2, "0"), capability.title, capability.short_description ?? "Thoughtful design support from concept to completion.", capability.slug]) : fallback.map(([number, title, copy]) => [number, title, copy, ""]);
  return <section className={styles.section} id="services"><div className={styles.heading}><p className="eyebrow">03 · Capabilities</p><h2>The complete <i>edit.</i></h2><p>One studio, from the first line on a plan to the last layer of texture.</p></div><div className={styles.list}>{content.map(([number, title, copy, slug]) => <a href={slug ? `/capabilities/${slug}` : "/capabilities"} key={title}><article><span>{number}</span><div><h3>{title}</h3><p>{copy}</p></div><b>↗</b></article></a>)}</div></section>;
}
