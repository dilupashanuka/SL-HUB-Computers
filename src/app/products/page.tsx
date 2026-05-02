import { createClient } from '@/utils/supabase/server';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button, buttonVariants } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export const revalidate = 0;

export default async function ProductsPage(props: {
  searchParams: Promise<{ category?: string }>;
}) {
  // Await searchParams as required by Next.js 15+
  const resolvedSearchParams = await props.searchParams;
  const category = resolvedSearchParams.category;
  
  const supabase = await createClient();
  
  let query = supabase.from('products').select('*').order('created_at', { ascending: false });
  
  if (category) {
    query = query.eq('category', category);
  }
  
  const { data: products, error } = await query;

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12 text-center max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Our Products</h1>
        <p className="text-lg text-muted-foreground">
          Discover our range of high-quality computers, smartphones, and accessories.
        </p>
      </div>
      
      <div className="flex justify-center gap-2 mb-10 overflow-x-auto pb-4">
        <Link 
          href="/products"
          className={cn(buttonVariants({ variant: !category ? "default" : "outline" }), "rounded-full")}
        >
          All
        </Link>
        <Link 
          href="/products?category=desktops"
          className={cn(buttonVariants({ variant: category === 'desktops' ? "default" : "outline" }), "rounded-full")}
        >
          Desktops
        </Link>
        <Link 
          href="/products?category=monitors"
          className={cn(buttonVariants({ variant: category === 'monitors' ? "default" : "outline" }), "rounded-full")}
        >
          Monitors
        </Link>
        <Link 
          href="/products?category=phones"
          className={cn(buttonVariants({ variant: category === 'phones' ? "default" : "outline" }), "rounded-full")}
        >
          Smartphones
        </Link>
        <Link 
          href="/products?category=accessories"
          className={cn(buttonVariants({ variant: category === 'accessories' ? "default" : "outline" }), "rounded-full")}
        >
          Accessories
        </Link>
      </div>

      {!products || products.length === 0 ? (
        <div className="text-center py-24 bg-muted/50 rounded-2xl border border-dashed">
          <ShoppingCart className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">No products found</h3>
          <p className="text-muted-foreground">We are currently updating our inventory. Please check back later.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <Card key={product.id} className="overflow-hidden flex flex-col hover:shadow-md transition-shadow bg-card border-border">
              <div className="aspect-[4/3] bg-muted relative overflow-hidden group">
                {product.image_url ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img 
                    src={product.image_url} 
                    alt={product.title} 
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground/30">
                    <ShoppingCart className="w-12 h-12" />
                  </div>
                )}
                {!product.in_stock && (
                  <div className="absolute top-3 right-3">
                    <Badge variant="destructive">Out of Stock</Badge>
                  </div>
                )}
                {product.in_stock && (
                  <div className="absolute top-3 right-3">
                    <Badge variant="success">In Stock</Badge>
                  </div>
                )}
              </div>
              <CardHeader className="p-4 pb-2">
                <div className="flex justify-between items-start gap-2">
                  <CardTitle className="line-clamp-2 text-lg">{product.title}</CardTitle>
                </div>
                <CardDescription className="capitalize text-muted-foreground">{product.category}</CardDescription>
              </CardHeader>
              <CardContent className="p-4 pt-0 flex-1">
                <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                  {product.description}
                </p>
                <div className="text-xl font-bold text-foreground mt-auto">
                  {product.price ? `Rs. ${product.price.toLocaleString()}` : 'Price on request'}
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0 border-t mt-4 flex gap-2">
                <Link 
                  href={`https://wa.me/94710678944?text=I'm interested in buying ${product.title}`} 
                  target="_blank"
                  className={cn(buttonVariants({ variant: "success" }), "w-full")}
                >
                  Inquire via WhatsApp
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
