type PaymentOption = {
  icon: "check" | "calendar";
  label: string;
  price: string;
  detail?: string;
};

const ICONS = {
  check: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M8.5 12l2.5 2.5 4.5-5" />
    </svg>
  ),
  calendar: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4.5" width="18" height="15" rx="2" />
      <path d="M3 9.5h18" />
      <circle cx="8" cy="14.5" r="1" />
      <circle cx="12" cy="14.5" r="1" />
      <circle cx="16" cy="14.5" r="1" />
    </svg>
  ),
};

export default function PaymentOptions({ options }: { options: PaymentOption[] }) {
  return (
    <>
      <p className="pricing-card__payment-title">Options de paiement</p>
      <div className="pricing-card__payment-options">
        {options.map((option) => (
          <div className="payment-option" key={option.label}>
            <span className="payment-option__icon" aria-hidden="true">
              {ICONS[option.icon]}
            </span>
            <div>
              <p className="payment-option__label">{option.label}</p>
              <p className="payment-option__price">{option.price}</p>
              {option.detail ? <p className="payment-option__detail">{option.detail}</p> : null}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
