/** Golden Hour visual system: practical jewellery guidance in a quiet, editorial disclosure format. */
import { ringSizes as sizeRows } from "@/lib/ringSizes";

export default function RingSizeGuide({ expanded = false, standalone = false }: { expanded?: boolean; standalone?: boolean }) {
  return (
    <details className={`ring-size-guide ${standalone ? "ring-size-guide--standalone" : ""}`} open={expanded}>
      <summary><span>Ring Size Guide</span><span>+</span></summary>
      <div className="ring-size-guide__content">
        <div className="ring-size-guide__intro"><span className="ring-size-guide__mark">◌</span><div><span className="eyebrow">Cherished fit notes</span><p>Choose your usual size or use the inside diameter of a ring you already wear comfortably.</p></div></div>
        <div className="ring-size-guide__table-wrap"><table><thead><tr><th>Cherished</th><th>UK</th><th>Inside Ø</th><th>US</th><th>EU</th></tr></thead><tbody>{sizeRows.map((row) => <tr key={row.size}><td>{row.size}</td><td>{row.uk}</td><td>{row.diameter}</td><td>{row.us}</td><td>{row.eu}</td></tr>)}</tbody></table></div>
        <div className="ring-size-guide__tips"><section><span className="eyebrow">Measure an existing ring</span><ol><li>Place the ring flat on a ruler.</li><li>Measure the inside edge from side to side.</li><li>Match that measurement to the table above.</li></ol></section><section><span className="eyebrow">A little guidance</span><p>US sizes are shown in half-size increments. If you are between sizes, choose the larger size and measure at the end of the day.</p></section></div>
      </div>
    </details>
  );
}
