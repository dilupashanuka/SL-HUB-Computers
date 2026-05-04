import { InventorySection } from "@/components/admin/InventorySection";

export default async function ComputersPage(props: {
  searchParams: Promise<{ search?: string; page?: string }>;
}) {
  const searchParams = await props.searchParams;
  return (
    <InventorySection 
      type="workstations" 
      title="Workstations" 
      description="Manage your custom PCs, Laptops, and professional workstations." 
      searchParams={searchParams}
    />
  );
}
