// Dynamic configuration based on environment
export const getConfig = () => {
  const hostname = typeof window !== 'undefined' ? window.location.hostname : 'localhost';

  const isLocalhost = hostname === 'localhost' || hostname === '127.0.0.1' || hostname.startsWith('192.168.') || hostname.startsWith('10.') || hostname === '0.0.0.0';
  const isProduction = hostname === 'bidhan.imakshay.in';

  return {
    environment: isLocalhost ? 'development' : isProduction ? 'production' : 'unknown',
    api: {
      baseURL: isLocalhost
        ? 'http://localhost:3000/api'
        : isProduction
        ? 'https://bidhan.imakshay.in/api'
        : 'https://bidhan.imakshay.in/api', // fallback to production
    },
    features: {
      enableDebug: isLocalhost,
      enableAnalytics: !isLocalhost,
    },
    domain: hostname,
  };
};

export const config = getConfig();