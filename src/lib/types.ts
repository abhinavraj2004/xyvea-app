export interface User {
  uid: string;
  displayName: string;
  email: string;
  plan: 'free' | 'pro';
  contributions: number;
}

export interface CausalNode {
  id: string;
  slug: string;
  title: string;
  summary: string;
  tags: string[];
  causesCount: number;
  effectsCount: number;
}

export interface CausalEdge {
  id:string;
  cause: CausalNode;
  effect: CausalNode;
  status: 'pending' | 'verified' | 'disputed';
  summary: string;
  confidence: number;
  stance: 'support' | 'refute' | 'inconclusive';
  upvotes: number;
  downvotes: number;
  key_quotes?: { text: string; cite: string }[];
}

export interface ProPlanFeature {
  name: string;
  free: boolean | string;
  pro: boolean | string;
}

export interface Contributor {
    id: string;
    rank: number;
    name: string;
    avatar: string;
    contributions: number;
    plan: 'free' | 'pro';
}
