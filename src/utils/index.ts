import * as moment from 'moment';
import * as qs from 'qs';
import * as _ from 'lodash';

// pull hash off url after redirect
export const parseHash = (): {
  token: string | null;
  username: string | null;
  expiresIn: number | null;
} => {
  try {
    const hash = qs.parse(window.location.hash.slice(1));
    return {
      token: _.get(hash, 'access_token', null),
      username: _.get(hash, 'username', null),
      expiresIn: _.get(hash, 'expires_in', null),
    };
  } catch (error) {
    return { token: null, username: null, expiresIn: null };
  }
};

// logic taken from esri-rest-auth UserSession.js:
// new Date(Date.now() - parseInt(expiresIn, 10) * 1000 - 60 * 1000)
export const setTokenExpiration = (expiresIn: number): moment.Moment => {
  return moment().add(expiresIn, 'seconds').subtract(60, 'seconds');
};

// returns true if current time is after expire date
export const tokenExpired = (expires: Date): boolean => {
  return moment().isAfter(expires);
};
