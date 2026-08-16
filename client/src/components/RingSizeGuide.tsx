/** Golden Hour visual system: practical jewellery guidance in a quiet, editorial disclosure format. */
const sizeRows = [
  { size: "XS", uk: "I½", diameter: "15.3 mm", us: "4½", eu: "48" },
  { size: "S", uk: "K½", diameter: "16.1 mm", us: "5½", eu: "51" },
  { size: "M", uk: "M½", diameter: "16.9 mm", us: "6½", eu: "53" },
  { size: "L", uk: "O½", diameter: "17.7 mm", us: "7½", eu: "56" },
  { size: "XL", uk: "Q½", diameter: "18.5 mm", us: "8½", eu: "58" },
];

export default function RingSizeGuide() {
  return (
    <details className="ring-size-guide">
      <summary><span>Ring Size Guide</span><span>+</span></summary>
      <div className="ring-size-guide__content">
        <div className="ring-size-guide__intro"><span className="ring-size-guide__mark">◌</span><div><span className="eyebrow">Golden Hour fit notes</span><p>Choose your usual size or use the inside diameter of a ring you already wear comfortably.</p></div></div>
        <div className="ring-size-guide__table-wrap"><table><thead><tr><th>Golden Hour</th><th>UK</th><th>Inside Ø</th><th>US</th><th>EU</th></tr></thead><tbody>{sizeRows.map((row) => <tr key={row.size}><td>{row.size}</td><td>{row.uk}</td><td>{row.diameter}</td><td>{row.us}</td><td>{row.eu}</td></tr>)}</tbody></table></div>
        <div className="ring-size-guide__tips"><section><span className="eyebrow">Measure an existing ring</span><ol><li>Place the ring flat on a ruler.</li><li>Measure the inside edge from side to side.</li><li>Match that measurement to the table above.</li></ol></section><section><span className="eyebrow">A little guidance</span><p>US sizes are shown in half-size increments. If you are between sizes, choose the larger size and measure at the end of the day.</p></section></div>
      </div>
    </details>
  );
}
