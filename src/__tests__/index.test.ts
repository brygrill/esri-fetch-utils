import { portal, service, session } from '../index';

test('portal', () => {
  expect(portal('util')).toBe('portal util');
});

test('service', () => {
  expect(service('util')).toBe('service util');
});

test('session', () => {
  expect(session.browserSession('util')).toBe('browserSession util');
  expect(session.genToken('util')).toBe('genToken util');
});
