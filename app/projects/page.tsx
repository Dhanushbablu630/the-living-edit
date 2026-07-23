import Image from "next/image";
import { portfolioProjects } from "@/lib/site-media";

export default function ProjectsPage() {
  return <main><section className="contentHeader"><p>The Living Edit · Portfolio</p><h1>Projects with<br /><i>presence.</i></h1></section><section className="portfolioList">{portfolioProjects.map(([name, category, description, image, position], index) => <article className={`portfolioFeature feature-${index + 1}`} key={name}><div className="portfolioFeatureImage"><Image src={image} alt={name} width={1600} height={1000} sizes="(max-width: 800px) 86vw, 60vw" loading={index < 2 ? "eager" : "lazy"} priority={index === 0} style={{ objectPosition: position }} /></div><div className="portfolioFeatureCopy"><span>0{index + 1}</span><p className="portfolioMeta">{category}</p><h2>{name}</h2><p>{description}</p><a href="/#quote">Discuss a similar space <b>→</b></a></div></article>)}</section></main>;
}
