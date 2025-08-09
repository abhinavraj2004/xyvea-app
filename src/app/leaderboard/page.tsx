
'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { mockContributors } from "@/lib/mock-data"
import type { Contributor } from "@/lib/types"
import { Crown, Trophy } from "lucide-react"
import Link from "next/link";

function ContributorTable({ data }: { data: Contributor[] }) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[80px] text-center">Rank</TableHead>
                    <TableHead>Contributor</TableHead>
                    <TableHead className="text-right">Contributions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.map((contributor) => (
                    <TableRow key={contributor.id}>
                        <TableCell className="text-center">
                            <div className="flex justify-center items-center">
                                {contributor.rank === 1 && <Trophy className="h-6 w-6 text-yellow-500" />}
                                {contributor.rank === 2 && <Trophy className="h-6 w-6 text-gray-400" />}
                                {contributor.rank === 3 && <Trophy className="h-6 w-6 text-orange-400" />}
                                {contributor.rank > 3 && <span className="text-lg font-bold">{contributor.rank}</span>}
                            </div>
                        </TableCell>
                        <TableCell>
                            <div className="flex items-center gap-3">
                                <Avatar>
                                    <AvatarImage src={contributor.avatar} alt={contributor.name} data-ai-hint="person" />
                                    <AvatarFallback>{contributor.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div className="flex flex-col">
                                    <Link href={`/profile/${contributor.id}`} className="font-medium hover:underline">{contributor.name}</Link>
                                    {contributor.plan === 'pro' && (
                                         <Badge variant="default" className="w-fit text-xs mt-1">
                                            <Crown className="mr-1 h-3 w-3"/> Pro
                                        </Badge>
                                    )}
                                </div>
                            </div>
                        </TableCell>
                        <TableCell className="text-right text-lg font-bold">{contributor.contributions}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}


export default function LeaderboardPage() {
    return (
        <div className="container mx-auto max-w-4xl py-8 px-4 md:px-6">
            <Card>
                <CardHeader>
                    <CardTitle className="text-3xl font-bold font-headline flex items-center gap-2">
                       <Trophy className="h-8 w-8 text-primary"/> Top Contributors
                    </CardTitle>
                    <CardDescription>
                        Recognizing the most active members of the Xyvea community.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Tabs defaultValue="all-time">
                        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
                            <TabsTrigger value="all-time">All Time</TabsTrigger>
                            <TabsTrigger value="year">This Year</TabsTrigger>
                            <TabsTrigger value="month">This Month</TabsTrigger>
                            <TabsTrigger value="day">Today</TabsTrigger>
                        </TabsList>
                        <TabsContent value="all-time">
                           <ContributorTable data={mockContributors.allTime} />
                        </TabsContent>
                        <TabsContent value="year">
                             <ContributorTable data={mockContributors.year} />
                        </TabsContent>
                        <TabsContent value="month">
                            <ContributorTable data={mockContributors.month} />
                        </TabsContent>
                        <TabsContent value="day">
                            <ContributorTable data={mockContributors.day} />
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    );
}
