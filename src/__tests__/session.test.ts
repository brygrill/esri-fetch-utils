import { session as browserSession } from '../index';

const defaultConfig = {
  clientId: '1234',
  redirectUri: 'http://localhost:3000/auth',
};

const customConfig = {
  clientId: '1234',
  redirectUri: 'http://localhost:3000/auth',
  portalUrl: 'http://myportal.com',
  tokenDuration: 1000,
  state: 'qyxmpg9e5uWUPbxw',
};

const expectedUser = {
  username: 'grill',
  portalUrl: 'https://www.arcgis.com',
  clientId: '1234',
  token: '2YotnFZFEjr1zCsicMWpAA',
  tokenDuration: 20160,
  // tokenExpires: 'moment', this date will always change
  state: 'qyxmpg9e5uWUPbxw',
};

beforeAll(() => {
  window.location.hash =
    '#access_token=2YotnFZFEjr1zCsicMWpAA&expires_in=3600&username=grill&state=qyxmpg9e5uWUPbxw';
});

test('session - browser - defaults', () => {
  const session = browserSession.create(defaultConfig);

  const oAuthUrl = session.oAuthUrl();
  expect(oAuthUrl).toBe(
    'https://www.arcgis.com/sharing/rest/oauth2/authorize?client_id=1234&response_type=token&expiration=20160&redirect_uri=http://localhost:3000/auth&state=',
  );

  const expires = session.tokenExpired(20160);
  expect(expires).toBe(true);

  const user = session.onRedirect();
  expect(user).toMatchObject(expectedUser);
  expect(user.tokenExpires).toBeTruthy();
});

test('session - browser - custom', () => {
  const session = browserSession.create(customConfig);

  const oAuthUrl = session.oAuthUrl();
  expect(oAuthUrl).toBe(
    'http://myportal.com/sharing/rest/oauth2/authorize?client_id=1234&response_type=token&expiration=1000&redirect_uri=http://localhost:3000/auth&state=qyxmpg9e5uWUPbxw',
  );

  const user = session.onRedirect();
  expect(user.portalUrl).toBe(customConfig.portalUrl);
  expect(user.tokenDuration).toBe(1000);
});
