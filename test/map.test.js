import { expect } from 'chai';
import map from '../src/map.js';

describe('map.js Function - Test Cases', () => {
  const sampleProducts = [
    { id: 1, name: 'Laptop', category: 'Electronics', price: 1000, stock: 5, rating: 4.5, discount: 10 },
    { id: 2, name: 'Smartphone', category: 'Electronics', price: 500, stock: 10, rating: 4.2, discount: 5 },
    { id: 3, name: 'Book', category: 'Books', price: 20, stock: 100, rating: 5.0, discount: 0 },
    { id: 4, name: 'Chair', category: 'Furniture', price: 150, stock: 20, rating: 4.8, discount: 15 },
  ];

  it('should retrieve detailed information for products', () => {
    const detailedInfo = map(sampleProducts, (product) => ({
      id: product.id,
      name: product.name,
      price: product.price,
      rating: product.rating,
    }));
    expect(detailedInfo).to.deep.equal([
      { id: 1, name: 'Laptop', price: 1000, rating: 4.5 },
      { id: 2, name: 'Smartphone', price: 500, rating: 4.2 },
      { id: 3, name: 'Book', price: 20, rating: 5.0 },
      { id: 4, name: 'Chair', price: 150, rating: 4.8 },
    ]);
  });

  it('should format product prices with a currency symbol', () => {
    const formattedPrices = map(sampleProducts, (product) => ({
      name: product.name,
      price: `$${product.price.toFixed(2)}`,
    }));
    expect(formattedPrices).to.deep.equal([
      { name: 'Laptop', price: '$1000.00' },
      { name: 'Smartphone', price: '$500.00' },
      { name: 'Book', price: '$20.00' },
      { name: 'Chair', price: '$150.00' },
    ]);
  });

  it('should calculate discounted prices for products', () => {
    const discountedPrices = map(sampleProducts, (product) => ({
      name: product.name,
      originalPrice: product.price,
      discountedPrice: product.price - (product.price * product.discount) / 100,
    }));
    expect(discountedPrices).to.deep.equal([
      { name: 'Laptop', originalPrice: 1000, discountedPrice: 900 },
      { name: 'Smartphone', originalPrice: 500, discountedPrice: 475 },
      { name: 'Book', originalPrice: 20, discountedPrice: 20 },
      { name: 'Chair', originalPrice: 150, discountedPrice: 127.5 },
    ]);
  });

  it('should transform products for UI display cards', () => {
    const displayCards = map(sampleProducts, (product) => ({
      title: `${product.name} - $${product.price}`,
      rating: `${product.rating} Stars`,
      category: product.category,
    }));
    expect(displayCards).to.deep.equal([
      { title: 'Laptop - $1000', rating: '4.5 Stars', category: 'Electronics' },
      { title: 'Smartphone - $500', rating: '4.2 Stars', category: 'Electronics' },
      { title: 'Book - $20', rating: '5 Stars', category: 'Books' },
      { title: 'Chair - $150', rating: '4.8 Stars', category: 'Furniture' },
    ]);
  });

  it('should highlight searched keyword in product names', () => {
    const keyword = 'Laptop';
    const highlightedProducts = map(sampleProducts, (product) => ({
      ...product,
      name: product.name.includes(keyword) ? `**${product.name}**` : product.name,
    }));
    expect(highlightedProducts).to.deep.equal([
      { id: 1, name: '**Laptop**', category: 'Electronics', price: 1000, stock: 5, rating: 4.5, discount: 10 },
      { id: 2, name: 'Smartphone', category: 'Electronics', price: 500, stock: 10, rating: 4.2, discount: 5 },
      { id: 3, name: 'Book', category: 'Books', price: 20, stock: 100, rating: 5.0, discount: 0 },
      { id: 4, name: 'Chair', category: 'Furniture', price: 150, stock: 20, rating: 4.8, discount: 15 },
    ]);
  });

  it('should calculate total stock value per product', () => {
    const stockValues = map(sampleProducts, (product) => ({
      name: product.name,
      totalValue: product.price * product.stock,
    }));
    expect(stockValues).to.deep.equal([
      { name: 'Laptop', totalValue: 5000 },
      { name: 'Smartphone', totalValue: 5000 },
      { name: 'Book', totalValue: 2000 },
      { name: 'Chair', totalValue: 3000 },
    ]);
  });

  it('should transform products in Electronics category to name and price', () => {
    const electronicsProducts = map(
      sampleProducts.filter(product => product.category === 'Electronics'),
      product => ({ name: product.name, price: product.price })
    );
    expect(electronicsProducts).to.deep.equal([
      { name: 'Laptop', price: 1000 },
      { name: 'Smartphone', price: 500 },
    ]);
  });

  it('should add availability status to products', () => {
    const availabilityStatus = map(sampleProducts, product => ({
      ...product,
      availability: product.stock > 0 ? 'In Stock' : 'Out of Stock',
    }));
    expect(availabilityStatus).to.deep.equal([
      { ...sampleProducts[0], availability: 'In Stock' },
      { ...sampleProducts[1], availability: 'In Stock' },
      { ...sampleProducts[2], availability: 'In Stock' },
      { ...sampleProducts[3], availability: 'In Stock' },
    ]);
  });

  it('should calculate new prices after applying 10% tax', () => {
    const taxedPrices = map(sampleProducts, product => ({
      name: product.name,
      priceWithTax: product.price + product.price * 0.1,
    }));
    expect(taxedPrices).to.deep.equal([
      { name: 'Laptop', priceWithTax: 1100 },
      { name: 'Smartphone', priceWithTax: 550 },
      { name: 'Book', priceWithTax: 22 },
      { name: 'Chair', priceWithTax: 165 },
    ]);
  });

  it('should group products by their rating', () => {
    const groupedByRating = map(sampleProducts, product => ({
      rating: product.rating,
      product: product.name,
    }));
    expect(groupedByRating).to.deep.equal([
      { rating: 4.5, product: 'Laptop' },
      { rating: 4.2, product: 'Smartphone' },
      { rating: 5.0, product: 'Book' },
      { rating: 4.8, product: 'Chair' },
    ]);
  });

  it('should create SEO-friendly URLs for each product', () => {
    const seoUrls = map(sampleProducts, product => ({
      name: product.name,
      url: `https://mystore.com/products/${product.name.toLowerCase().replace(/\s+/g, '-')}-${product.id}`,
    }));
    expect(seoUrls).to.deep.equal([
      { name: 'Laptop', url: 'https://mystore.com/products/laptop-1' },
      { name: 'Smartphone', url: 'https://mystore.com/products/smartphone-2' },
      { name: 'Book', url: 'https://mystore.com/products/book-3' },
      { name: 'Chair', url: 'https://mystore.com/products/chair-4' },
    ]);
  });

  it('should transform products into wishlist items', () => {
    const wishlistItems = map(sampleProducts, product => ({
      id: product.id,
      name: product.name,
      price: product.price,
    }));
    expect(wishlistItems).to.deep.equal([
      { id: 1, name: 'Laptop', price: 1000 },
      { id: 2, name: 'Smartphone', price: 500 },
      { id: 3, name: 'Book', price: 20 },
      { id: 4, name: 'Chair', price: 150 },
    ]);
  });

  it('should calculate total revenue potential per category', () => {
    const revenueByCategoryObject = sampleProducts.reduce((acc, product) => {
      acc[product.category] = (acc[product.category] || 0) + product.price * product.stock;
      return acc;
    }, {});
  
    const revenueByCategory = Object.entries(revenueByCategoryObject).map(([category, revenue]) => ({
      category,
      revenue,
    }));
  
    expect(revenueByCategory).to.deep.equal([
      { category: 'Electronics', revenue: 10000 },
      { category: 'Books', revenue: 2000 },
      { category: 'Furniture', revenue: 3000 },
    ]);
  });
});
