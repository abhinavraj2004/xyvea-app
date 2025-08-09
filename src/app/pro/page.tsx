import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, X } from "lucide-react";
import { proPlanFeatures } from '@/lib/mock-data';

export default function ProPage() {
  return (
    <div className="container mx-auto max-w-4xl py-12 px-4 md:px-6">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-headline">Unlock Your Full Potential</h1>
        <p className="text-lg md:text-xl text-muted-foreground mt-4">
          Upgrade to Xyvea Pro for private graphs, higher limits, and advanced features.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-start">
        <Card>
          <CardHeader>
            <CardTitle>Free Plan</CardTitle>
            <CardDescription>Perfect for casual exploration and learning the basics of causality.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-3xl font-bold">$0<span className="text-sm font-normal text-muted-foreground">/month</span></p>
            <ul className="space-y-3">
              {proPlanFeatures.map(feature => (
                <li key={feature.name} className="flex items-center gap-3">
                  {feature.free === true ? <Check className="h-5 w-5 text-green-500" /> : <X className="h-5 w-5 text-red-500" />}
                  <div>
                    <span className="font-medium">{feature.name}</span>
                    {typeof feature.free === 'string' && <p className="text-sm text-muted-foreground">{feature.free}</p>}
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" disabled>
              Your Current Plan
            </Button>
          </CardFooter>
        </Card>

        <Card className="border-primary shadow-lg">
          <CardHeader>
            <div className="flex justify-between items-center">
                <CardTitle>Pro Plan</CardTitle>
                <div className="text-sm font-bold bg-primary text-primary-foreground px-3 py-1 rounded-full">BETA</div>
            </div>
            <CardDescription>For researchers, teams, and professionals building private knowledge graphs.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-3xl font-bold">$10<span className="text-sm font-normal text-muted-foreground">/month (Coming Soon)</span></p>
            <ul className="space-y-3">
              {proPlanFeatures.map(feature => (
                <li key={feature.name} className="flex items-center gap-3">
                  {feature.pro === true ? <Check className="h-5 w-5 text-green-500" /> : (feature.pro === false ? <X className="h-5 w-5 text-red-500" /> : <Check className="h-5 w-5 text-green-500" />)}
                  <div>
                    <span className="font-medium">{feature.name}</span>
                    {typeof feature.pro === 'string' && <p className="text-sm text-muted-foreground">{feature.pro}</p>}
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Button className="w-full" disabled>
              Upgrade to Pro (Coming Soon)
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
