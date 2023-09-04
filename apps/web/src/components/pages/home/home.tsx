'use client';

// 3rd party
import React, { useRef } from 'react';
import { Sparkle, Layers, ArrowDownSquare } from 'lucide-react';

// package
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Screen,
  FadingScreen,
} from '@anabasis/ui';

// local
import { Glow } from './glow';
import { Hero } from './hero';

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
      icon: <Layers color="rgb(255, 184, 108)" />,
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
      icon: <Layers color="rgb(255, 121, 198)" />,
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
      icon: <Layers color="rgb(189, 147, 249)" />,
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
    <div className="pt-[80px]">
      <Screen className="p-10">
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
                <Sparkle className="text-purple" color="rgb(139, 233, 253)" />
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
          className="overflow-x-hidden"
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
    </div>
  );
};
