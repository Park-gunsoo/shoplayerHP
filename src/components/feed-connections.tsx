"use client";

import { useEffect, useId, useState, type RefObject } from "react";
import { demoDuration } from "./demo-timing";
import styles from "./unified-feed-console.module.css";

type ConnectionMap = { width: number; height: number; paths: string[] };

export default function FeedConnections({ diagramRef, running, cycle }: { diagramRef: RefObject<HTMLDivElement | null>; running: boolean; cycle: number }) {
  const uid = useId().replace(/:/g, "");
  const [map, setMap] = useState<ConnectionMap | null>(null);

  useEffect(() => {
    const diagram = diagramRef.current;
    if (!diagram) return;
    const measure = () => {
      const bounds = diagram.getBoundingClientRect();
      const source = diagram.querySelector<HTMLElement>('[data-feed-part="source"]');
      const data = diagram.querySelector<HTMLElement>('[data-feed-part="data"]');
      const grid = diagram.querySelector<HTMLElement>('[data-feed-part="channels"]');
      if (!source || !data || !grid || !bounds.width) return;
      const local = (element: Element) => {
        const r = element.getBoundingClientRect();
        return { left: r.left - bounds.left, right: r.right - bounds.left, top: r.top - bounds.top, bottom: r.bottom - bounds.top, width: r.width, height: r.height };
      };
      const s = local(source), d = local(data), g = local(grid);
      const cards = Array.from(grid.children).map(local);
      const paths: string[] = [];
      const horizontal = d.left > s.right + 5;
      const curve = (sx: number, sy: number, ex: number, ey: number) => {
        const bend = Math.max(20, (ex - sx) * .55);
        return "M " + sx + " " + sy + " C " + (sx + bend) + " " + sy + " " + (ex - bend) + " " + ey + " " + ex + " " + ey;
      };
      if (horizontal) {
        [.28, .5, .72].forEach((fraction) => paths.push(curve(s.right + 1, s.top + s.height * fraction, d.left - 3, d.top + d.height * fraction)));
        const sx = d.right + 1, sy = d.top + d.height * .5;
        cards.forEach((card, index) => {
          const firstColumn = index % 2 === 0;
          if (firstColumn) {
            paths.push(curve(sx, sy, card.left - 3, card.top + card.height * .5));
          } else {
            const bottom = index === cards.length - 1;
            const routeY = bottom ? card.bottom + 22 : card.top - (index === 1 ? 22 : 9);
            const ex = card.left + card.width * .5;
            const ey = bottom ? card.bottom + 2 : card.top - 2;
            const bend = Math.min(16, Math.abs(routeY - ey));
            paths.push("M " + sx + " " + sy + " C " + (sx + 28) + " " + sy + " " + (sx + 22) + " " + routeY + " " + (sx + 52) + " " + routeY + " H " + (ex - bend) + " Q " + ex + " " + routeY + " " + ex + " " + (routeY + (bottom ? -bend : bend)) + " L " + ex + " " + ey);
          }
        });
      } else {
        const sx = s.left + s.width * .5, sy = s.bottom + 2;
        const dx = d.left + d.width * .5;
        paths.push("M " + sx + " " + sy + " C " + sx + " " + (sy + 20) + " " + dx + " " + (d.top - 20) + " " + dx + " " + (d.top - 3));
        const section = grid.parentElement;
        const sectionTop = section ? local(section).top : g.top;
        paths.push("M " + dx + " " + (d.bottom + 2) + " V " + (sectionTop - 3));
        const startX = g.left + g.width * .5, startY = g.top + 2;
        const firstTop = cards[0]?.top ?? startY;
        cards.forEach((card) => {
          const left = card.left + card.width * .5 < startX;
          if (card.top < firstTop + 3) {
            const ex = card.left + card.width * .5;
            paths.push("M " + startX + " " + startY + " C " + startX + " " + (startY + 13) + " " + ex + " " + (card.top - 13) + " " + ex + " " + (card.top - 2));
          } else {
            const laneX = left ? card.left - 9 : card.right + 9;
            const ex = left ? card.left - 2 : card.right + 2;
            const ey = card.top + card.height * .5;
            paths.push("M " + startX + " " + startY + " C " + startX + " " + (startY + 10) + " " + laneX + " " + (startY + 10) + " " + laneX + " " + (startY + 28) + " V " + (ey - 9) + " Q " + laneX + " " + ey + " " + ex + " " + ey);
          }
        });
      }
      setMap({ width: bounds.width, height: bounds.height, paths });
    };
    const frame = requestAnimationFrame(measure);
    const observer = new ResizeObserver(measure);
    observer.observe(diagram);
    diagram.querySelectorAll('[data-feed-part]').forEach((element) => observer.observe(element));
    return () => { cancelAnimationFrame(frame); observer.disconnect(); };
  }, [diagramRef]);

  if (!map) return null;
  return <svg className={styles.connectionCanvas} viewBox={"0 0 " + map.width + " " + map.height} aria-hidden="true">
    <defs><marker id={uid + "-arrow"} markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M 0 0 L 5 3 L 0 6" fill="none" stroke="#5c87d2" strokeWidth="1.1" /></marker></defs>
    <g key={cycle}>{map.paths.map((path, index) => <g key={index}>
      <path id={uid + "-path-" + index} d={path} className={styles.connectionPath} markerEnd={"url(#" + uid + "-arrow)"} />
      {running ? <circle r="2.7" fill="#e3974a" stroke="#fff" strokeWidth="1.1"><animateMotion dur={(demoDuration(1150) / 1000) + "s"} begin={(index * .045) + "s"} repeatCount="indefinite"><mpath href={"#" + uid + "-path-" + index} /></animateMotion></circle> : null}
    </g>)}</g>
  </svg>;
}
