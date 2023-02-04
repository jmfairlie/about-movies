import sleep from './sleep';

test('resolve', () => {
  const response = 'something';
  expect(sleep(0, response)).resolves.toBe(response);
});

test('reject', () => {
  const response = new Error('some error');
  expect(sleep(0, response, true)).rejects.toEqual(response);
});

test('delay', async () => {
  const delay = 2000;
  const response = Date.now() + delay;
  const delta = 10;
  const r = await sleep(3000, response);
  expect(r).toBeGreaterThanOrEqual(response);
  expect(r).toBeLessThan(response + delta);
});
