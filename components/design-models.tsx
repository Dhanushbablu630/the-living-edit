import styles from "./design-models.module.css";
import { LazyVideo } from "./lazy-video";

export function DesignModels() {
  return <section className={styles.section} id="design-models">
    <div className={styles.intro}><p className="eyebrow">04 · Design & models</p><h2>See it before<br />you <i>step inside.</i></h2><p>Our technical drawings, considered modelling and cinematic walkthroughs make every decision clear long before execution begins.</p></div>
    <LazyVideo className={styles.videoFrame} src="/videos/Floor_plan_to_luxury_interior_202607231718.mp4" poster="/media/sections/2d-planning/image-01.jpeg" label="The Living Edit floor plan to interior walkthrough">
      <div className={styles.overlay} /><div className={styles.label}><span>Spatial study / 01</span><b>Design in motion</b><span>Scroll to explore</span></div>
    </LazyVideo>
  </section>;
}
