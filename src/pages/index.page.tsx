import React from 'react';

import { Header, Slider } from '../components/import-export';

export default function Home() {
  return (
    <div>
      <Header />
      <div style={{ marginTop: 55 }}>
        <Slider />
      </div>
    </div>
  );
}
