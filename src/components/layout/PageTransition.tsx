'use client';

import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';
import LoadingScreen from '../LoadingScreen';

export default function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const prevPathRef = useRef(pathname);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (pathname !== prevPathRef.current) {
      prevPathRef.current = pathname;
      setLoading(true);
    }
  }, [pathname]);

  return (
    <>
      {loading && <LoadingScreen duration={400} onDone={() => setLoading(false)} />}
      {children}
    </>
  );
}
