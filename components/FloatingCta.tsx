import Link from "next/link";
import { ROUTES } from "@/lib/routes";

export default function FloatingCta({ label = "Prendre un rdv" }: { label?: string }) {
  return (
    <Link href={ROUTES.contact} className="btn btn--dark floating-cta">
      {label}
    </Link>
  );
}
