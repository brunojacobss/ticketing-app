import request from 'supertest';
import { app } from '../../app';
import { getCookie } from '@bjsticketing/common';

it('responds with details about the current user', async () => {
  const response = await request(app)
    .get('/api/users/currentuser')
    .set('Cookie', getCookie())
    .send()
    .expect(200);

  expect(response.body.currentUser.email).toEqual('test@test.com');
});

it('responds with null if not authenticated', async () => {
  const response = await request(app)
    .get('/api/users/currentuser')
    .send()
    .expect(200);

  expect(response.body.currentUser).toEqual(null);
});
