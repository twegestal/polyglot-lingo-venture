import { it, describe, expect } from 'vitest';
import supertest from 'supertest';
import { createServer } from '../server';

describe('Server endpoint test', () => {
  it('Should return 200 hello world', async () =>
    await supertest(createServer())
      .get('/hello')
      .expect(200)
      .then((res) => {
        expect(res.body).toEqual('Hello, World!');
      }));
});
