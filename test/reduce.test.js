import { expect } from 'chai';
import reduce from '../src/reduce.js';

describe('reduce.js Function - Test Cases', () => {
  const sampleProducts = [
    { id: 1, name: 'Laptop', category: 'Electronics', price: 1000, stock: 5, rating: 4.5, discount: 10 },
    { id: 2, name: 'Smartphone', category: 'Electronics', price: 500, stock: 10, rating: 4.2, discount: 5 },
    { id: 3, name: 'Book', category: 'Books', price: 20, stock: 100, rating: 5.0, discount: 0 },
    { id: 4, name: 'Chair', category: 'Furniture', price: 150, stock: 20, rating: 4.8, discount: 15 },
  ];

  it('should calculate the total price at checkout', () => {
    const totalPrice = reduce(sampleProducts, (acc, product) => acc + product.price, 0);
    expect(totalPrice).to.equal(1670);
  });

  it('should calculate the total price after discounts', () => {
    const totalAfterDiscount = reduce(
      sampleProducts,
      (acc, product) => acc + product.price * (1 - product.discount / 100),
      0
    );
    expect(totalAfterDiscount).to.equal(1522.5);
  });

  it('should calculate total price after 15% VAT tax', () => {
    const totalWithVAT = reduce(
      sampleProducts,
      (acc, product) => acc + product.price * 1.15,
      0
    );
    expect(totalWithVAT).to.equal(1920.5);
  });

  it('should calculate total price after Black Friday 50% discount', () => {
    const blackFridayTotal = reduce(
      sampleProducts,
      (acc, product) => acc + product.price * 0.5,
      0
    );
    expect(blackFridayTotal).to.equal(835);
  });

  it('should count total items in the cart', () => {
    const totalItems = reduce(sampleProducts, (acc, product) => acc + product.stock, 0);
    expect(totalItems).to.equal(135);
  });

  it('should calculate average price of all products', () => {
    const averagePrice = reduce(
      sampleProducts,
      (acc, product, _, array) => acc + product.price / array.length,
      0
    );
    expect(averagePrice).to.equal(417.5);
  });

  it('should group products by category', () => {
    const groupedByCategory = reduce(
      sampleProducts,
      (acc, product) => {
        acc[product.category] = acc[product.category] || [];
        acc[product.category].push(product);
        return acc;
      },
      {}
    );
    expect(groupedByCategory).to.deep.equal({
      Electronics: [sampleProducts[0], sampleProducts[1]],
      Books: [sampleProducts[2]],
      Furniture: [sampleProducts[3]],
    });
  });

  it('should find the most expensive product', () => {
    const mostExpensive = reduce(
      sampleProducts,
      (max, product) => (product.price > max.price ? product : max),
      sampleProducts[0]
    );
    expect(mostExpensive).to.deep.equal(sampleProducts[0]);
  });

  it('should calculate total stock value in inventory', () => {
    const totalStockValue = reduce(
      sampleProducts,
      (acc, product) => acc + product.price * product.stock,
      0
    );
    expect(totalStockValue).to.equal(15000);
  });

  it('should find products with discounts above 10%', () => {
    const discountedProducts = reduce(
      sampleProducts,
      (acc, product) => {
        if (product.discount > 10) acc.push(product);
        return acc;
      },
      []
    );
    expect(discountedProducts).to.deep.equal([sampleProducts[3]]);
  });

  it('should verify that all products are in stock', () => {
    const allInStock = reduce(
      sampleProducts,
      (allAvailable, product) => allAvailable && product.stock > 0,
      true
    );
    expect(allInStock).to.be.true;
  });

  it('should find the cheapest product', () => {
    const cheapestProduct = reduce(
      sampleProducts,
      (min, product) => (product.price < min.price ? product : min),
      sampleProducts[0]
    );
    expect(cheapestProduct).to.deep.equal(sampleProducts[2]);
  });

  it('should summarize rating counts', () => {
    const ratingSummary = reduce(
      sampleProducts,
      (acc, product) => {
        acc[product.rating] = (acc[product.rating] || 0) + 1;
        return acc;
      },
      {}
    );
    expect(ratingSummary).to.deep.equal({
      4.5: 1,
      4.2: 1,
      5.0: 1,
      4.8: 1,
    });
  });

  it('should calculate total revenue potential per vendor', () => {
    const revenueByVendor = reduce(
      sampleProducts,
      (acc, product) => {
        acc[product.category] = (acc[product.category] || 0) + product.price * product.stock;
        return acc;
      },
      {}
    );
    expect(revenueByVendor).to.deep.equal({
      Electronics: 10000,
      Books: 2000,
      Furniture: 3000,
    });
  });

  it('should aggregate all reviews into a single array', () => {
    const reviews = [
      { productId: 1, review: 'Great laptop!' },
      { productId: 2, review: 'Good smartphone!' },
      { productId: 1, review: 'Very durable.' },
    ];
    const aggregatedReviews = reduce(
      reviews,
      (acc, review) => {
        acc[review.productId] = acc[review.productId] || [];
        acc[review.productId].push(review.review);
        return acc;
      },
      {}
    );
    expect(aggregatedReviews).to.deep.equal({
      1: ['Great laptop!', 'Very durable.'],
      2: ['Good smartphone!'],
    });
  });
});
