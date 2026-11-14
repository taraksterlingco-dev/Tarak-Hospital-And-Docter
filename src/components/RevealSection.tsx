import { useEffect, useRef, useState, type ReactNode } from 'react';

interface RevealSectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  immediate?: boolean;
}

export function RevealSection({
  children,
  className = '',
  id,
  immediate = false,
}: RevealSectionProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(immediate);

  useEffect(() => {
    if (immediate) return;
    const node = ref.current;
    if (!node) return;

    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
            break;
          }
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px -32px 0px' }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [immediate]);

  return (
    <section
      id={id}
      ref={ref}
      className={`reveal-section transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      } ${className}`}
    >
      {children}
    </section>
  );
}
