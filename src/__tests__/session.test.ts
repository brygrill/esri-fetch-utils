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
  state: 'mystate=9876',
};

test('session - browser - defaults', () => {
  const session = browserSession.create(defaultConfig);
  console.log(session);
  const user = session.user();
  if (!user) {
    console.log('show login');
  }
  const oAuthUrl = session.oAuthUrl();
  console.log(user);
  expect(oAuthUrl).toBe(
    'https://www.arcgis.com/sharing/rest/oauth2/authorize?client_id=1234&response_type=token&expiration=20160&redirect_uri=http://localhost:3000/auth&state=',
  );
});

test('session - browser - custom', () => {
  const session = browserSession.create(customConfig);

  const oAuthUrl = session.oAuthUrl();

  expect(oAuthUrl).toBe(
    'http://myportal.com/sharing/rest/oauth2/authorize?client_id=1234&response_type=token&expiration=1000&redirect_uri=http://localhost:3000/auth&state=mystate=9876',
  );
});
