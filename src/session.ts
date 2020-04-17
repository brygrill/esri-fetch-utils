import * as moment from 'moment';

import { parseHash, setTokenExpiration, tokenExpired } from './utils';

const DEFAULTS = {
  portal: 'https://www.arcgis.com',
  duration: 20160,
};

interface BrowserSessionArg {
  clientId: string;
  redirectUri: string;
  portalUrl?: string;
  tokenDuration?: number;
  state?: string;
}

interface BrowserSessionResp {
  oAuthUrl: Function;
  onRedirect: Function;
  tokenExpired: Function;
}

interface User {
  clientId: string;
  portalUrl: string;
  tokenDuration: number;
  token: string | null;
  tokenExpires: moment.Moment | null;
  username: string | null;
  state: string | null;
}

/**
 * Manage an Esri OAuth session in the browser
 * https://developers.arcgis.com/rest/users-groups-and-items/authentication.htm
 * @param config
 * @returns object with methods for managing session
 */
export const create = ({
  clientId,
  redirectUri,
  portalUrl = DEFAULTS.portal,
  tokenDuration = DEFAULTS.duration,
  state = '',
}: BrowserSessionArg): BrowserSessionResp => {
  return {
    oAuthUrl(): string {
      return `${portalUrl}/sharing/rest/oauth2/authorize?client_id=${clientId}&response_type=token&expiration=${tokenDuration}&redirect_uri=${redirectUri}&state=${state}`;
    },
    onRedirect(): User {
      const { token, username, expiresIn, state } = parseHash();
      return {
        clientId,
        portalUrl,
        token,
        tokenDuration,
        tokenExpires: expiresIn ? setTokenExpiration(expiresIn) : null,
        username,
        state,
      };
    },
    tokenExpired,
  };
};

export const genToken = (name: string): string => {
  return `genToken ${name}`;
};
