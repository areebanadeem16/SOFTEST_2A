import { expect } from 'chai';
import difference from '../src/difference.js';

describe('difference.js Function - Test Cases', () => {
  const cart = ['Laptop', 'Smartphone', 'Headphones', 'Mouse'];
  const wishlist = ['Laptop', 'Smartphone', 'Camera', 'Keyboard'];

  const laptopSpecs1 = ['16GB RAM', '512GB SSD', 'Intel i7', 'Touchscreen'];
  const laptopSpecs2 = ['16GB RAM', '1TB SSD', 'Intel i9', 'Touchscreen'];

  const priceRange1 = [500, 1000, 1500, 2000];
  const priceRange2 = [1000, 1500, 2500];

  const fullProductList = ['Laptop', 'Smartphone', 'Headphones', 'Camera', 'Keyboard', 'Tablet'];
  const saleItems = ['Laptop', 'Smartphone', 'Camera'];

  it('should find items in the cart but not in the wishlist', () => {
    const result = difference(cart, wishlist);
    expect(result).to.deep.equal(['Headphones', 'Mouse']);
  });

  it('should find items in the wishlist but not in the cart', () => {
    const result = difference(wishlist, cart);
    expect(result).to.deep.equal(['Camera', 'Keyboard']);
  });

  it('should find differences in specifications between two products', () => {
    const result = difference(laptopSpecs1, laptopSpecs2);
    expect(result).to.deep.equal(['512GB SSD', 'Intel i7']);
  });

  it('should find features unique to the second laptop', () => {
    const result = difference(laptopSpecs2, laptopSpecs1);
    expect(result).to.deep.equal(['1TB SSD', 'Intel i9']);
  });

  it('should find price ranges that differ between two sets of products', () => {
    const result = difference(priceRange1, priceRange2);
    expect(result).to.deep.equal([500, 2000]);
  });

  it('should find items removed from the cart', () => {
    const originalCart = ['Laptop', 'Smartphone', 'Headphones', 'Mouse', 'Tablet'];
    const currentCart = ['Laptop', 'Smartphone', 'Mouse'];
    const result = difference(originalCart, currentCart);
    expect(result).to.deep.equal(['Headphones', 'Tablet']);
  });

  it('should find out-of-stock items', () => {
    const inventory = ['Laptop', 'Smartphone', 'Headphones'];
    const result = difference(cart, inventory);
    expect(result).to.deep.equal(['Mouse']);
  });

  it('should find products unique to the first vendor', () => {
    const vendor1Products = ['Laptop', 'Smartphone', 'Tablet'];
    const vendor2Products = ['Smartphone', 'Camera', 'Keyboard'];
    const result = difference(vendor1Products, vendor2Products);
    expect(result).to.deep.equal(['Laptop', 'Tablet']);
  });

  it('should find unique customer reviews for one product', () => {
    const product1Reviews = ['Excellent!', 'Value for money.', 'Highly recommended.'];
    const product2Reviews = ['Value for money.', 'Highly recommended.', 'Average.'];
    const result = difference(product1Reviews, product2Reviews);
    expect(result).to.deep.equal(['Excellent!']);
  });

  it('should find items unique to the sale category', () => {
    const result = difference(saleItems, fullProductList);
    expect(result).to.deep.equal([]);
  });

  it('should find missing specifications', () => {
    const requiredSpecs = ['16GB RAM', '1TB SSD', 'Intel i7', 'Touchscreen'];
    const providedSpecs = ['16GB RAM', 'Intel i7'];
    const result = difference(requiredSpecs, providedSpecs);
    expect(result).to.deep.equal(['1TB SSD', 'Touchscreen']);
  });

  it('should find accessories not included in the purchase', () => {
    const recommendedAccessories = ['Mouse', 'Keyboard', 'Charger'];
    const includedAccessories = ['Mouse', 'Charger'];
    const result = difference(recommendedAccessories, includedAccessories);
    expect(result).to.deep.equal(['Keyboard']);
  });

  it('should find discounts unique to the first vendor', () => {
    const vendor1Discounts = [10, 20, 30];
    const vendor2Discounts = [20, 40, 50];
    const result = difference(vendor1Discounts, vendor2Discounts);
    expect(result).to.deep.equal([10, 30]);
  });

  it('should find features missing after a product upgrade', () => {
    const oldFeatures = ['Feature A', 'Feature B', 'Feature C'];
    const newFeatures = ['Feature B', 'Feature C', 'Feature D'];
    const result = difference(oldFeatures, newFeatures);
    expect(result).to.deep.equal(['Feature A']);
  });

  it('should find tags unique to one category', () => {
    const category1Tags = ['Tag1', 'Tag2', 'Tag3'];
    const category2Tags = ['Tag2', 'Tag4'];
    const result = difference(category1Tags, category2Tags);
    expect(result).to.deep.equal(['Tag1', 'Tag3']);
  });
});
