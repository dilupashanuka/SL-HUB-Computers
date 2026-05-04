import { InventorySection } from "@/components/admin/InventorySection";

export default async function FlagshipsPage(props: {
  searchParams: Promise<{ search?: string; page?: string }>;
}) {
  const searchParams = await props.searchParams;
  return (
    <InventorySection 
      type="flagships" 
      title="Flagships" 
      description="Manage premium smartphones and flagship devices." 
      searchParams={searchParams}
    />
  );
}
