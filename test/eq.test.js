import { expect } from 'chai';
import eq from '../src/eq.js';

describe('eq.js Function - Test Cases', () => {
  it('should check if the product price matches the filter', () => {
    const price = 100;
    const filterPrice = 100;
    const result = eq(price, filterPrice);
    expect(result).to.equal(true);
  });

  it('should check if product specification matches search criteria', () => {
    const productSpecs = '4GB RAM, 128GB Storage';
    const searchedSpecs = '4GB RAM, 128GB Storage';
    const result = eq(productSpecs, searchedSpecs);
    expect(result).to.equal(true);
  });

  it('should verify if the entered username matches the stored username', () => {
    const storedUsername = 'user123';
    const enteredUsername = 'user123';
    const result = eq(storedUsername, enteredUsername);
    expect(result).to.equal(true);
  });

  it('should compare two product IDs for equality', () => {
    const productId1 = 101;
    const productId2 = 101;
    const result = eq(productId1, productId2);
    expect(result).to.equal(true);
  });

  it('should verify if the entered discount code matches', () => {
    const validCode = 'SAVE20';
    const enteredCode = 'SAVE20';
    const result = eq(validCode, enteredCode);
    expect(result).to.equal(true);
  });

  it('should check if the entered coupon matches the stored coupon', () => {
    const storedCoupon = 'SPRING30';
    const enteredCoupon = 'SUMMER20';
    const result = eq(storedCoupon, enteredCoupon);
    expect(result).to.equal(false);
  });

  it('should confirm the selected shipping method matches the default', () => {
    const defaultShipping = 'Standard';
    const selectedShipping = 'Express';
    const result = eq(defaultShipping, selectedShipping);
    expect(result).to.equal(false);
  });

  it('should validate the selected payment method matches available options', () => {
    const selectedPayment = 'Credit Card';
    const validPayment = 'Credit Card';
    const result = eq(selectedPayment, validPayment);
    expect(result).to.equal(true);
  });

  it('should check if the product color matches the selected filter', () => {
    const productColor = 'Green';
    const selectedColor = 'Green';
    const result = eq(productColor, selectedColor);
    expect(result).to.equal(true);
  });

  it('should verify if the cart contains the exact quantity of products', () => {
    const cartQuantity = 5;
    const expectedQuantity = 5;
    const result = eq(cartQuantity, expectedQuantity);
    expect(result).to.equal(true);
  });

  it('should verify if two vendor names are identical', () => {
    const vendor1 = 'TechStore';
    const vendor2 = 'TechStore';
    const result = eq(vendor1, vendor2);
    expect(result).to.equal(true);
  });

  it('should verify if a product in wishlist is not in the cart', () => {
    const wishlistProduct = 'Laptop';
    const cartProduct = 'Smartphone';
    const result = eq(wishlistProduct, cartProduct);
    expect(result).to.equal(false);
  });

  it('should match the entered delivery address with the stored address', () => {
    const storedAddress = 'Näyttelijänkatu 19, 33720';
    const enteredAddress = 'Näyttelijänkatu 19, 33720';
    const result = eq(storedAddress, enteredAddress);
    expect(result).to.equal(true);
  });

  it('should verify if search filters produce the expected result', () => {
    const expectedProduct = 'Tablet';
    const searchResult = 'Tablet';
    const result = eq(expectedProduct, searchResult);
    expect(result).to.equal(true);
  });

  it('should check if the selected product matches the search result', () => {
    const selectedProduct = 'Wireless Mouse';
    const searchResult = 'Wired Mouse';
    const result = eq(selectedProduct, searchResult);
    expect(result).to.equal(false);
  });
});
