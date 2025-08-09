"use client";

import { mockNodes, mockEdges } from '@/lib/mock-data';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis, ZAxis, Tooltip, Cell, LabelList } from 'recharts';
import { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import React from 'react';
import { useParams } from 'next/navigation';

interface GraphNode {
    x: number;
    y: number;
    z: number; // size
    id: string;
    name: string;
    slug: string;
    fill: string;
}

interface GraphEdge {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
}


export default function GraphPage() {
    const params = useParams();
    const slug = params.slug as string;
    const centralNode = mockNodes.find(n => n.slug === slug);

    const { graphNodes, graphEdges } = useMemo(() => {
        if (!centralNode) return { graphNodes: [], graphEdges: [] };

        const nodes: GraphNode[] = [];
        const edges: GraphEdge[] = [];
        const nodeMap = new Map<string, GraphNode>();

        const addNode = (n: typeof centralNode, x: number, y: number, isCentral: boolean = false) => {
            if (nodeMap.has(n.id)) return nodeMap.get(n.id)!;
            const newNode: GraphNode = { 
                x, y, 
                z: isCentral ? 200 : 100, 
                id: n.id, 
                name: n.title,
                slug: n.slug,
                fill: isCentral ? '#293B5F' : '#6A8EAE' 
            };
            nodes.push(newNode);
            nodeMap.set(n.id, newNode);
            return newNode;
        };

        const centerNode = addNode(centralNode, 0, 0, true);

        const causes = mockEdges.filter(e => e.effect.id === centralNode.id);
        const effects = mockEdges.filter(e => e.cause.id === centralNode.id);

        causes.forEach((edge, i) => {
            const angle = (Math.PI / (causes.length + 1)) * (i + 1) + Math.PI / 2;
            const causeNode = addNode(edge.cause, Math.cos(angle) * 200, Math.sin(angle) * 200);
            edges.push({ x1: causeNode.x, y1: causeNode.y, x2: centerNode.x, y2: centerNode.y });
        });
        
        effects.forEach((edge, i) => {
            const angle = (Math.PI / (effects.length + 1)) * (i + 1) - Math.PI/2;
            const effectNode = addNode(edge.effect, Math.cos(angle) * 200, Math.sin(angle) * 200);
            edges.push({ x1: centerNode.x, y1: centerNode.y, x2: effectNode.x, y2: effectNode.y });
        });
        
        return { graphNodes: nodes, graphEdges: edges };
    }, [centralNode]);
    
    if (!centralNode) {
        return <div className="container text-center py-8">Node not found.</div>;
    }

    return (
        <div className="container mx-auto py-8 px-4 md:px-6">
            <Card>
                <CardHeader>
                    <CardTitle>Causality Graph: {centralNode.title}</CardTitle>
                </CardHeader>
                <CardContent className="h-[60vh] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <ScatterChart
                            margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                        >
                            <XAxis type="number" dataKey="x" hide domain={[-300, 300]} />
                            <YAxis type="number" dataKey="y" hide domain={[-300, 300]} />
                            <ZAxis type="number" dataKey="z" range={[100, 400]} />
                            <Tooltip
                                cursor={{ strokeDasharray: '3 3' }}
                                content={({ payload }) => {
                                    if (payload && payload.length > 0) {
                                        const node = payload[0].payload as GraphNode;
                                        return (
                                            <div className="bg-background border rounded-md p-2 shadow-lg">
                                                <p className="font-bold">{node.name}</p>
                                                <Link href={`/node/${node.slug}`} className="text-sm text-primary hover:underline">
                                                    View details
                                                </Link>
                                            </div>
                                        );
                                    }
                                    return null;
                                }}
                            />
                            
                            {/* Edges */}
                            {graphEdges.map((edge, i) => (
                                <line key={`line-${i}`} x1={`${(edge.x1 / 600 + 0.5) * 100}%`} y1={`${(-edge.y1 / 600 + 0.5) * 100}%`} x2={`${(edge.x2 / 600 + 0.5) * 100}%`} y2={`${(-edge.y2 / 600 + 0.5) * 100}%`} stroke="#94a3b8" strokeWidth={1} />
                            ))}
                            
                            {/* Nodes */}
                            <Scatter name="Nodes" data={graphNodes} shape="circle">
                                <LabelList dataKey="name" position="bottom" style={{ fill: '#475569', fontSize: 12 }} />
                                {graphNodes.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.fill} onClick={() => window.location.href = `/node/${entry.slug}`} style={{ cursor: 'pointer'}} />
                                ))}
                            </Scatter>
                        </ScatterChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
            <div className="text-center mt-4">
                <Button asChild variant="outline">
                    <Link href={`/node/${slug}`}>Back to Node Details</Link>
                </Button>
            </div>
        </div>
    );
}
