import { createClient } from '@/utils/supabase/server';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Edit, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { deleteFaq } from './actions';

export default async function AdminFaqsPage() {
  const supabase = await createClient();
  const { data: faqs } = await supabase.from('faqs').select('*').order('created_at', { ascending: false });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">FAQ Management</h1>
        <Link 
          href="/tarusha/dashboard/faqs/new"
          className={cn(buttonVariants())}
        >
          <Plus className="w-4 h-4 mr-2" /> Add FAQ
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All FAQs</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Question</TableHead>
                <TableHead>Answer</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {faqs?.map((faq) => (
                <TableRow key={faq.id}>
                  <TableCell className="font-medium max-w-xs truncate">{faq.question}</TableCell>
                  <TableCell className="max-w-xs truncate text-muted-foreground">{faq.answer}</TableCell>
                  <TableCell className="text-right flex justify-end gap-2">
                    <form action={deleteFaq}>
                      <input type="hidden" name="id" value={faq.id} />
                      <Button variant="ghost" size="icon" type="submit" className="text-red-500 hover:text-red-700">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </form>
                  </TableCell>
                </TableRow>
              ))}
              {!faqs?.length && (
                <TableRow>
                  <TableCell colSpan={3} className="text-center py-8 text-muted-foreground">
                    No FAQs found. Add your first FAQ.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
