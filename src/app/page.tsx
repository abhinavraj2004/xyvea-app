"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { BrainCircuit, Search } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { useRateLimit } from '@/hooks/use-rate-limit';
import { LoginPromptModal } from '@/components/login-prompt-modal';

export default function Home() {
  const [query, setQuery] = useState('');
  const router = useRouter();
  const { user, loading } = useAuth();
  const { canSearch, consumeSearch, isLimitReached } = useRateLimit();
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!query.trim()) return;

    if (!user && !loading) {
      if (canSearch) {
        consumeSearch();
        router.push(`/search?q=${encodeURIComponent(query)}`);
      } else {
        setShowLoginPrompt(true);
      }
    } else if (user) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
    }
  };
  
  // Update login prompt visibility when limit is reached
  if (isLimitReached && !user && !loading && !showLoginPrompt) {
      setShowLoginPrompt(true);
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] text-center px-4">
      <div className="max-w-2xl mx-auto">
        <BrainCircuit className="mx-auto h-16 w-16 text-primary mb-4" />
        <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tight text-foreground">
          Xyvea: The Causality Engine
        </h1>
        <p className="mt-4 text-lg md:text-xl text-muted-foreground">
          Explore not just what happened, but why.
        </p>
        <form onSubmit={handleSearch} className="mt-8 flex w-full max-w-lg mx-auto items-center space-x-2">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="e.g., Climate Change"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-10 h-12 text-base rounded-full shadow-lg focus:shadow-xl transition-shadow"
              aria-label="Search for a cause or effect"
            />
          </div>
          <Button type="submit" size="lg" className="h-12 rounded-full shadow-lg hover:shadow-xl transition-shadow">
            Explore
          </Button>
        </form>
         <div className="mt-6 space-x-4">
          {!user && !loading && (
            <>
              <Button variant="link" asChild><a href="/login">Sign In</a></Button>
              <Button variant="link" asChild><a href="/leaderboard">Leaderboard</a></Button>
              <Button variant="link" asChild><a href="/pro">Upgrade to Pro</a></Button>
            </>
          )}
        </div>
      </div>
      <LoginPromptModal isOpen={showLoginPrompt} onClose={() => setShowLoginPrompt(false)} />
    </div>
  );
}
