'use client';

// 3rd party
import React, { useEffect, useRef } from 'react';
import { motion, useAnimate, useInView } from 'framer-motion';
import { Sparkle, Layers, ArrowDownSquare } from 'lucide-react';

// package
import { Button, Card, CardContent, CardHeader, CardTitle, Screen } from 'ui';

/**
 * Home
 */

const SECTIONS = [
  {
    title: 'Section 1',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    card: {
      style: { backgroundColor: 'rgba(255, 184, 108, 0.1)' },
      icon: <Layers className="text-primary" color="rgb(255, 184, 108)" />,
    },
    button: {
      style: { color: 'rgb(255, 184, 108)' },
    },
  },
  {
    title: 'Section 2',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    card: {
      style: { backgroundColor: 'rgba(255, 121, 198, 0.1)' },
      icon: <Layers className="text-primary" color="rgb(255, 121, 198)" />,
    },
    button: {
      style: { color: 'rgb(255, 121, 198)' },
    },
  },
  {
    title: 'Section 3',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    card: {
      style: { backgroundColor: 'rgba(189, 147, 249, 0.1)' },
      icon: <Layers className="text-primary" color="rgb(189, 147, 249)" />,
    },
    button: {
      style: { color: 'rgb(189, 147, 249)' },
    },
  },
];

export const Home = () => {
  const screenRefs = useRef<React.RefObject<HTMLDivElement>[]>(
    [...Array(SECTIONS.length)].map(() => React.createRef()),
  );

  return (
    <>
      <Screen className="min-h-[1000px] p-10">
        <div className="relative pb-32">
          <Glow />
          <Hero />
        </div>
        <Card
          className="w-full md:w-1/2 border-0"
          style={{ backgroundColor: 'rgba(68, 71, 90, 0.1)' }}
        >
          <CardHeader>
            <CardTitle>
              <div className="flex items-center gap-2">
                <Sparkle className="text-primary" color="rgb(139, 233, 253)" />
                <span>Lorem ipsum dolor sit amet.</span>
              </div>
            </CardTitle>
          </CardHeader>
        </Card>
        <Button
          variant="link"
          onClick={() =>
            screenRefs.current[0].current?.scrollIntoView({
              behavior: 'smooth',
            })
          }
          className="mt-10 animate-bounce"
        >
          <ArrowDownSquare size={32} color="rgb(139, 233, 253)" />
        </Button>
      </Screen>
      {SECTIONS.map(({ title, content, card, button }, i) => (
        <FadingScreen
          key={i}
          ref={screenRefs.current[i]}
          className="overflow-hidden"
        >
          <Card className="w-full md:w-1/2 border-0 mb-10" style={card.style}>
            <CardHeader>
              <CardTitle>
                <div className="flex items-center gap-2">
                  {card.icon}
                  <span>{title}</span>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-neutral-300">
              <div dangerouslySetInnerHTML={{ __html: content }} />
            </CardContent>
          </Card>
          {i === SECTIONS.length - 1 ? (
            <Button variant="link" size="lg">
              Let&apos;s Go!
            </Button>
          ) : (
            <Button
              variant="link"
              onClick={() =>
                screenRefs.current[i + 1].current?.scrollIntoView({
                  behavior: 'smooth',
                })
              }
            >
              <ArrowDownSquare size="32" style={button.style} />
            </Button>
          )}
        </FadingScreen>
      ))}
    </>
  );
};

/**
 * Glow
 */

const Glow = () => (
  <div
    className="absolute -top-20 right-0 -z-20 transform-gpu overflow-hidden blur-3xl"
    aria-hidden="true"
  >
    <div
      className="relative left-[calc(50%)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-primary to-secondary opacity-20"
      style={{
        clipPath:
          'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
      }}
    ></div>
  </div>
);

/**
 * Hero
 */

const Hero = () => (
  <div className="flex flex-row items-center">
    <div className="w-full md:w-3/5">
      <div className="flex flex-col gap-5">
        <h1 className="text-5xl font-serif">Lorem ipsum dolor sit amet.</h1>
        <h2 className="text-lg font-semibold">
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
          nisi ut aliquip ex ea commodo consequat.
        </h2>
        <Button variant="secondary" size="lg">
          Get Started
        </Button>
      </div>
    </div>
    <div className="hidden md:block w-2/5"></div>
  </div>
);

/**
 * FadingScreen
 */

const FadingScreen = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ children, ...props }, ref) => {
  const target = useRef(null);
  const isAllInView = useInView(target, { amount: 'all' });
  const isSomeInView = useInView(target, { amount: 'some' });
  const [scope, animate] = useAnimate();

  useEffect(() => {
    if (isAllInView) {
      animate(
        scope.current,
        { opacity: 1, scale: 1, y: 0 },
        { type: 'spring', stiffness: 100, damping: 20 },
      );
    } else if (!isSomeInView) {
      animate(
        scope.current,
        { opacity: 0, scale: 1.2, y: 50 },
        { duration: 0 },
      );
    }
  }, [isAllInView, isSomeInView, scope, animate]);

  return (
    <Screen ref={ref} {...props}>
      <div ref={target}>
        <motion.div
          ref={scope}
          initial={{ opacity: 0, scale: 1.2, y: 50 }}
          className="flex flex-col items-center"
        >
          {children}
        </motion.div>
      </div>
    </Screen>
  );
});
FadingScreen.displayName = 'FadingScreen';
