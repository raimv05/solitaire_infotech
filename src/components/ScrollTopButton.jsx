import React from 'react';
import { ArrowUp } from 'lucide-react';

export default function ScrollTopButton() {
  return (
    <a className="scroll-top" href="#home" aria-label="Back to top">
      <ArrowUp size={22} aria-hidden="true" />
    </a>
  );
}
