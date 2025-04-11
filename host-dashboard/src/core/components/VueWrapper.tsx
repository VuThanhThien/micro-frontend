import React, { useEffect, useRef } from 'react';
import { createApp } from 'vue';

interface VueWrapperProps {
  component: any;
  props?: Record<string, any>;
}

const VueWrapper: React.FC<VueWrapperProps> = ({ component, props = {} }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const vueAppRef = useRef<any>(null);

  useEffect(() => {
    if (containerRef.current) {
      vueAppRef.current = createApp(component, props);
      vueAppRef.current.mount(containerRef.current);
    }

    return () => {
      if (vueAppRef.current) {
        vueAppRef.current.unmount();
      }
    };
  }, [component, props]);

  return <div ref={containerRef} />;
};

export default VueWrapper;