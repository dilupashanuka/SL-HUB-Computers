import { createClient } from '@/utils/supabase/server';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Edit, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { deleteService } from './actions';

export default async function AdminServicesPage() {
  const supabase = await createClient();
  const { data: services } = await supabase.from('services').select('*').order('created_at', { ascending: false });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Services Management</h1>
        <Link 
          href="/tarusha/dashboard/services/new"
          className={cn(buttonVariants())}
        >
          <Plus className="w-4 h-4 mr-2" /> Add Service
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Services</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Icon</TableHead>
                <TableHead>Price Range</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {services?.map((service) => (
                <TableRow key={service.id}>
                  <TableCell className="font-medium">{service.title}</TableCell>
                  <TableCell>{service.icon}</TableCell>
                  <TableCell>{service.price_range || '-'}</TableCell>
                  <TableCell className="text-right flex justify-end gap-2">
                    <form action={deleteService}>
                      <input type="hidden" name="id" value={service.id} />
                      <Button variant="ghost" size="icon" type="submit" className="text-red-500 hover:text-red-700">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </form>
                  </TableCell>
                </TableRow>
              ))}
              {!services?.length && (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                    No services found. Add your first service.
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
