import React from 'react';
import { products } from '../data/siteContent.js';

export default function Products() {
  return (
    <section className="products section-shell" id="products" aria-labelledby="products-heading">
      <p className="eyebrow">Our Products</p>
      <h2 id="products-heading">Built by Nexavrios</h2>
      <p className="products-intro">
        Purpose-built software solutions that solve real enterprise challenges — from campus management
        to cybersecurity and business operations.
      </p>

      <div className="products-list">
        {products.map(({ id, name, tagline, image, imageWebp, accent, badge, description, tags }, idx) => (
          <article
            key={id}
            className={`product-card ${accent} ${idx % 2 === 1 ? 'product-card--reversed' : ''}`}
            id={`product-${id}`}
          >
            <div className="product-image-wrap">
              <span className={`product-badge product-badge--${accent}`}>{badge}</span>
              <picture>
                <source srcSet={imageWebp || image.replace(/\.(jpg|jpeg|png)$/, '.webp')} type="image/webp" />
                <img
                  className="product-img"
                  src={image}
                  alt={`${name} — ${tagline}`}
                  width="420"
                  height="420"
                  loading="lazy"
                  decoding="async"
                />
              </picture>
              <div className="product-img-glow" aria-hidden="true" />
            </div>

            <div className="product-copy">
              <p className={`product-eyebrow product-eyebrow--${accent}`}>{tagline}</p>
              <h3 className="product-name">{name}</h3>
              <p className="product-description">{description}</p>
              <ul className="product-tags" aria-label={`${name} features`}>
                {tags.map((tag) => (
                  <li key={tag} className={`product-tag product-tag--${accent}`}>
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
