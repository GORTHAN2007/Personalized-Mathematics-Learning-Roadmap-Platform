#!/usr/bin/env node
'use strict';

// Smoke test for the AI endpoints.
// Usage: node scripts/ai-smoke-test.js
// Or:    API_URL=http://localhost:5050/api/v1 node scripts/ai-smoke-test.js

const BASE = process.env.API_URL || 'http://localhost:5050/api/v1';

async function post(path, body) {
    const res = await fetch(`${BASE}${path}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
    });
    const text = await res.text();
    return { ok: res.ok, status: res.status, body: text };
}

async function run() {
    let failed = false;

    // ── 1. /ai/explain ───────────────────────────────────────────────────────
    process.stdout.write('POST /ai/explain ... ');
    try {
        const { ok, status, body } = await post('/ai/explain', {
            topic: 'Linear Algebra',
            question: 'What is a basis?',
        });
        if (ok) {
            console.log('OK');
        } else {
            console.log(`FAIL (${status}): ${body}`);
            failed = true;
        }
    } catch (err) {
        console.log(`ERROR: ${err.message}`);
        failed = true;
    }

    // ── 2. /ai/practice-questions ────────────────────────────────────────────
    process.stdout.write('POST /ai/practice-questions ... ');
    try {
        const { ok, status, body } = await post('/ai/practice-questions', {
            topic: 'Eigenvalues',
            difficulty: 'easy',
            count: 2,
        });
        if (ok) {
            console.log('OK');
        } else {
            console.log(`FAIL (${status}): ${body}`);
            failed = true;
        }
    } catch (err) {
        console.log(`ERROR: ${err.message}`);
        failed = true;
    }

    if (failed) {
        process.exit(1);
    }
}

run();
