// package
import { Button } from '@anabasis/ui';

/**
 * Hero
 */

export const Hero = () => (
  <div className="flex flex-row items-center">
    <div className="w-full md:w-3/5">
      <div className="flex flex-col gap-5">
        <h1 className="text-5xl font-serif">Lorem ipsum dolor sit amet.</h1>
        <h2 className="text-lg font-semibold">
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
          nisi ut aliquip ex ea commodo consequat.
        </h2>
        <Button variant="pink" size="lg">
          Get Started
        </Button>
      </div>
    </div>
    <div className="hidden md:block w-2/5"></div>
  </div>
);
