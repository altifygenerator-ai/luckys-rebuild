import { campingPrices, floatPrices, pricingNotes, shuttlePrices } from "@/lib/pricing";
import { site } from "@/lib/site";

export function PricingSection() {
  return (
    <section className="pricing-section" id="pricing">
      <div className="shell">
        <div className="pricing-heading">
          <div>
            <p className="eyebrow light">Current rates</p>
            <h2>Cash Prices</h2>
          </div>
          <p>Call before your trip to confirm availability, river conditions, and the day&apos;s last put-in time.</p>
        </div>

        <div className="cash-price-notice" role="note">
          <strong>These are cash prices.</strong>
          <span>Credit-card transactions are subject to a 10% charge plus applicable card-processing fees. Payment is handled in person.</span>
        </div>

        <div className="pricing-grid">
          <div className="pricing-group">
            <h3>Boats, kayaks, rafts &amp; tubes</h3>
            <div className="price-table">
              {floatPrices.map((row) => (
                <div className="price-row" key={row.item}>
                  <strong>{row.item}</strong>
                  <div>{row.prices.map((price) => <span key={price}>{price}</span>)}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="pricing-group">
            <h3>Shuttles &amp; pickup</h3>
            <div className="price-table">
              {shuttlePrices.map((row) => (
                <div className="price-row" key={row.item}>
                  <strong>{row.item}</strong>
                  <div><span>{row.price}</span>{row.note ? <small>{row.note}</small> : null}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="pricing-group">
            <h3>Camping</h3>
            <div className="price-table">
              {campingPrices.map((row) => (
                <div className="price-row" key={row.item}>
                  <strong>{row.item}</strong>
                  <div><span>{row.price}</span></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="pricing-notes">
          <h3>Additional charges and details</h3>
          <ul>
            {pricingNotes.slice(2).map((note) => <li key={note}>{note}</li>)}
          </ul>
          <a className="button button-gold" href={site.phoneHref}>Call {site.phoneDisplay}</a>
        </div>
      </div>
    </section>
  );
}
