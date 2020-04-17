import { parseHash, setTokenExpiration, tokenExpired } from './utils';

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

/**
 * Manage an Esri OAuth session in the browser
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
    oAuthUrl(): string {
      return `${portalUrl}/sharing/rest/oauth2/authorize?client_id=${clientId}&response_type=token&expiration=${tokenDuration}&redirect_uri=${redirectUri}&state=${state}`;
    },
    onRedirect(): object {
      const { token, username, expiresIn } = parseHash();
      return {
        clientId,
        portalUrl,
        token,
        tokenDuration,
        tokenExpires: expiresIn ? setTokenExpiration(expiresIn) : null,
        username,
      };
    },
    tokenExpired,
  };
};

export const genToken = (name: string): string => {
  return `genToken ${name}`;
};
