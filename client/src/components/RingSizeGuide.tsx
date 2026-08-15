/** Golden Hour visual system: practical jewellery guidance in a quiet, editorial disclosure format. */
const sizeRows = [
  { size: "XS", uk: "H", diameter: "15.3 mm", eu: "48" },
  { size: "S", uk: "K", diameter: "16.1 mm", eu: "51" },
  { size: "M", uk: "N", diameter: "16.9 mm", eu: "54" },
  { size: "L", uk: "P", diameter: "17.7 mm", eu: "56" },
  { size: "XL", uk: "S", diameter: "18.5 mm", eu: "58" },
];

export default function RingSizeGuide() {
  return (
    <details className="ring-size-guide">
      <summary><span>Ring Size Guide</span><span>+</span></summary>
      <div className="ring-size-guide__content">
        <div className="ring-size-guide__intro"><span className="ring-size-guide__mark">◌</span><div><span className="eyebrow">Golden Hour fit notes</span><p>Choose your usual size or use the inside diameter of a ring you already wear comfortably.</p></div></div>
        <div className="ring-size-guide__table-wrap"><table><thead><tr><th>Golden Hour</th><th>UK</th><th>Inside Ø</th><th>EU</th></tr></thead><tbody>{sizeRows.map((row) => <tr key={row.size}><td>{row.size}</td><td>{row.uk}</td><td>{row.diameter}</td><td>{row.eu}</td></tr>)}</tbody></table></div>
        <div className="ring-size-guide__tips"><section><span className="eyebrow">Measure an existing ring</span><ol><li>Place the ring flat on a ruler.</li><li>Measure the inside edge from side to side.</li><li>Match that measurement to the table above.</li></ol></section><section><span className="eyebrow">A little guidance</span><p>If you are between sizes, choose the larger size. Measure at the end of the day, when fingers are usually at their fullest.</p></section></div>
      </div>
    </details>
  );
}
