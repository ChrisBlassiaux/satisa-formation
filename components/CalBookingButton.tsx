import Script from "next/script";

const CAL_EMBED_SNIPPET = `
  (function (C, A, L) { let p = function (a, ar) { a.q.push(ar); }; let d = C.document; C.Cal = C.Cal || function () { let cal = C.Cal; let ar = arguments; if (!cal.loaded) { cal.ns = {}; cal.q = cal.q || []; d.head.appendChild(d.createElement("script")).src = A; cal.loaded = true; } if (ar[0] === L) { const api = function () { p(api, arguments); }; const namespace = ar[1]; api.q = api.q || []; if(typeof namespace === "string"){cal.ns[namespace] = cal.ns[namespace] || api;p(cal.ns[namespace], ar);p(cal, ["initNamespace", namespace]);} else p(cal, ar); return;} p(cal, ar); }; })(window, "https://app.cal.com/embed/embed.js", "init");
  Cal("init", "formation", {origin:"https://app.cal.com"});
  Cal.config = Cal.config || {};
  Cal.config.forwardQueryParams = true;

  Cal.ns.formation("ui", {"hideEventTypeDetails":false,"layout":"month_view"});
`;

export default function CalBookingButton() {
  return (
    <>
      <button
        type="button"
        className="btn btn--primary btn--block"
        data-cal-link="satisa/formation"
        data-cal-namespace="formation"
        data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}'
      >
        Choisir un créneau
      </button>
      <Script id="cal-embed" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: CAL_EMBED_SNIPPET }} />
    </>
  );
}
