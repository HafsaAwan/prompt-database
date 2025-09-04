// components/ToasterClient.tsx
'use client';

import { Toaster } from 'react-hot-toast';

export default function ToasterClient() {
  return (
    <Toaster
      position="top-right"
      reverseOrder={false}
      toastOptions={{
        style: { background: '#27272a', color: '#fafafa', border: '1px solid #3f3f46' },
        success: {
          style: { background: '#166534', color: 'white' },
          iconTheme: { primary: 'white', secondary: '#166534' },
        },
        error: {
          style: { background: '#991b1b', color: 'white' },
          iconTheme: { primary: 'white', secondary: '#991b1b' },
        },
      }}
    />
  );
}
