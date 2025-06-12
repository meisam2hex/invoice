
import React from 'react';

const TrashIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12.56 0c1.153 0 2.24.032 3.22.096m7.124 0c-.317.033-.63.064-.938.093m-4.144.139L14.74 18M9.26 18l.346-9.001M18.16 5.791l-1.096-2.56a1.5 1.5 0 0 0-1.356-.9H8.784a1.5 1.5 0 0 0-1.356.9L6.33 5.791" />
  </svg>
);

export default TrashIcon;
