
import { test } from 'node:test';
import assert from 'node:assert';
import request from 'supertest';
import app from '../src/app.js';

test('POST /api/auth/register', async (t) => {

    await t.test('should reject registration when all fields are missing', async () => {

        const response = await request(app)
            .post('/api/auth/register')
            .send({});

        assert.strictEqual(response.status, 400);
        assert.strictEqual(response.body.message, 'Please bhaya kuch toh likho');

    });

    await t.test('should reject registration when password is missing', async () => {

        const response = await request(app)
            .post('/api/auth/register')
            .send({
                username: 'testuser',
                email: 'test@example.com'
            });

        assert.strictEqual(response.status, 400);

    });

});
