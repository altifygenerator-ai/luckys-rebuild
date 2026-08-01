"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav } from "@/lib/site";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="site-header">
      <div className="shell masthead">
        <Link className="site-logo" href="/" aria-label="Lucky's Canoe Rental home">
          <Image src="/images/luckys-logo.png" alt="Lucky's Caddo River Canoe and Kayak Rental" width={147} height={132} priority />
        </Link>

        <button
          className="menu-button"
          type="button"
          aria-expanded={open}
          aria-controls="main-navigation"
          onClick={() => setOpen((value) => !value)}
        >
          <span /><span /><span />
          <span className="sr-only">Toggle navigation</span>
        </button>

        <nav id="main-navigation" className={`main-nav ${open ? "is-open" : ""}`} aria-label="Main navigation">
          {nav.map((item) => {
            const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return <Link className={active ? "active" : ""} href={item.href} key={item.href}>{item.label}</Link>;
          })}
        </nav>
      </div>
    </header>
  );
}
