import { expect } from "chai";
import filter from "../src/filter.js";

describe('filter.js Function - Test Cases', () => {
    const sampleProducts = [
      { id: 1, name: 'Laptop', category: 'Electronics', store: 'Store A', branch: 'Downtown', inStock: true, color: 'Black', rating: 4.5, price: 1000, discount: true, brand: 'BrandX', addedDate: '2024-01-01' },
      { id: 2, name: 'Smartphone', category: 'Electronics', store: 'Store B', branch: 'Uptown', inStock: true, color: 'White', rating: 4.0, price: 500, discount: false, brand: 'BrandY', addedDate: '2024-02-15' },
      { id: 3, name: 'Tablet', category: 'Electronics', store: 'Store A', branch: 'Downtown', inStock: false, color: 'Black', rating: 3.5, price: 300, discount: true, brand: 'BrandX', addedDate: '2024-03-01' },
      { id: 4, name: 'Book', category: 'Books', store: 'Store C', branch: 'Midtown', inStock: true, color: 'Blue', rating: 5.0, price: 20, discount: false, brand: 'BrandZ', addedDate: '2024-03-20' },
      { id: 5, name: 'Chair', category: 'Furniture', store: 'Store A', branch: 'Downtown', inStock: false, color: 'Brown', rating: 4.2, price: 150, discount: true, brand: 'BrandX', addedDate: '2023-12-25' },
      { id: 6, name: 'Headphones', category: 'Electronics', store: 'Store D', branch: 'Uptown', inStock: true, color: 'Black', rating: 3.8, price: 100, discount: false, brand: 'BrandY', addedDate: '2024-01-15' },
    ];
  
    it('should filter products by category', () => {
        const electronics = filter(sampleProducts, (product) => product.category === 'Electronics');
        expect(electronics).to.deep.equal([
            { id: 1, name: 'Laptop', category: 'Electronics', store: 'Store A', branch: 'Downtown', inStock: true, color: 'Black', rating: 4.5, price: 1000, discount: true, brand: 'BrandX', addedDate: '2024-01-01' },
            { id: 2, name: 'Smartphone', category: 'Electronics', store: 'Store B', branch: 'Uptown', inStock: true, color: 'White', rating: 4.0, price: 500, discount: false, brand: 'BrandY', addedDate: '2024-02-15' },
            { id: 3, name: 'Tablet', category: 'Electronics', store: 'Store A', branch: 'Downtown', inStock: false, color: 'Black', rating: 3.5, price: 300, discount: true, brand: 'BrandX', addedDate: '2024-03-01' },
            { id: 6, name: 'Headphones', category: 'Electronics', store: 'Store D', branch: 'Uptown', inStock: true, color: 'Black', rating: 3.8, price: 100, discount: false, brand: 'BrandY', addedDate: '2024-01-15' }
        ]);
      });
    
    it('should filter products by store', () => {
    const storeAProducts = filter(sampleProducts, (product) => product.store === 'Store A');
    expect(storeAProducts).to.deep.equal([
        { id: 1, name: 'Laptop', category: 'Electronics', store: 'Store A', branch: 'Downtown', inStock: true, color: 'Black', rating: 4.5, price: 1000, discount: true, brand: 'BrandX', addedDate: '2024-01-01' },
        { id: 3, name: 'Tablet', category: 'Electronics', store: 'Store A', branch: 'Downtown', inStock: false, color: 'Black', rating: 3.5, price: 300, discount: true, brand: 'BrandX', addedDate: '2024-03-01' },
        { id: 5, name: 'Chair', category: 'Furniture', store: 'Store A', branch: 'Downtown', inStock: false, color: 'Brown', rating: 4.2, price: 150, discount: true, brand: 'BrandX', addedDate: '2023-12-25' },
    ]);
    });
    
      // 3. Filter by Stock Availability
    it('should filter products that are in stock', () => {
        const inStockProducts = filter(sampleProducts, (product) => product.inStock);
        expect(inStockProducts).to.deep.equal([
            { id: 1, name: 'Laptop', category: 'Electronics', store: 'Store A', branch: 'Downtown', inStock: true, color: 'Black', rating: 4.5, price: 1000, discount: true, brand: 'BrandX', addedDate: '2024-01-01' },
            { id: 2, name: 'Smartphone', category: 'Electronics', store: 'Store B', branch: 'Uptown', inStock: true, color: 'White', rating: 4.0, price: 500, discount: false, brand: 'BrandY', addedDate: '2024-02-15' },
            { id: 4, name: 'Book', category: 'Books', store: 'Store C', branch: 'Midtown', inStock: true, color: 'Blue', rating: 5.0, price: 20, discount: false, brand: 'BrandZ', addedDate: '2024-03-20' },
            { id: 6, name: 'Headphones', category: 'Electronics', store: 'Store D', branch: 'Uptown', inStock: true, color: 'Black', rating: 3.8, price: 100, discount: false, brand: 'BrandY', addedDate: '2024-01-15' }
        ]);
    });
    
    it('should filter products by color', () => {
    const blackProducts = filter(sampleProducts, (product) => product.color === 'Black');
    expect(blackProducts).to.deep.equal([
        { id: 1, name: 'Laptop', category: 'Electronics', store: 'Store A', branch: 'Downtown', inStock: true, color: 'Black', rating: 4.5, price: 1000, discount: true, brand: 'BrandX', addedDate: '2024-01-01' },
        { id: 3, name: 'Tablet', category: 'Electronics', store: 'Store A', branch: 'Downtown', inStock: false, color: 'Black', rating: 3.5, price: 300, discount: true, brand: 'BrandX', addedDate: '2024-03-01' },
        { id: 6, name: 'Headphones', category: 'Electronics', store: 'Store D', branch: 'Uptown', inStock: true, color: 'Black', rating: 3.8, price: 100, discount: false, brand: 'BrandY', addedDate: '2024-01-15' }
    ]);
    });

    it('should filter products within a price range', () => {
    const budgetProducts = filter(sampleProducts, (product) => product.price >= 100 && product.price <= 500);
    expect(budgetProducts).to.deep.equal([
        { id: 2, name: 'Smartphone', category: 'Electronics', store: 'Store B', branch: 'Uptown', inStock: true, color: 'White', rating: 4.0, price: 500, discount: false, brand: 'BrandY', addedDate: '2024-02-15' },
        { id: 3, name: 'Tablet', category: 'Electronics', store: 'Store A', branch: 'Downtown', inStock: false, color: 'Black', rating: 3.5, price: 300, discount: true, brand: 'BrandX', addedDate: '2024-03-01' },
        { id: 5, name: 'Chair', category: 'Furniture', store: 'Store A', branch: 'Downtown', inStock: false, color: 'Brown', rating: 4.2, price: 150, discount: true, brand: 'BrandX', addedDate: '2023-12-25' },
        { id: 6, name: 'Headphones', category: 'Electronics', store: 'Store D', branch: 'Uptown', inStock: true, color: 'Black', rating: 3.8, price: 100, discount: false, brand: 'BrandY', addedDate: '2024-01-15' }
    ]);
    });

    it('should return an empty array when no products match', () => {
    const nonExistentCategory = filter(sampleProducts, (product) => product.category === 'Toys');
    expect(nonExistentCategory).to.deep.equal([ [] ]);
    });

    it('should handle null or undefined inputs gracefully', () => {
    const nullFilter = filter(null, () => true);
    expect(nullFilter).to.deep.equal([[]]);

    const undefinedFilter = filter(undefined, () => true);
    expect(undefinedFilter).to.deep.equal([[]]);
    });

    it('should filter products based on multiple conditions', () => {
    const filtered = filter(
        sampleProducts,
        (product) => product.category === 'Electronics' && product.inStock && product.price < 500
    );
    expect(filtered).to.deep.equal([
        { id: 6, name: 'Headphones', category: 'Electronics', store: 'Store D', branch: 'Uptown', inStock: true, color: 'Black', rating: 3.8, price: 100, discount: false, brand: 'BrandY', addedDate: '2024-01-15' }
    ]);
    });

    it('should pass the index to the predicate', () => {
    const evenIndexProducts = filter(sampleProducts, (_, index) => index % 2 === 0);
    expect(evenIndexProducts).to.deep.equal([
        { id: 1, name: 'Laptop', category: 'Electronics', store: 'Store A', branch: 'Downtown', inStock: true, color: 'Black', rating: 4.5, price: 1000, discount: true, brand: 'BrandX', addedDate: '2024-01-01' },
        { id: 3, name: 'Tablet', category: 'Electronics', store: 'Store A', branch: 'Downtown', inStock: false, color: 'Black', rating: 3.5, price: 300, discount: true, brand: 'BrandX', addedDate: '2024-03-01' },
        { id: 5, name: 'Chair', category: 'Furniture', store: 'Store A', branch: 'Downtown', inStock: false, color: 'Brown', rating: 4.2, price: 150, discount: true, brand: 'BrandX', addedDate: '2023-12-25' },
    ]);
    });

    it('should filter products by branch location', () => {
      const downtownProducts = filter(sampleProducts, (product) => product.branch === 'Downtown');
      expect(downtownProducts).to.deep.equal([
        { id: 1, name: 'Laptop', category: 'Electronics', store: 'Store A', branch: 'Downtown', inStock: true, color: 'Black', rating: 4.5, price: 1000, discount: true, brand: 'BrandX', addedDate: '2024-01-01' },
        { id: 3, name: 'Tablet', category: 'Electronics', store: 'Store A', branch: 'Downtown', inStock: false, color: 'Black', rating: 3.5, price: 300, discount: true, brand: 'BrandX', addedDate: '2024-03-01' },
        { id: 5, name: 'Chair', category: 'Furniture', store: 'Store A', branch: 'Downtown', inStock: false, color: 'Brown', rating: 4.2, price: 150, discount: true, brand: 'BrandX', addedDate: '2023-12-25' },
      ]);
    });
  
    it('should filter products by rating above 4', () => {
      const highlyRated = filter(sampleProducts, (product) => product.rating >= 4.0);
      expect(highlyRated).to.deep.equal([
        { id: 1, name: 'Laptop', category: 'Electronics', store: 'Store A', branch: 'Downtown', inStock: true, color: 'Black', rating: 4.5, price: 1000, discount: true, brand: 'BrandX', addedDate: '2024-01-01' },
        { id: 2, name: 'Smartphone', category: 'Electronics', store: 'Store B', branch: 'Uptown', inStock: true, color: 'White', rating: 4.0, price: 500, discount: false, brand: 'BrandY', addedDate: '2024-02-15' },
        { id: 4, name: 'Book', category: 'Books', store: 'Store C', branch: 'Midtown', inStock: true, color: 'Blue', rating: 5.0, price: 20, discount: false, brand: 'BrandZ', addedDate: '2024-03-20' },
        { id: 5, name: 'Chair', category: 'Furniture', store: 'Store A', branch: 'Downtown', inStock: false, color: 'Brown', rating: 4.2, price: 150, discount: true, brand: 'BrandX', addedDate: '2023-12-25' },
      ]);
    });
  
    it('should filter products by name substring', () => {
      const searchResults = filter(sampleProducts, (product) => product.name.includes('Lap'));
      expect(searchResults).to.deep.equal([
        { id: 1, name: 'Laptop', category: 'Electronics', store: 'Store A', branch: 'Downtown', inStock: true, color: 'Black', rating: 4.5, price: 1000, discount: true, brand: 'BrandX', addedDate: '2024-01-01' },
      ]);
    });
  
    it('should filter products added after a specific date', () => {
      const recentProducts = filter(sampleProducts, (product) => new Date(product.addedDate) > new Date('2024-01-01'));
      expect(recentProducts).to.deep.equal([
        { id: 2, name: 'Smartphone', category: 'Electronics', store: 'Store B', branch: 'Uptown', inStock: true, color: 'White', rating: 4.0, price: 500, discount: false, brand: 'BrandY', addedDate: '2024-02-15' },
        { id: 3, name: 'Tablet', category: 'Electronics', store: 'Store A', branch: 'Downtown', inStock: false, color: 'Black', rating: 3.5, price: 300, discount: true, brand: 'BrandX', addedDate: '2024-03-01' },
        { id: 4, name: 'Book', category: 'Books', store: 'Store C', branch: 'Midtown', inStock: true, color: 'Blue', rating: 5.0, price: 20, discount: false, brand: 'BrandZ', addedDate: '2024-03-20' },
        { id: 6, name: 'Headphones', category: 'Electronics', store: 'Store D', branch: 'Uptown', inStock: true, color: 'Black', rating: 3.8, price: 100, discount: false, brand: 'BrandY', addedDate: '2024-01-15' }
      ]);
    });
  
  });
  