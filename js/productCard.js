class ProductCard extends HTMLElement {
  static get observedAttributes() {
    return ['image', 'title', 'amazon', 'description', 'price','rating', 'product-id'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
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

    // Load external CSS into the shadow root. Some browsers don't apply
    // <link rel="stylesheet"> inside shadow roots reliably, so we fetch
    // the CSS once and inject a <style> into each shadow root.
    // Cache the fetched CSS text on the class to avoid repeated network calls.
    if (ProductCard._cssText) {
      const style = document.createElement('style');
      style.textContent = ProductCard._cssText;
      this.shadowRoot.prepend(style);
    } else {
      if (!ProductCard._cssPromise) {
        ProductCard._cssPromise = fetch('/css/components/product-card.css')
          .then(r => {
            if (!r.ok) throw new Error('HTTP ' + r.status);
            return r.text();
          })
          .then(text => {
            ProductCard._cssText = text;
            console.debug('product-card: CSS fetched, length=', text.length);
            return text;
          }).catch((err) => {
            console.error('product-card: failed to fetch CSS', err);
            return '';
          });
      }
      // When the CSS is loaded, insert it into this shadow root.
      ProductCard._cssPromise.then((text) => {
        const style = document.createElement('style');
        // If fetch failed, provide a minimal fallback so layout isn't completely broken
        style.textContent = text || `:host{display:block;background:#fff;border:1px solid #eee;padding:8px}`;
        this.shadowRoot.prepend(style);
      });
    }
    this.$img   = this.shadowRoot.querySelector('.product-img');
    this.$title = this.shadowRoot.querySelector('.product-title');
    this.$link  = this.shadowRoot.querySelector('.btn-amazon');
    this.$desc  = this.shadowRoot.querySelector('.product-description');
    this.$price = this.shadowRoot.querySelector('.product-price');
    this.$rating = this.shadowRoot.querySelector('.rating-value');
  }

  connectedCallback() {
    // If product-id is provided, fetch data and render from JSON source
    if (this.hasAttribute('product-id')) {
      const pid = this.getAttribute('product-id');
      // cache on the constructor to avoid refetching repeatedly
      if (!ProductCard._productsPromise) {
        ProductCard._productsPromise = fetch('/data/products.json').then(r => r.json()).catch(() => ({}));
      }
      ProductCard._productsPromise.then((map) => {
        const data = map && map[pid];
        if (data) {
          // set attributes from data to reuse existing render logic
          Object.keys(data).forEach(k => {
            if (k === 'id' || k === 'page') return;
            // Only set attributes that the component observes
            if (['image','title','amazon','description','price','rating'].includes(k)) {
              this.setAttribute(k, data[k]);
            }
          });
        }
        this.#render();
      }).catch(() => this.#render());
    } else {
      this.#render();
    }
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