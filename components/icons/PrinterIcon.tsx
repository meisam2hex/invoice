
import React from 'react';

const PrinterIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0 1 10.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0 .229 2.523a1.125 1.125 0 0 1-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0c1.253 0 2.291-.706 2.733-1.815C20.999 14.85 21 13.59 21 12c0-1.59-.001-2.85-.267-3.185A2.733 2.733 0 0 0 17.66 7m-11.318 0c-1.253 0-2.291.706-2.733 1.815C3.001 10.15 3 11.41 3 12c0 1.59.001 2.85.267 3.185A2.733 2.733 0 0 0 6.34 17M9 9.75h6M9 12h6M9 14.25h6" />
  </svg>
);

export default PrinterIcon;
