import { InventorySection } from "@/components/admin/InventorySection";

export default async function ComponentsPage(props: {
  searchParams: Promise<{ search?: string; page?: string }>;
}) {
  const searchParams = await props.searchParams;
  return (
    <InventorySection 
      type="components" 
      title="Components" 
      description="Manage individual PC parts, peripherals, and accessories." 
      searchParams={searchParams}
    />
  );
}
