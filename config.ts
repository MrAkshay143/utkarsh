// Dynamic configuration based on environment
export const getConfig = () => {
  const hostname = window.location.hostname;
  const isLocalhost = hostname === 'localhost' || hostname === '127.0.0.1' || hostname.includes('localhost');
  const isProduction = hostname === 'bidhan.imakshay.in';

  return {
    environment: isLocalhost ? 'development' : isProduction ? 'production' : 'unknown',
    apiUrl: isLocalhost ? 'http://localhost:3000' : isProduction ? 'https://bidhan.imakshay.in' : '',
    baseUrl: isLocalhost ? 'http://localhost:3000' : isProduction ? 'https://bidhan.imakshay.in' : window.location.origin,
    isLocalhost,
    isProduction,
    // Add more configurable options here
    branding: {
      title: 'UTKARSH Presentation',
      company: 'SHALIMAR GROUP',
      // Could be different for different domains if needed
    },
    features: {
      adminPanel: true,
      slideEditing: true,
      // Add feature flags here
    }
  };
};

export const config = getConfig();