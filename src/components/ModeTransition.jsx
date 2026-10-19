import { useEffect, useRef, useState } from 'react';

// Plays once when switching INTO anime mode:
//   1. Screen goes dark, big Roger Pirates logo fades/scales in (slow) — "appear"
//   2. Holds at full size for a beat — "hold"
//   3. Real app underneath is switched to anime mode (invisible, still covered)
//   4. Logo animates (FLIP: measure the real header logo's on-screen rect,
//      then transform from here to there) down to its actual header
//      position/size — "shrink"
//   5. Overlay fades out, revealing the page with the logo already sitting
//      exactly where the animation left it — "exit"
function ModeTransition({ onSwitch, onDone }) {
  const [phase, setPhase] = useState('appear');
  const [visible, setVisible] = useState(false);
  const [shrinkStyle, setShrinkStyle] = useState(null);
  const logoRef = useRef(null);
  const switchedRef = useRef(false);

  // Trigger the CSS transition in on mount (double rAF so the browser
  // registers the initial state before flipping the class).
  useEffect(() => {
    const raf1 = requestAnimationFrame(() => {
      const raf2 = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(raf2);
    });
    return () => cancelAnimationFrame(raf1);
  }, []);

  // appear -> hold (also flips the real app to anime mode, still hidden
  // behind the opaque overlay at this point)
  useEffect(() => {
    if (phase !== 'appear') return;
    const t = setTimeout(() => {
      if (!switchedRef.current) {
        switchedRef.current = true;
        onSwitch();
      }
      setPhase('hold');
    }, 500);
    return () => clearTimeout(t);
  }, [phase, onSwitch]);

  // hold -> shrink
  useEffect(() => {
    if (phase !== 'hold') return;
    const t = setTimeout(() => setPhase('shrink'), 350);
    return () => clearTimeout(t);
  }, [phase]);

  // shrink: measure the real header logo and animate toward it
  useEffect(() => {
    if (phase !== 'shrink') return;
    const target = document.getElementById('header-anime-logo');
    const big = logoRef.current;

    if (target && big) {
      const targetRect = target.getBoundingClientRect();
      const bigRect = big.getBoundingClientRect();
      const scaleX = targetRect.width / bigRect.width;
      const scaleY = targetRect.height / bigRect.height;
      const translateX = (targetRect.left + targetRect.width / 2) - (bigRect.left + bigRect.width / 2);
      const translateY = (targetRect.top + targetRect.height / 2) - (bigRect.top + bigRect.height / 2);

      requestAnimationFrame(() => {
        setShrinkStyle({
          transform: `translate(${translateX}px, ${translateY}px) scale(${scaleX}, ${scaleY})`,
          transition: 'transform 550ms cubic-bezier(.65,0,.35,1)',
        });
      });
    }

    const t = setTimeout(() => setPhase('exit'), 600);
    return () => clearTimeout(t);
  }, [phase]);

  // exit: fade the whole overlay out, then unmount
  useEffect(() => {
    if (phase !== 'exit') return;
    const t = setTimeout(() => onDone(), 340);
    return () => clearTimeout(t);
  }, [phase, onDone]);

  return (
    <div className={`mode-transition-overlay${phase === 'exit' ? ' is-exiting' : ''}`}>
      <img
        ref={logoRef}
        src="/roger-logo.png"
        alt=""
        className={`mode-transition-logo${visible ? ' is-visible' : ''}`}
        style={shrinkStyle || undefined}
      />
    </div>
  );
}

export default ModeTransition;
