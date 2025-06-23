import React from 'react';

type Props = {
  size?: 'sm' | 'md' | 'lg';
};

const sizeMap = {
  sm: 'text-lg',
  md: 'text-2xl',
  lg: 'text-4xl',
};

const Logo = ({ size = 'sm' }: Props) => {
  return (
    <div className={`font-bold text-secondary ${sizeMap[size]}`}>
      Garanti
    </div>
  );
};

export default Logo;
