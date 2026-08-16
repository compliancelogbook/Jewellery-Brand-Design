/** Golden Hour sandbox: a removable motion study that leaves the original craft band untouched. */
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const principles = [
  { number: "01", title: "Quietly considered", copy: "Pieces made in measured editions, with attention held in every finish." },
  { number: "02", title: "Elegance, every day", copy: "Timeless jewellery with the poise to elevate an occasion and the ease to live in daily." },
  { number: "03", title: "Beautifully bestowed", copy: "A considered final detail, ready to mark a moment or become part of your own ritual." },
];

export default function CraftSandbox() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const marqueeX = useTransform(scrollYProgress, [0, 1], reduceMotion ? ["0%", "0%"] : ["-10%", "10%"]);
  const panelY = useTransform(scrollYProgress, [0, 1], reduceMotion ? ["0px", "0px"] : ["18px", "-18px"]);

  return <section className="craft-sandbox" ref={sectionRef} aria-labelledby="craft-sandbox-title">
    <motion.div className="craft-sandbox__marquee" style={{ x: marqueeX }} aria-hidden="true"><span>Timeless pieces · everyday radiance · beauty in the details · elegant occasions · </span><span>Timeless pieces · everyday radiance · beauty in the details · elegant occasions · </span></motion.div>
    <div className="craft-sandbox__inner">
      <div className="craft-sandbox__heading"><span className="eyebrow">Sandbox / motion study</span><h2 id="craft-sandbox-title">Jewellery with<br /><em>lasting poise.</em></h2><p>A new editorial direction for the original three-point section. It is shown here only for comparison; the existing version remains unchanged above.</p></div>
      <motion.div className="craft-sandbox__panel" style={{ y: panelY }}>
        <div className="craft-sandbox__panel-label"><span>Golden Hour / London</span><i>Prototype 01</i></div>
        <div className="craft-sandbox__principles">{principles.map((principle) => <article key={principle.number}><b>{principle.number}</b><h3>{principle.title}</h3><p>{principle.copy}</p></article>)}</div>
      </motion.div>
    </div>
  </section>;
}
