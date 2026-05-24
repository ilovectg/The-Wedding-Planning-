const fetch = global.fetch || require('node-fetch');

const API = process.env.API_URL || 'http://localhost:5001';

async function run() {
  try {
    console.log('Registering user...');
    let res = await fetch(`${API}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ first_name: 'Test', last_name: 'User', email: 'test.user+copilot@example.com', phone: '+8801000000000', password: 'Passw0rd!' })
    });
    const reg = await res.json().catch(() => ({}));
    console.log('Register status:', res.status, reg);

    console.log('Logging in...');
    res = await fetch(`${API}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'test.user+copilot@example.com', password: 'Passw0rd!' })
    });
    const login = await res.json();
    console.log('Login status:', res.status, login);

    if (!login.token) {
      console.error('Login failed; cannot continue');
      process.exit(1);
    }

    const token = login.token;

    console.log('Creating booking...');
    const bookingPayload = {
      bride_name: 'Safa',
      groom_name: 'Sadian',
      event_date: '2026-05-30',
      guest_count: 50,
      budget: 50000,
      package_id: 1,
      venue_id: 1,
      phone: '+8801234567890',
      email: 'test.user+copilot@example.com',
      notes: 'Test booking via script'
    };

    res = await fetch(`${API}/api/bookings/create`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
      body: JSON.stringify(bookingPayload)
    });

    const bookingRes = await res.json().catch(() => ({}));
    console.log('Booking status:', res.status, bookingRes);
  } catch (err) {
    console.error('Error during test flow:', err);
    process.exit(1);
  }
}

run();
