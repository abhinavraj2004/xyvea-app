"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
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
import { Loader2, Plus, Sparkles } from "lucide-react";
import { proposeLink } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";

const proposeLinkSchema = z.object({
  causeTitle: z.string().min(3, { message: "Cause title must be at least 3 characters." }),
  effectTitle: z.string().min(3, { message: "Effect title must be at least 3 characters." }),
  sourceUrl: z.string().url({ message: "Please enter a valid URL." }),
  claim: z.string().min(10, { message: "Claim must be at least 10 characters." }),
});

export function ProposeLinkModal() {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof proposeLinkSchema>>({
    resolver: zodResolver(proposeLinkSchema),
    defaultValues: { causeTitle: "", effectTitle: "", sourceUrl: "", claim: "" },
  });

  async function onSubmit(values: z.infer<typeof proposeLinkSchema>) {
    if (!user) {
      toast({ variant: "destructive", title: "Authentication required", description: "You must be logged in to propose a link."});
      return;
    }

    startTransition(async () => {
      const result = await proposeLink({
          causeTitle: values.causeTitle,
          effectTitle: values.effectTitle,
          claim: values.claim,
          sources: [{ url: values.sourceUrl, title: "User Submitted Source" }]
      });

      if (result.success) {
        toast({
          title: "Proposal Submitted!",
          description: "Your causal link has been sent for AI-powered evaluation.",
        });
        setIsOpen(false);
        form.reset();
      } else {
        toast({
          variant: "destructive",
          title: "Submission Failed",
          description: result.error,
        });
      }
    });
  }
  
  const handleOpenChange = (open: boolean) => {
    if (!user) {
      if(open) {
        toast({ variant: "destructive", title: "Authentication required", description: "You must be logged in to propose a link."});
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
        <Button>
          <Plus className="-ml-1 mr-2 h-5 w-5" />
          Propose Link
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            Propose a New Causal Link
          </DialogTitle>
          <DialogDescription>
            Submit a new causal relationship for evaluation. Our AI will analyze the evidence.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
                <FormField
                control={form.control}
                name="causeTitle"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Cause</FormLabel>
                    <FormControl>
                        <Input placeholder="e.g., Deforestation" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="effectTitle"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Effect</FormLabel>
                    <FormControl>
                        <Input placeholder="e.g., Loss of Biodiversity" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                 <FormField
                control={form.control}
                name="claim"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Your Claim</FormLabel>
                    <FormControl>
                        <Textarea placeholder="Briefly describe the causal link..." {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="sourceUrl"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Evidence Source URL</FormLabel>
                    <FormControl>
                        <Input placeholder="https://example.com/study.pdf" {...field} />
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
                    Submitting...
                    </>
                ) : (
                    "Submit for Review"
                )}
                </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
