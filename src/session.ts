interface BrowserSessionArg {
  clientId: string;
  redirectUri: string;
  portalUrl?: string;
  tokenDuration?: number;
  state?: string;
}

interface BrowserSessionResp {
  oAuthUrl: Function;
}

/**
 * Manage on OAuth Session in the browser
 * https://developers.arcgis.com/rest/users-groups-and-items/authorize.htm
 * @param config
 * @returns object
 */
export const browser = ({
  clientId,
  redirectUri,
  portalUrl = 'https://www.arcgis.com',
  tokenDuration = 20160,
  state = '',
}: BrowserSessionArg): BrowserSessionResp => {
  return {
    oAuthUrl(): string {
      // Docs here
      return `${portalUrl}/sharing/rest/oauth2/authorize?client_id=${clientId}&response_type=token&expiration=${tokenDuration}&redirect_uri=${redirectUri}&state=${state}`;
    },
  };
};

export const genToken = (name: string): string => {
  return `genToken ${name}`;
};
