// Vercel Serverless Function to proxy wallets API requests
const WALLETS_API_URL = 'http://k8s-team33-walletse-2b6bcd93c2-52fa21111cb7a7e7.elb.ap-southeast-2.amazonaws.com';

export default async function handler(req, res) {
  // Set CORS headers first
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-API-Key, Authorization');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { path } = req.query;
  const apiPath = Array.isArray(path) ? path.join('/') : path || '';

  // Build the target URL
  const queryString = req.url.includes('?') ? req.url.substring(req.url.indexOf('?')) : '';
  const targetUrl = `${WALLETS_API_URL}/api/wallets/${apiPath}${queryString}`;

  console.log(`[Wallet Proxy] ${req.method} ${targetUrl}`);

  try {
    const fetchOptions = {
      method: req.method,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-API-Key': req.headers['x-api-key'] || 'team33-admin-secret-key-2024',
      },
    };

    if (['POST', 'PUT', 'PATCH'].includes(req.method) && req.body) {
      fetchOptions.body = JSON.stringify(req.body);
    }

    const response = await fetch(targetUrl, fetchOptions);

    console.log(`[Wallet Proxy] Response status: ${response.status}`);

    // Handle non-JSON responses
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      const data = await response.json();
      console.log(`[Wallet Proxy] Response data:`, JSON.stringify(data).substring(0, 200));
      return res.status(response.status).json(data);
    } else {
      const text = await response.text();
      return res.status(response.status).send(text);
    }

  } catch (error) {
    console.error('[Wallet Proxy] Error:', error.message);
    return res.status(500).json({
      success: false,
      error: 'Failed to connect to wallets server',
      details: error.message,
    });
  }
}

export const config = {
  api: {
    bodyParser: true,
  },
};
