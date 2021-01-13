import { app } from '../../app';
import mongoose from 'mongoose';
import request from 'supertest';
import { getCookie, OrderStatus } from '@bjsticketing/common';
import { Order } from '../../models/order';
import { stripe } from '../../stripe';
import { Payment } from '../../models/payment';

it('should return a 404 when purchasing an order that does not exist', async () => {
  await request(app)
    .post('/api/payments')
    .set('Cookie', getCookie())
    .send({
      token: 'asdasd',
      orderId: mongoose.Types.ObjectId().toHexString(),
    })
    .expect(404);
});

it('should return a 401 when purchasing an order that doesnt belong to the user', async () => {
  const order = Order.build({
    id: mongoose.Types.ObjectId().toHexString(),
    userId: mongoose.Types.ObjectId().toHexString(),
    version: 0,
    price: 20,
    status: OrderStatus.Created,
  });
  await order.save();

  await request(app)
    .post('/api/payments')
    .set('Cookie', getCookie())
    .send({
      token: 'asdasd',
      orderId: order.id,
    })
    .expect(401);
});

it('should return a 400 when purchasing a cancelled order', async () => {
  const userId = mongoose.Types.ObjectId().toHexString();

  const order = Order.build({
    id: mongoose.Types.ObjectId().toHexString(),
    userId,
    version: 0,
    price: 20,
    status: OrderStatus.Cancelled,
  });
  await order.save();

  await request(app)
    .post('/api/payments')
    .set('Cookie', getCookie(userId))
    .send({ orderId: order.id, token: 'asdasd' })
    .expect(400);
});

it('should return 204 with valid inputs', async () => {
  const userId = mongoose.Types.ObjectId().toHexString();

  const price = Math.floor(Math.random() * 100000);

  const order = Order.build({
    id: mongoose.Types.ObjectId().toHexString(),
    userId,
    version: 0,
    price,
    status: OrderStatus.Created,
  });
  await order.save();

  await request(app)
    .post('/api/payments')
    .set('Cookie', getCookie(userId))
    .send({ token: 'tok_visa', orderId: order.id })
    .expect(201);

  const stripeCharges = await stripe.charges.list({ limit: 50 });
  const stripeCharge = stripeCharges.data.find(
    (charge) => charge.amount === price * 100
  );

  expect(stripeCharge).toBeDefined();

  const payment = await Payment.findOne({
    orderId: order.id,
    stripeId: stripeCharge!.id,
  });

  expect(payment).not.toBeNull();
});
