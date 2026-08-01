import Image from "next/image";

export function PageHero({ eyebrow, title, intro, image, imageAlt, imageClassName, children }: {
  eyebrow: string;
  title: string;
  intro: string;
  image: string;
  imageAlt: string;
  imageClassName?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="page-hero">
      <Image src={image} alt={imageAlt} fill priority sizes="100vw" className={`page-hero-image${imageClassName ? ` ${imageClassName}` : ""}`} />
      <div className="page-hero-scrim" />
      <div className="shell page-hero-inner">
        <span className="section-label light">{eyebrow}</span>
        <h1>{title}</h1>
        <p>{intro}</p>
        {children ? <div className="hero-actions">{children}</div> : null}
      </div>
      <div className="wave-edge" aria-hidden="true" />
    </section>
  );
}
