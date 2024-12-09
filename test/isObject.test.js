import { expect } from "chai";
import isObject from "../src/isObject.js";
import isEmpty from "../src/isEmpty.js";

describe("isObject User Input Form Validation", () =>{
    it("should return true for valid input objects", () =>{
        const user = {username: "John Doe", email: "john.doe@example.com", password: "password123"};
        expect(isObject(user)).to.be.true;
    })

    it('should return false for invalid inputs like strings or null', () => {
        expect(isObject(null)).to.be.false;
        expect(isObject('username')).to.be.false;
    });

    it('should return true for nested input objects', () => {
        const nestedInput = { user: { username: 'testuser', email: 'user@example.com' } };
        expect(isObject(nestedInput.user)).to.be.true;
    });
})

describe('isObject Backend Validation', () => {
    it('should validate that user data is an object and not empty', () => {
      const validData = { username: 'testuser', email: 'user@example.com', password: 'password123' };
      expect(isObject(validData)).to.be.true;
      expect(isEmpty(validData)).to.be.false;
    });
  
    it('should return false for empty objects', () => {
      const invalidData = {};
      expect(isObject(invalidData)).to.be.true;
      expect(isEmpty(invalidData)).to.be.true;
    });
  
    it('should reject non-object user data', () => {
      const invalidData = 'invalid data';
      expect(isObject(invalidData)).to.be.false;
    });
});

describe("isObject and isEmpty tests for functionality validation", () =>{

    describe("Test cases for saving users to database", () => {
        const saveUser = (user) => {
            if(!isObject(user) || isEmpty(user.name) || isEmpty(user.email) || isEmpty(user.password)) throw new Error("Invalid user data")
            return {success: true, data: user}
        };
    
        it("should validate saveUser is a function", () => {
            expect(isObject(saveUser)).to.be.true;
            expect(typeof saveUser).to.equal("function");
        });
    
        it("should validate that user is successfully saved to database", () => {
            const user = {name: "Areeba", email: "areeba@example.com", password: "se_testing"};
            expect(saveUser(user).success).to.be.true;
        });

        it('should throw an error for invalid user data in saveToDatabase', () => {
            const invalidUser = 'notAnObject';
            expect(() => saveUser(invalidUser)).to.throw('Invalid user data');
        });
    });

    describe("Test cases for sending email to the user", () => {
        const sendEmail = (email) => {
            if(isEmpty(email) || typeof email != "string") throw new Error("Invalid email address");
            return {success: true, email};
        };

        it("should validate that sendEmail is a function", () => {
            expect(isObject(sendEmail)).to.be.true;
            expect(typeof sendEmail).to.equal("function");
        });

        it("should send email using sendEmail function", () => {
            const email = "areeba@example.com";
            expect(sendEmail(email).success).to.be.true;
        });

        it("should throw an error for invalid email in sendEmail function", () => {
            const email = null;
            expect(() => sendEmail(email).to.throw("Invalid email address"));
        })
    })
})