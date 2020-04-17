import * as moment from 'moment';
import * as qs from 'qs';

// pull hash off url after redirect
export const parseHash = (): object => {
  const hash = qs.parse(window.location.hash.slice(1));
  return hash;
};

// get an item from local storage and parse
export const get = (key: string): object | null => {
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    return null;
  }
};

// stringify an item and save to local storage
export const set = (key: string, val: object): string | null => {
  try {
    window.localStorage.setItem(key, JSON.stringify(val));
    return key;
  } catch (error) {
    return null;
  }
};

// remove an item from local storage
export const rm = (key: string): string | null => {
  try {
    window.localStorage.removeItem(key);
    return key;
  } catch (error) {
    return null;
  }
};

// logic taken from esri-rest-auth UserSession.js:
// new Date(Date.now() - parseInt(expires_in, 10) * 1000 - 60 * 1000)
export const setTokenExpiration = (expiresIn: number): moment.Moment => {
  return moment().add(expiresIn, 'seconds').subtract(60, 'seconds');
};

// returns true if current time is after expire date
export const isExpired = (expires: Date): boolean => {
  return moment().isAfter(expires);
};
