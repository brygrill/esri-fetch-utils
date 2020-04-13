import { portal, service, session, token } from '../index';

test('portal', () => {
  expect(portal('util')).toBe('portal util');
});

test('service', () => {
  expect(service('util')).toBe('service util');
});

test('session', () => {
  expect(session('util')).toBe('session util');
});

test('token', () => {
  expect(token('util')).toBe('token util');
});
