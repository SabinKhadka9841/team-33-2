// Vercel Serverless Function to proxy OTP API requests
const OTP_API_URL = 'http://k8s-team33-accounts-4f99fe8193-a4c5da018f68b390.elb.ap-southeast-2.amazonaws.com';

export default async function handler(req, res) {
  const { path } = req.query;
  const apiPath = Array.isArray(path) ? path.join('/') : path || '';

  // Build the target URL
  const queryString = req.url.includes('?') ? req.url.substring(req.url.indexOf('?')) : '';
  const targetUrl = `${OTP_API_URL}/api/otp/${apiPath}${queryString}`;

  console.log(`Proxying ${req.method} request to: ${targetUrl}`);

  try {
    const fetchOptions = {
      method: req.method,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    };

    if (['POST', 'PUT', 'PATCH'].includes(req.method) && req.body) {
      fetchOptions.body = JSON.stringify(req.body);
    }

    const response = await fetch(targetUrl, fetchOptions);

    // Handle non-JSON responses
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      const data = await response.json();
      res.status(response.status).json(data);
    } else {
      const text = await response.text();
      res.status(response.status).send(text);
    }

  } catch (error) {
    console.error('OTP proxy error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to connect to OTP server',
      details: error.message,
    });
  }
}

export const config = {
  api: {
    bodyParser: true,
  },
};
