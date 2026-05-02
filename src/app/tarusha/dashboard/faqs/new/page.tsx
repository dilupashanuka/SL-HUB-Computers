import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button, buttonVariants } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { createFaq } from '../actions';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function NewFaqPage() {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Add New FAQ</h1>
        <Link 
          href="/tarusha/dashboard/faqs"
          className={cn(buttonVariants({ variant: "outline" }))}
        >
          Cancel
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>FAQ Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={createFaq} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="question">Question *</Label>
              <Input id="question" name="question" required placeholder="What is your return policy?" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="answer">Answer *</Label>
              <Textarea id="answer" name="answer" required placeholder="Detailed answer here..." rows={5} />
            </div>

            <div className="pt-4 flex justify-end">
              <Button type="submit">Save FAQ</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
