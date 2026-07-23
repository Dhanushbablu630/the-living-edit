import Image from "next/image";
import { services } from "@/lib/editorial-content";
import { mediaFor } from "@/lib/editorial-media";

export default function ServicesPage() {
  return <main><section className="contentHeader"><p>The Living Edit · Services</p><h1>The complete <i>edit.</i></h1></section><section className="contentGrid">{services.map((service) => <a className="contentCard" href={`/capabilities/${service.slug}`} key={service.slug}><Image src={mediaFor(service.slug)[0]} alt={`${service.title} design study`} width={1376} height={768} sizes="(max-width: 700px) 86vw, 27vw" loading="lazy" style={{ objectFit: "cover" }} /><h2>{service.title}</h2><p>{service.subtitle}</p></a>)}</section></main>;
}
