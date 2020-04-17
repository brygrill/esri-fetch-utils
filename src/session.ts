import { get, set, rm } from './utils';

interface BrowserSessionArg {
  clientId: string;
  redirectUri: string;
  portalUrl?: string;
  tokenDuration?: number;
  state?: string;
}

interface BrowserSessionResp {
  key: string;
  user: Function;
  oAuthUrl: Function;
  onRedirect: Function;
  tokenExpired: Function;
  clearSession: Function;
}

/**
 * Manage an Esri OAuth session in the browser
 * https://developers.arcgis.com/rest/users-groups-and-items/authorize.htm
 * @param config
 * @returns object with methods for managing session
 */
export const create = ({
  clientId,
  redirectUri,
  portalUrl = 'https://www.arcgis.com',
  tokenDuration = 20160,
  state = '',
}: BrowserSessionArg): BrowserSessionResp => {
  return {
    key: '__ARCGIS_REST_USER_SESSION__',
    user(): object | null {
      return get(this.key);
    },
    oAuthUrl(): string {
      return `${portalUrl}/sharing/rest/oauth2/authorize?client_id=${clientId}&response_type=token&expiration=${tokenDuration}&redirect_uri=${redirectUri}&state=${state}`;
    },
    onRedirect(): boolean {
      set(this.key, {
        clientId,
        portalUrl,
        token: 'access_token',
        tokenDuration,
        tokenExpires: 'setTokenExpiration(expires_in)',
        username: 'username',
      });
      return true;
    },
    tokenExpired(): boolean {
      return true;
    },
    clearSession(): void {
      rm(this.key);
    },
  };
};

export const genToken = (name: string): string => {
  return `genToken ${name}`;
};
