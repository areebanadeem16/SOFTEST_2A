import { expect } from "chai";
import get from '../src/get.js'

describe("get.js Function - Test Cases", () => {
    const sampleData = {
        products: {
          1: { id: 1, name: 'Laptop', category: 'Electronics', details: { price: 1000, stock: 50 }, description: "HP Laptops 8th gen 16gb DDR4 RAM" },
          2: { id: 2, name: 'Smartphone', category: 'Electronics', details: { price: 500, stock: 100 }, description: "Iphone 16 Pro Max 256gb pro bionic lens" },
          3: { id: 3, name: 'RTX_3080', category: 'Electronics', details: { price: 500, stock: 100 }, description: "AMD Ryzen 3000 series" },
          4: { id: 4, name: 'Air Pods', category: 'Electronics', details: { price: 700, stock: 0 }, description: "Apple airpods" },
        },
        vendors: [
          { id: 1, name: 'TechVendor', rating: 4.5 },
          { id: 2, name: 'GadgetStore', rating: 4.0 },
        ],
        categories: ['Electronics', 'Home Appliances', 'Books'],
        settings: {
            theme: 'dark',
            notifications: { email: true, sms: false },
          },
        requested_by: "superuser",
        requested_at: "Sat, 07 Dec 2024 22:00:52 GMT"
      };

    const circularObject = {};
    circularObject.self = circularObject;
    
    
    it('should retrieve a product by a valid ID', () => {
    const product = get(sampleData.products, '1', null);
        expect(product).to.deep.equal({ id: 1, name: 'Laptop', category: 'Electronics', details: { price: 1000, stock: 50 }, description: "HP Laptops 8th gen 16gb DDR4 RAM" });
    });

    it('should retrieve a product description by a valid ID', () => {
    const product = get(sampleData.products, '2', null);
    expect(product.description).to.deep.equal("Iphone 16 Pro Max 256gb pro bionic lens");
    });

    it('should retrieve a product price by a valid ID', () => {
        const product = get(sampleData.products, '1', null);
        expect(product.details.price).to.deep.equal(1000);
    });

    it('should retrieve product price through nested properties', () => {
        const price = get(sampleData.products, '1.details.price');
        expect(price).to.equal(1000);
    });

    it('should return undefined for missing nested properties', () => {
        const color = get(sampleData.products, '1.details.color');
        expect(color).to.be.undefined;
    });

    it('should retrieve an array element by index', () => {
        const category = get(sampleData.categories, '[0]');
        expect(category).to.equal('Electronics');
    });

    it('should return undefined for out-of-bound array indices', () => {
        const category = get(sampleData.categories, '[10]');
        expect(category).to.be.undefined;
    });
    
    it('should return the default value for missing properties', () => {
        const defaultValue = get(sampleData, 'nonexistent.path', 'Default Value');
        expect(defaultValue).to.equal('Default Value');
    });

    it('should handle paths with mixed notations', () => {
        const theme = get(sampleData, 'settings["theme"]');
        expect(theme).to.equal('dark');
    });

    it('should return undefined for null or undefined objects', () => {
        expect(get(null, 'key')).to.be.undefined;
        expect(get(undefined, 'key')).to.be.undefined;
    });

    it('should retrieve properties with special characters in keys', () => {
        const obj = { 'some-key-with-special-chars': 'value' };
        expect(get(sampleData, 'requested_by')).to.equal('superuser');
    });

    it('should handle circular references without crashing', () => {
        expect(get(circularObject, 'self')).to.equal(circularObject);
    });

    it('should retrieve properties explicitly set to undefined', () => {
        const undefinedObj = { key: undefined };
        expect(get(undefinedObj, 'key')).to.be.undefined;
    });

    it('should retrieve properties with symbol keys', () => {
    const symbolKey = Symbol('symbolKey');
    const symbolObject = { [symbolKey]: 'symbolValue' };
    expect(get(symbolObject, symbolKey)).to.equal('symbolValue');
    });

    it('should retrieve properties from frozen objects', () => {
        const frozenObject = Object.freeze({ key: 'value' });
        expect(get(frozenObject, 'key')).to.equal('value');
    });

    it('should retrieve properties from sealed objects', () => {
        const sealedObj = Object.seal({ key: 'value' });
        expect(get(sealedObj, 'key')).to.equal('value');
    });

    it('should handle immutable data correctly', () => {
        const immutableObj = Object.freeze({ key: 'value' });
        expect(get(immutableObj, 'key')).to.equal('value');
    });

    it('should return undefined for empty paths', () => {
        expect(get(sampleData, '')).to.be.undefined;
    });

    it('should handle large objects efficiently', () => {
        const largeObj = {};
        for (let i = 0; i < 10000; i++) {
          largeObj[`key${i}`] = i;
        }
        const value = get(largeObj, 'key9999');
        expect(value).to.equal(9999);
    });
});