"use client";

const CAL_LINK = "satisa/formation";
const CAL_NAMESPACE = "formation";

type CalFn = ((...args: unknown[]) => void) & {
  loaded?: boolean;
  ns?: Record<string, (...args: unknown[]) => void>;
  q?: unknown[];
  config?: Record<string, unknown>;
};

// Cal.com's embed script sets third-party cookies as soon as it loads, so it is
// only fetched when the visitor shows interest in booking (hover, focus, tap).
function loadCal(): void {
  const w = window as unknown as { Cal?: CalFn };
  if (w.Cal) return;

  const queue = (target: { q?: unknown[] }, args: unknown[]) => {
    (target.q = target.q || []).push(args);
  };

  const cal: CalFn = function (...args: unknown[]) {
    if (args[0] === "init") {
      const namespace = args[1];
      const api = ((...a: unknown[]) => queue(api as { q?: unknown[] }, a)) as unknown as (
        ...a: unknown[]
      ) => void;
      if (typeof namespace === "string") {
        cal.ns = cal.ns || {};
        cal.ns[namespace] = cal.ns[namespace] || api;
        queue(cal.ns[namespace] as unknown as { q?: unknown[] }, args);
        queue(cal as { q?: unknown[] }, ["initNamespace", namespace]);
      } else {
        queue(cal as { q?: unknown[] }, args);
      }
      return;
    }
    queue(cal as { q?: unknown[] }, args);
  } as CalFn;

  w.Cal = cal;
  const script = document.createElement("script");
  script.src = "https://app.cal.com/embed/embed.js";
  document.head.appendChild(script);
  cal.loaded = true;

  cal("init", CAL_NAMESPACE, { origin: "https://app.cal.com" });
  cal.config = { forwardQueryParams: true };
  cal.ns?.[CAL_NAMESPACE]("ui", { hideEventTypeDetails: false, layout: "month_view" });
}

function openCal(): void {
  loadCal();
  const w = window as unknown as { Cal?: CalFn };
  w.Cal?.ns?.[CAL_NAMESPACE]("modal", {
    calLink: CAL_LINK,
    config: { layout: "month_view", useSlotsViewOnSmallScreen: "true" },
  });
}

export default function CalBookingButton() {
  return (
    <button
      type="button"
      className="btn btn--primary btn--block"
      onPointerEnter={loadCal}
      onFocus={loadCal}
      onTouchStart={loadCal}
      onClick={openCal}
    >
      Choisir un créneau
    </button>
  );
}
