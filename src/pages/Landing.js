// src/pages/Landing.js
import { useNavigate } from 'react-router-dom';
import Button from '@mui/joy/Button';

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="relative isolate min-h-screen bg-slate-300">
      {/* Background gradient effect */}
      <div
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
        />
      </div>

      {/* Main content */}
      <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56 px-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Twitter for Korvais
          </h1>
          <p className="mt-4 text-lg text-gray-600 sm:text-xl">
            Discover and share mathematical patterns of Carnatic music with the world.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button
              size="lg"
              onClick={() => navigate('/feed')}
            >
              Explore
            </Button>
            <Button
              size="lg"
              variant="soft"
              onClick={() => navigate('/signup')}
            >
              Sign up
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom gradient effect */}
      <div
        className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#d6568b] to-[#9089fc] opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
        />
      </div>
    </div>
  );
}
