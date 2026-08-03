import { cabinAmenities, cabinPolicies } from "@/lib/cabins";

export function CabinStayInfo() {
  return (
    <>
      <section className="cream-section">
        <div className="shell two-column-copy">
          <div>
            <p className="eyebrow">Inside each cabin</p>
            <h2>Simple, comfortable stays</h2>
            <ul className="plain-list">
              {cabinAmenities.map((amenity) => (
                <li key={amenity}>{amenity}</li>
              ))}
            </ul>
          </div>
          <div className="rate-block">
            <span>Current listed rate</span>
            <strong>$150</strong>
            <small>per day, with a two-day minimum</small>
            <p>The two-day minimum also applies around three-day holiday weekends.</p>
          </div>
        </div>
      </section>

      <section className="content-section">
        <div className="shell policy-layout">
          <div>
            <p className="eyebrow">Cabin policies</p>
            <h2>Before you reserve</h2>
          </div>
          <div className="policy-list">
            {cabinPolicies.map((policy, index) => (
              <p key={`${policy.lead}-${index}`}>
                {policy.lead ? <strong>{policy.lead}</strong> : null}
                {policy.lead && policy.detail ? " " : null}
                {policy.detail}
              </p>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
