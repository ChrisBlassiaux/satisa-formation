import type { FaqItem } from "@/lib/formations";

export default function FaqList({ items }: { items: FaqItem[] }) {
  return (
    <div>
      {items.map((item) => (
        <details key={item.question} className="faq-item">
          <summary className="faq-item__question">
            {item.question}
            <span className="faq-item__icon" aria-hidden="true"></span>
          </summary>
          <p className="faq-item__answer">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
