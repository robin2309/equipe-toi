class ProductCard extends HTMLElement {
  static get observedAttributes() {
    return ['image', 'title', 'amazon', 'description', 'price','rating'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        :host {
          background-color: white;
          border-radius: var(--border-radius);
          box-shadow: var(--box-shadow);
          overflow: hidden;
          transition: var(--transition);
          position: relative;
          display: block;
        }
        :host:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
        }
        .product-title {
          font-size: 1.2rem;
          color: var(--primary-color);
          margin-bottom: 16px;
          font-weight: 600;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
        .product-content-wrapper {
          height: 100%;
          display: flex;
          flex-direction: column;
        }
        .product-img {
          width: 100%;
          height: 200px;
          object-fit: cover;
        }
        .product-content {
          padding: 20px;
          flex-grow: 1;
          flex-direction: column;
          display: flex;
        }
        .product-description {
          color: #666;
          margin-bottom: 16px;
          font-size: 0.9rem;
          overflow: hidden;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          flex-grow: 1;
        }
        .btn-amazon {
          width: 100%;
          padding: 12px;
          background-color: #FF9900;
          border: none;
          border-radius: var(--border-radius);
          color: white;
          font-weight: 600;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          text-decoration: none;
          transition: var(--transition);
          margin-bottom: 16px;
        }
        .product-description {
          color: #666;
          margin-bottom: 16px;
          font-size: 0.9rem;
          overflow: hidden;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          flex-grow: 1;
        }
        .product-meta {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }
        .product-rating {
          display: flex;
          align-items: baseline;
          gap: 8px;
          font-weight: 700;
        }
        .product-disclaimer-price {
          display: flex;
          align-items: right;
          width: 100%;
          justify-content: flex-end;
          font-size: 11px;
          color: #c0bfbf;
          align-items: center;
        }
        .product-price-container {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
        }
        .price-info-icon {
          margin-right: 3px;
        }
        .rating-value {
          color: var(--accent-color);
          font-size: 1.5rem;
        }
        .rating-max {
          color: #999;
          font-size: 0.9rem;
        }
        .product-price {
          font-weight: 700;
          font-size: 1.2rem;
          color: var(--primary-color);
        }
      </style>
      <div class="product-content-wrapper">
        <img class="product-img" alt="">
        <div class="product-content">
          <h3 class="product-title"></h3>
          <a target="_blank" class="btn-amazon">
            <slot name="amazon-icon"></slot>
            Acheter sur Amazon
          </a>
          <p class="product-description"></p>
          <div class="product-meta">
            <div class="product-rating">
              <span class="rating-value"></span>
              <span class="rating-max">/10</span>
            </div>
            <div class="product-price-container">
              <div class="product-price"></div>
              <div class="product-disclaimer-price">
                <slot name="info-icon"></slot>
                Le prix peut varier
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
    this.$img   = this.shadowRoot.querySelector('.product-img');
    this.$title = this.shadowRoot.querySelector('.product-title');
    this.$link  = this.shadowRoot.querySelector('.btn-amazon');
    this.$desc  = this.shadowRoot.querySelector('.product-description');
    this.$price = this.shadowRoot.querySelector('.product-price');
    this.$rating = this.shadowRoot.querySelector('.rating-value');
  }

  connectedCallback() {
    this.#render();
  }

  attributeChangedCallback() {
    this.#render();
  }

  #render() {
    if (this.hasAttribute('image')) {
      this.$img.src = this.getAttribute('image');
      this.$img.alt = this.getAttribute('title') || '';
    }
    if (this.hasAttribute('title')) {
      this.$title.textContent = this.getAttribute('title');
    }
    if (this.hasAttribute('amazon')) {
      this.$link.href = this.getAttribute('amazon');
    }
    if (this.hasAttribute('description')) {
      this.$desc.innerHTML = this.getAttribute('description');
    }
    if (this.hasAttribute('price')) {
      this.$price.textContent = this.getAttribute('price');
    }
    if (this.hasAttribute('rating')) {
      this.$rating.textContent = this.getAttribute('rating');
    }
  }
}

customElements.define('product-card', ProductCard);