'use client';

import { mockNodes, mockEdges } from '@/lib/mock-data';
import type { CausalEdge } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ProposeLinkModal } from '@/components/propose-link-modal';
import { ArrowLeft, ArrowRight, GitCommitHorizontal, CheckCircle2, AlertTriangle, Clock, ArrowUp, ArrowDown, Quote } from 'lucide-react';
import React from 'react';
import { useParams } from 'next/navigation';
import { EvaluateLinkModal } from '@/components/evaluate-link-modal';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Separator } from '@/components/ui/separator';

function EdgeCard({ edge, type }: { edge: CausalEdge; type: 'cause' | 'effect' }) {
  const node = type === 'cause' ? edge.cause : edge.effect;
  
  const statusIcon = {
    verified: <CheckCircle2 className="h-4 w-4 text-green-500" />,
    pending: <Clock className="h-4 w-4 text-yellow-500" />,
    disputed: <AlertTriangle className="h-4 w-4 text-red-500" />,
  }[edge.status];

  return (
    <Collapsible className="group rounded-lg border p-3 transition-colors hover:bg-muted/50">
        <div className="flex items-start justify-between gap-4">
            <div className="flex-grow">
                 <CollapsibleTrigger className="w-full text-left">
                    <div className="flex items-center gap-3">
                        {type === 'effect' && <GitCommitHorizontal className="h-5 w-5 text-muted-foreground flex-shrink-0" />}
                        <span className="font-medium">{node.title}</span>
                        {type === 'cause' && <GitCommitHorizontal className="h-5 w-5 text-muted-foreground transform rotate-180 flex-shrink-0" />}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1 pl-8">{edge.summary}</p>
                 </CollapsibleTrigger>
            </div>
            <div className="flex items-center gap-4 shrink-0">
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Button size="icon" variant="ghost" className="h-7 w-7">
                        <ArrowUp className="h-4 w-4" />
                    </Button>
                    <span>{edge.upvotes}</span>
                </div>
                 <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Button size="icon" variant="ghost" className="h-7 w-7">
                        <ArrowDown className="h-4 w-4" />
                    </Button>
                    <span>{edge.downvotes}</span>
                </div>
            </div>
        </div>
        <div className="flex items-center justify-end gap-2 mt-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                {statusIcon}
                <span className="capitalize">{edge.status}</span>
            </div>
             <EvaluateLinkModal 
                edge={edge} 
                className="opacity-0 group-hover:opacity-100 transition-opacity" 
             />
        </div>
        <CollapsibleContent>
            {edge.key_quotes && edge.key_quotes.length > 0 && (
                <div className="mt-4 pt-4 border-t">
                    <h4 className="text-sm font-semibold mb-2 flex items-center gap-2"><Quote className="h-4 w-4"/> Key Evidence</h4>
                    <div className="space-y-3 pl-4">
                    {edge.key_quotes.map((quote, index) => (
                        <blockquote key={index} className="border-l-2 pl-3 italic text-sm text-muted-foreground">
                            <p>"{quote.text}"</p>
                            <cite className="text-xs not-italic text-muted-foreground/80 block mt-1">— {quote.cite}</cite>
                        </blockquote>
                    ))}
                    </div>
                </div>
            )}
        </CollapsibleContent>
    </Collapsible>
  );
}

export default function NodeDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const node = mockNodes.find(n => n.slug === slug);

  if (!node) {
    return (
      <div className="container mx-auto py-8 text-center">
        <h1 className="text-2xl font-bold">Node not found</h1>
        <Link href="/">
          <Button variant="link" className="mt-4">Go back to Home</Button>
        </Link>
      </div>
    );
  }

  const causes = mockEdges.filter(edge => edge.effect.id === node.id);
  const effects = mockEdges.filter(edge => edge.cause.id === node.id);

  return (
    <div className="container mx-auto max-w-4xl py-8 px-4 md:px-6">
      <div className="mb-8">
        <div className="flex flex-wrap gap-2 mb-2">
            {node.tags.map(tag => (
                <Badge key={tag} variant="outline">{tag}</Badge>
            ))}
        </div>
        <h1 className="text-4xl font-bold font-headline">{node.title}</h1>
        <p className="text-lg text-muted-foreground mt-2">{node.summary}</p>
        <div className="mt-6 flex gap-2">
            <ProposeLinkModal />
            <Button variant="outline" asChild>
                <Link href={`/graph/${node.slug}`}>Open Graph</Link>
            </Button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><ArrowLeft className="h-5 w-5" /> Causes</CardTitle>
            <CardDescription>Factors leading to {node.title}.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            {causes.length > 0 ? (
              causes.map(edge => <EdgeCard key={edge.id} edge={edge} type="cause" />)
            ) : (
              <p className="text-sm text-muted-foreground p-3">No causes found.</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">Effects <ArrowRight className="h-5 w-5" /></CardTitle>
            <CardDescription>Consequences resulting from {node.title}.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            {effects.length > 0 ? (
              effects.map(edge => <EdgeCard key={edge.id} edge={edge} type="effect" />)
            ) : (
              <p className="text-sm text-muted-foreground p-3">No effects found.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
