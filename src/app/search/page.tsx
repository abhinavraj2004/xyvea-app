'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import type { CausalNode } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { ProposeLinkModal } from '@/components/propose-link-modal';
import { ArrowRight, Link as LinkIcon, Loader2 } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { driver } from '@/lib/neo4j'; // Assuming you have this file

async function getResults(query: string | null): Promise<CausalNode[]> {
  if (!query) return [];
  const session = driver.session();
  try {
    const result = await session.run(
      'MATCH (n:CausalNode) WHERE toLower(n.title) CONTAINS toLower($query) RETURN n',
      { query }
    );
    return result.records.map(record => record.get('n').properties as CausalNode);
  } finally {
    await session.close();
  }
}


function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q');
  const [results, setResults] = useState<CausalNode[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      const fetchedResults = await getResults(query);
      setResults(fetchedResults);
      setLoading(false);
    };
    fetchResults();
  }, [query]);

  if (loading) {
    return <LoadingSkeleton />;
  }

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold font-headline">Search Results for "{query}"</h1>
          <ProposeLinkModal />
      </div>

      {results.length > 0 ? (
        <div className="grid gap-6">
          {results.map(node => (
            <Card key={node.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle>
                  <Link href={`/node/${node.slug}`} className="hover:underline">
                    {node.title}
                  </Link>
                </CardTitle>
                <CardDescription>{node.summary}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {node.tags.map(tag => (
                    <Badge key={tag} variant="secondary">{tag}</Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between items-center">
                 <div className="flex gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <LinkIcon className="h-4 w-4" />
                      <span>{node.causesCount} Causes</span>
                    </div>
                     <div className="flex items-center gap-1">
                      <LinkIcon className="h-4 w-4" />
                      <span>{node.effectsCount} Effects</span>
                    </div>
                 </div>
                 <Button variant="ghost" asChild>
                    <Link href={`/node/${node.slug}`}>
                        View Details <ArrowRight className="ml-2 h-4 w-4"/>
                    </Link>
                 </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 border-2 border-dashed rounded-lg">
          <h2 className="text-2xl font-semibold">No Results Found</h2>
          <p className="text-muted-foreground mt-2 max-w-md mx-auto">
            We couldn't find anything for "{query}". You can try a different search or be the first to propose a causal link about it.
          </p>
          <div className="mt-6">
            <ProposeLinkModal />
          </div>
        </div>
      )}
    </div>
  );
}

function LoadingSkeleton() {
    return (
        <div className="container mx-auto py-8 px-4 md:px-6">
            <div className="flex justify-between items-center mb-6">
                <Skeleton className="h-9 w-1/2" />
                <Skeleton className="h-10 w-36" />
            </div>
            <div className="grid gap-6">
                {[...Array(3)].map((_, i) => (
                    <Card key={i}>
                        <CardHeader>
                            <Skeleton className="h-7 w-3/4 mb-2" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-5/6" />
                        </CardHeader>
                        <CardContent>
                            <div className="flex gap-2">
                                <Skeleton className="h-6 w-20" />
                                <Skeleton className="h-6 w-24" />
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-end">
                            <Skeleton className="h-10 w-32" />
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    )
}

export default function SearchPage() {
    return (
        <Suspense fallback={<LoadingSkeleton />}>
            <SearchResults />
        </Suspense>
    )
}
