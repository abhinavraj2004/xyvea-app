'use client';

import { useAuth } from '@/hooks/use-auth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Loader2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function ProfilePage({ params }: { params: { uid: string } }) {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div className="flex justify-center items-center h-64"><Loader2 className="h-8 w-8 animate-spin" /></div>;
  }
  
  // In a real app, you would fetch profile data based on params.uid
  // For this mock, we only show the profile if it's the currently logged-in user.
  if (!user || user.uid !== params.uid) {
    return (
      <div className="container mx-auto py-8 text-center">
        <h1 className="text-2xl font-bold">Profile not found or access denied.</h1>
        <p className="text-muted-foreground">Please log in to view your profile.</p>
        <Button variant="link" asChild className="mt-4">
            <Link href="/login">Go to Login</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-2xl py-12 px-4 md:px-6">
      <Card>
        <CardHeader className="flex flex-col items-center text-center">
          <Avatar className="h-24 w-24 mb-4">
            <AvatarImage src={`https://placehold.co/100x100.png?text=${user.displayName.charAt(0)}`} alt={user.displayName} data-ai-hint="person" />
            <AvatarFallback className="text-3xl">{user.displayName.charAt(0)}</AvatarFallback>
          </Avatar>
          <CardTitle className="text-3xl font-bold font-headline">{user.displayName}</CardTitle>
          <CardDescription>{user.email}</CardDescription>
          <Badge className="mt-2 capitalize" variant={user.plan === 'pro' ? 'default' : 'secondary'}>
            {user.plan} Plan
          </Badge>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="p-4 rounded-lg bg-muted">
                <p className="text-2xl font-bold">{user.contributions}</p>
                <p className="text-sm text-muted-foreground">Contributions</p>
            </div>
             <div className="p-4 rounded-lg bg-muted">
                <p className="text-2xl font-bold">20</p>
                <p className="text-sm text-muted-foreground">Searches Today</p>
            </div>
          </div>

          <div className="mt-6 text-center">
             <Button asChild>
                <Link href="/pro">
                    {user.plan === 'free' ? 'Upgrade to Pro' : 'Manage Pro Subscription'}
                </Link>
             </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
