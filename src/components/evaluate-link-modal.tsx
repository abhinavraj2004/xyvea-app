"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState, useTransition } from "react";
import { Loader2, Scale, Sparkles } from "lucide-react";
import { evaluateLink } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";
import type { CausalEdge } from "@/lib/types";
import { cn } from "@/lib/utils";

const evaluateLinkSchema = z.object({
  sourceUrl: z.string().url({ message: "Please enter a valid URL." }),
  sourceText: z.string().min(20, { message: "Source text must be at least 20 characters." }).max(4000, { message: "Source text cannot exceed 4000 characters."}),
});

interface EvaluateLinkModalProps {
    edge: CausalEdge;
    className?: string;
}

export function EvaluateLinkModal({ edge, className }: EvaluateLinkModalProps) {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const claim = `'${edge.cause.title}' leads to '${edge.effect.title}'`;

  const form = useForm<z.infer<typeof evaluateLinkSchema>>({
    resolver: zodResolver(evaluateLinkSchema),
    defaultValues: { sourceUrl: "", sourceText: "" },
  });

  async function onSubmit(values: z.infer<typeof evaluateLinkSchema>) {
    if (!user) {
      toast({ variant: "destructive", title: "Authentication required", description: "You must be logged in to evaluate a link."});
      return;
    }

    startTransition(async () => {
      const result = await evaluateLink({
          claim: claim,
          sources: [{ url: values.sourceUrl, text: values.sourceText }]
      });

      if (result.success) {
        toast({
          title: "Evaluation Submitted!",
          description: "Your evidence has been sent for AI-powered analysis.",
        });
        setIsOpen(false);
        form.reset();
      } else {
        toast({
          variant: "destructive",
          title: "Evaluation Failed",
          description: result.error,
        });
      }
    });
  }
  
  const handleOpenChange = (open: boolean) => {
    if (!user) {
      if(open) {
        toast({ variant: "destructive", title: "Authentication required", description: "You must be logged in to evaluate a link."});
      }
      setIsOpen(false);
    } else {
      setIsOpen(open);
      if(!open) {
        form.reset();
      }
    }
  }


  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button size="icon" variant="ghost" className={className} aria-label="Evaluate Link">
            <Scale className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Scale className="h-5 w-5 text-primary" />
            Evaluate a Causal Link
          </DialogTitle>
          <DialogDescription>
            Provide new evidence to re-assess the claim: "{claim}". Our AI will analyze your source.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
                <FormField
                control={form.control}
                name="sourceUrl"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Evidence Source URL</FormLabel>
                    <FormControl>
                        <Input placeholder="https://example.com/research-paper.pdf" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="sourceText"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Relevant Text from Source</FormLabel>
                    <FormControl>
                        <Textarea rows={6} placeholder="Paste the most relevant text excerpt from your source here. This helps the AI focus its analysis." {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
            </div>
            <DialogFooter>
                <DialogClose asChild>
                  <Button type="button" variant="ghost">Cancel</Button>
                </DialogClose>
                <Button type="submit" disabled={isPending}>
                {isPending ? (
                    <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Evaluating...
                    </>
                ) : (
                    "Submit Evidence"
                )}
                </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
