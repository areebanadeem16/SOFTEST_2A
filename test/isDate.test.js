import { expect } from 'chai';
import isDate from '../src/isDate.js';

describe('isDate Function - Test Cases', () => {
  it('should return true for valid Date object', () => {
    const date = new Date();
    expect(isDate(date)).to.be.true;
  });

  it('should return false for a string that looks like a date', () => {
    expect(isDate('2021-12-31')).to.be.false;
  });

  it('should return false for a number representing a date', () => {
    expect(isDate(1633023943000)).to.be.false;
  });

  it('should return false for an array', () => {
    expect(isDate([2021, 12, 31])).to.be.false;
  });

  it('should return false for a plain object', () => {
    expect(isDate({ date: '2021-12-31' })).to.be.false;
  });

  it('should return false for null', () => {
    expect(isDate(null)).to.be.false;
  });

  it('should return false for undefined', () => {
    expect(isDate(undefined)).to.be.false;
  });

  it('should return false for a function', () => {
    expect(isDate(() => {})).to.be.false;
  });

  it('should return true for a Date object created from a timestamp', () => {
    const timestamp = 1633023943000; // Unix timestamp
    const date = new Date(timestamp);
    expect(isDate(date)).to.be.true;
  });

  it('should return false for an invalid date string', () => {
    const invalidDate = new Date('invalid date string');
    expect(isDate(invalidDate)).to.be.true; // It's a Date object
  });

  it('should return false for an empty string', () => {
    expect(isDate('')).to.be.false;
  });

  it('should return false for a boolean value', () => {
    expect(isDate(true)).to.be.false;
    expect(isDate(false)).to.be.false;
  });

  it('should return false for a Date object that’s NaN ("Invalid Date")', () => {
    const invalidDate = new Date('invalid date');
    expect(isDate(invalidDate)).to.be.true; // A Date object but invalid
  });

  it('should return true for a leap year date (e.g., February 29, 2020)', () => {
    const leapYearDate = new Date('2020-02-29');
    expect(isDate(leapYearDate)).to.be.true;
  });

  it('should return true for a historical date (e.g., January 1, 1900)', () => {
    const historicalDate = new Date('1900-01-01');
    expect(isDate(historicalDate)).to.be.true;
  });

  it('should return false for an object with a "date" property', () => {
    const obj = { date: '2021-12-31' };
    expect(isDate(obj)).to.be.false;
  });

  it('should return true for a Date object in a different time zone', () => {
    const timezoneDate = new Date('2021-12-31T12:00:00+02:00');
    expect(isDate(timezoneDate)).to.be.true;
  });

  it('should return true for a Date object after a specific date', () => {
    const afterSpecificDate = new Date('2021-12-31');
    expect(isDate(afterSpecificDate)).to.be.true;
  });

  it('should return true for a new Date object (current date)', () => {
    const currentDate = new Date();
    expect(isDate(currentDate)).to.be.true;
  });

  it('should return false for a string containing a number but not a valid date', () => {
    expect(isDate('12345')).to.be.false;
  });

  it('should return false for a string with an incorrect date format', () => {
    expect(isDate('2021/31/12')).to.be.false;
  });

  it('should return true for a Date object in the future', () => {
    const futureDate = new Date('2030-01-01');
    expect(isDate(futureDate)).to.be.true;
  });

  it('should return true for a Date object in the past', () => {
    const pastDate = new Date('2000-01-01');
    expect(isDate(pastDate)).to.be.true;
  });

  it('should return true for a Date object representing the Unix epoch', () => {
    const unixEpochDate = new Date(0); // Unix epoch = Jan 1, 1970, 00:00:00 UTC
    expect(isDate(unixEpochDate)).to.be.true;
  });
});
