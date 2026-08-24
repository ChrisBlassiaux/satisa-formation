"use client";

import { useEffect, useRef } from "react";

export default function BlogFilters({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const filterButtons = Array.from(container.querySelectorAll<HTMLButtonElement>("[data-filter]"));
    const filterCards = Array.from(container.querySelectorAll<HTMLElement>("[data-category]"));

    function handleClick(this: HTMLButtonElement) {
      const filter = this.getAttribute("data-filter");

      filterButtons.forEach((b) => b.classList.remove("tag--active"));
      this.classList.add("tag--active");

      filterCards.forEach((card) => {
        const show = filter === "all" || card.getAttribute("data-category") === filter;
        card.style.display = show ? "" : "none";
      });
    }

    filterButtons.forEach((button) => button.addEventListener("click", handleClick));

    return () => {
      filterButtons.forEach((button) => button.removeEventListener("click", handleClick));
    };
  }, []);

  return <div ref={containerRef}>{children}</div>;
}
