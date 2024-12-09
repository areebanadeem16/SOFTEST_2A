import { expect } from "chai";
import isEmpty from '../src/isEmpty.js'

describe('isEmpty Function - Test Cases', () => {
    it("should return true for null or undefined", () => {
        expect(isEmpty(null)).to.be.true;
        expect(isEmpty(undefined)).to.be.true;
    });

    it("should return true for empty string", () =>{
        expect(isEmpty("")).to.be.true;
    });

    it("should return true for empty arrays", () =>{
        expect(isEmpty([])).to.be.true;
    });

    it("should return true for empty objects", () =>{
        expect(isEmpty({})).to.be.true;
    })

    it("should return false for non-empty string", () =>{
        expect(isEmpty("hello")).to.be.false;
    });

    it("should return false for non-empty arrays", () =>{
        expect(isEmpty([1, 2, 3])).to.be.false;
    });

    it("should return false for non-empty objects", () =>{
        expect(isEmpty({"name": "Areeba"})).to.be.false;
    });

    it('should return false for non-empty maps and sets', () => {
        const map = new Map();
        map.set('key', 'value');
        expect(isEmpty(map)).to.be.false;
    
        const set = new Set();
        set.add('value');
        expect(isEmpty(set)).to.be.false;
      });

      describe('User Registration Validations', () => {
        it('should return true if a required field is empty', () => {
          const userInput = { username: '', email: '', password: '' };
          expect(isEmpty(userInput.username)).to.be.true;
          expect(isEmpty(userInput.email)).to.be.true;
          expect(isEmpty(userInput.password)).to.be.true;
        });
    
        it('should return false if all required fields are filled', () => {
          const userInput = { username: 'user', email: 'user@example.com', password: 'password123' };
          expect(isEmpty(userInput.username)).to.be.false;
          expect(isEmpty(userInput.email)).to.be.false;
          expect(isEmpty(userInput.password)).to.be.false;
        });
      });
});