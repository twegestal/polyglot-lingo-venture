import { it, describe, expect } from 'vitest';
import supertest from 'supertest';
import { createServer } from '../server';

describe('Server endpoint test', () => {
  it('Should return 200 Hello, World', async () =>
    await supertest(createServer())
      .get('/health')
      .expect(200)
      .then((res) => {
        expect(res.body).toEqual('Hello, World');
      }));
});
