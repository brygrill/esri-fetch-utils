# esri-fetch-utils

Utility functions for interacting with ArcGIS Server and Portal/AGOL REST APIs

![CI](https://github.com/brygrill/esri-fetch-utils/workflows/CI/badge.svg)

## Install

```
$ npm install esri-fetch-utils

# or

$ yarn add esri-fetch-utils
```

## Usage

### session: Auth via OAuth or Token

`session` provides utility methods for managing OAuth login flow and accessing
the user object. For use in the browser.

```javascript
// manage OAuth session in the browser
import { session as browserSession } from 'esri-fetch-utils';

//  init session
const config = {
  clientId: 'string', // registered app client id
  redirectUri: 'string', // callback url
  portalUrl: 'string', // optional - defaults to https://www.arcgis.com
  tokenDuration: 'number', // optional - defaults to 20160
  state: 'string', // optional
};
const session = browserSession.create(config);

// generate url to direct user to agol/portal login
const oAuthUrl = session.oAuthUrl();

// parse hash when user redirected back to your app on successful login
// user will be object like:
const expectedUser = {
  username: 'grill',
  portalUrl: 'https://www.arcgis.com',
  clientId: '1234',
  token: '2YotnFZFEjr1zCsicMWpAA',
  tokenDuration: 20160,
  tokenExpires: moment('2020-04-17T13:54:30.248'),
  state: 'qyxmpg9e5uWUPbxw',
};
const user = session.onRedirect();

// check is token is expired - will return true if expired
const expired = session.tokenExpired(moment('2020-04-17T13:54:30.248'));
// console.log(expired)
// true
```

`genToken` TODO - will generate a token via username/password. For use in
scripts/server.

### portal: TODO - working with users/items/groups

### service: TODO - query services

## Examples

Browser Login:  
[![Edit esri-fetch-utils-browser-example](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/recursing-firefly-ccg4t?fontsize=14&hidenavigation=1&theme=dark)
