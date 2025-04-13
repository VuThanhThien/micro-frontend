import React, { useEffect, useRef } from 'react';
import { mount } from 'remoteVue/pages';

interface VueWrapperProps {
  className?: string;
}

const VueWrapper: React.FC<VueWrapperProps> = ({ className }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      const { unmount } = mount(ref.current);
      return () => {
        unmount();
      };
    }
  }, []);

  return <div ref={ref} className={className} />;
};

export default VueWrapper;
