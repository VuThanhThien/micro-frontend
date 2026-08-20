import React, { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { mount } from 'remoteVue/pages';

interface VueWrapperProps {
  className?: string;
}

const VUE_BASENAME = '/admin/vue';

const VueWrapper: React.FC<VueWrapperProps> = ({ className }) => {
  const ref = useRef<HTMLDivElement>(null);
  const appRef = useRef<{ unmount: () => void; setHostPath: (path: string) => void }>();
  const navigate = useNavigate();
  const location = useLocation();

  // Keep the latest navigate in a ref so the mount effect below (which runs
  // only once) never holds a stale closure.
  const navigateRef = useRef(navigate);
  useEffect(() => {
    navigateRef.current = navigate;
  });

  useEffect(() => {
    if (ref.current) {
      appRef.current = mount(ref.current, {
        basename: VUE_BASENAME,
        onNavigate: path => navigateRef.current(path),
      });
      // Seed the Vue memory router with the host's current location.
      appRef.current.setHostPath(location.pathname);
    }
    return () => {
      appRef.current?.unmount();
      appRef.current = undefined;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Keep the Vue router in sync whenever the host URL changes (host owns the URL).
  useEffect(() => {
    appRef.current?.setHostPath(location.pathname);
  }, [location.pathname]);

  return <div ref={ref} className={className} />;
};

export default VueWrapper;
