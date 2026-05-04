"use client"

import { useState, useEffect, useTransition } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Package, Plus, Trash2, Cpu, Smartphone, Monitor, HardDrive, Check, X } from "lucide-react";
import { AdminMediaUpload } from "@/components/admin/AdminMediaUpload";
import { createProduct, updateProduct, addQuickCategory } from "@/app/tarusha/dashboard/products/actions";

interface Specification {
  key: string;
  value: string;
}

interface ProductFormProps {
  initialData?: any;
  categories: any[];
  fixedInventoryType?: string;
}

export function ProductForm({ initialData, categories: initialCategories, fixedInventoryType }: ProductFormProps) {
  const [inventoryType, setInventoryType] = useState(fixedInventoryType || initialData?.inventory_type || "");
  const [specs, setSpecs] = useState<Specification[]>([]);
  
  const [categories, setCategories] = useState(initialCategories);
  const [selectedCategoryId, setSelectedCategoryId] = useState(initialData?.category_id || "");
  const [showNewCategory, setShowNewCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [isPending, startTransition] = useTransition();

  // Initialize specs from initialData.specifications
  useEffect(() => {
    if (initialData?.specifications) {
      const formattedSpecs = Object.entries(initialData.specifications).map(([key, value]) => ({
        key,
        value: value as string
      }));
      setSpecs(formattedSpecs);
    } else {
      // Default specs based on inventory type for better UX
      if (inventoryType === 'components' && specs.length === 0) {
        setSpecs([
          { key: 'Generation', value: '' },
          { key: 'Cores', value: '' },
          { key: 'Threads', value: '' }
        ]);
      } else if (inventoryType === 'workstations' && specs.length === 0) {
         setSpecs([
          { key: 'Processor', value: '' },
          { key: 'RAM', value: '' },
          { key: 'Storage', value: '' },
          { key: 'Graphics', value: '' }
        ]);
      } else if (inventoryType === 'flagships' && specs.length === 0) {
        setSpecs([
          { key: 'OS', value: '' },
          { key: 'Storage', value: '' },
          { key: 'RAM', value: '' },
          { key: 'Color', value: '' }
        ]);
      }
    }
  }, [initialData, inventoryType]);

  const addSpec = () => {
    setSpecs([...specs, { key: "", value: "" }]);
  };

  const updateSpec = (index: number, field: 'key' | 'value', value: string) => {
    const newSpecs = [...specs];
    newSpecs[index][field] = value;
    setSpecs(newSpecs);
  };

  const removeSpec = (index: number) => {
    setSpecs(specs.filter((_, i) => i !== index));
  };

  const filteredCategories = categories.filter((c: any) => c.inventory_type === inventoryType);

  const handleQuickAddCategory = () => {
    if (!newCategoryName || !inventoryType) return;
    startTransition(async () => {
      const newCat = await addQuickCategory(newCategoryName, inventoryType);
      if (newCat) {
        setCategories([...categories, newCat]);
        setSelectedCategoryId(newCat.id);
        setNewCategoryName("");
        setShowNewCategory(false);
      }
    });
  };

  return (
    <form action={initialData ? updateProduct : createProduct} className="space-y-8">
      {initialData && <input type="hidden" name="id" value={initialData.id} />}
      
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* General Info */}
          <Card className="bg-slate-900/40 border-white/5 backdrop-blur-md">
            <CardHeader>
              <CardTitle className="text-white text-xl">General Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label className="text-slate-300 font-bold text-[11px] uppercase tracking-wider">Product Title</Label>
                <Input 
                  name="title" 
                  defaultValue={initialData?.title}
                  required 
                  placeholder="e.g., Apple MacBook Pro M3" 
                  className="bg-white/5 border-white/10 text-white h-12"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-slate-300 font-bold text-[11px] uppercase tracking-wider">Inventory Type</Label>
                  <select 
                    name="inventory_type" 
                    value={inventoryType}
                    onChange={(e) => setInventoryType(e.target.value)}
                    required
                    disabled={!!fixedInventoryType}
                    className="w-full bg-white/5 border border-white/10 text-white h-12 rounded-lg px-4 focus:outline-none focus:border-blue-500/50"
                  >
                    <option value="" disabled>Select Inventory</option>
                    <option value="workstations">Workstations (Computers & Laptops)</option>
                    <option value="flagships">Flagships (Phones & Tablets)</option>
                    <option value="components">Components (PC Parts & Accessories)</option>
                  </select>
                  {fixedInventoryType && <input type="hidden" name="inventory_type" value={fixedInventoryType} />}
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className="text-slate-300 font-bold text-[11px] uppercase tracking-wider">Category</Label>
                    {inventoryType && (
                      <button 
                        type="button" 
                        onClick={() => setShowNewCategory(!showNewCategory)}
                        className="text-[10px] text-primary hover:text-blue-400 font-bold uppercase tracking-wider"
                      >
                        {showNewCategory ? 'Cancel' : '+ New Category'}
                      </button>
                    )}
                  </div>
                  
                  {showNewCategory ? (
                    <div className="flex gap-2">
                      <Input 
                        value={newCategoryName}
                        onChange={(e) => setNewCategoryName(e.target.value)}
                        placeholder="New category name..."
                        className="bg-white/5 border-white/10 text-white h-12 flex-1"
                        autoFocus
                      />
                      <Button 
                        type="button" 
                        onClick={handleQuickAddCategory}
                        disabled={isPending || !newCategoryName}
                        className="h-12 w-12 bg-primary hover:bg-blue-600 text-white"
                      >
                        {isPending ? <Package className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                      </Button>
                    </div>
                  ) : (
                    <select 
                      name="category_id" 
                      value={selectedCategoryId}
                      onChange={(e) => setSelectedCategoryId(e.target.value)}
                      required
                      className="w-full bg-white/5 border border-white/10 text-white h-12 rounded-lg px-4 focus:outline-none focus:border-blue-500/50"
                    >
                      <option value="" disabled>Select Category</option>
                      {filteredCategories.filter((c: any) => !c.parent_id).map((parent: any) => (
                        <optgroup key={parent.id} label={parent.name} className="bg-slate-900">
                          <option value={parent.id} className="bg-slate-900">{parent.name} (Main)</option>
                          {filteredCategories.filter((c: any) => c.parent_id === parent.id).map((child: any) => (
                            <option key={child.id} value={child.id} className="bg-slate-900 pl-4">
                              ↳ {child.name}
                            </option>
                          ))}
                        </optgroup>
                      ))}
                    </select>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-slate-300 font-bold text-[11px] uppercase tracking-wider">Description</Label>
                <Textarea 
                  name="description" 
                  defaultValue={initialData?.description}
                  placeholder="Detailed product description..." 
                  className="bg-white/5 border-white/10 text-white min-h-[120px] resize-y"
                />
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label className="text-slate-300 font-bold text-[11px] uppercase tracking-wider">Brand</Label>
                  <Input name="brand" defaultValue={initialData?.brand} placeholder="e.g., Apple, Asus" className="bg-white/5 border-white/10 text-white h-12" />
                </div>
                <div className="space-y-2">
                  <Label className="text-slate-300 font-bold text-[11px] uppercase tracking-wider">Model</Label>
                  <Input name="model" defaultValue={initialData?.model} placeholder="e.g., iPhone 15 Pro" className="bg-white/5 border-white/10 text-white h-12" />
                </div>
                <div className="space-y-2">
                  <Label className="text-slate-300 font-bold text-[11px] uppercase tracking-wider">Price (LKR)</Label>
                  <Input name="price" type="number" defaultValue={initialData?.price} required className="bg-white/5 border-white/10 text-white h-12" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Dynamic Specifications */}
          <Card className="bg-slate-900/40 border-white/5 backdrop-blur-md">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-white text-xl">Technical Specifications</CardTitle>
                <CardDescription className="text-slate-500">Add custom attributes for filtering.</CardDescription>
              </div>
              <Button type="button" onClick={addSpec} variant="outline" size="sm" className="bg-blue-600/10 border-blue-500/20 text-blue-400 hover:bg-blue-600/20">
                <Plus className="w-4 h-4 mr-2" /> Add Attribute
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {specs.map((spec, index) => (
                <div key={index} className="flex gap-4 items-end animate-in fade-in slide-in-from-left-2">
                  <div className="flex-1 space-y-2">
                    <Label className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Attribute Name</Label>
                    <Input 
                      placeholder="e.g., RAM" 
                      value={spec.key} 
                      onChange={(e) => updateSpec(index, 'key', e.target.value)}
                      className="bg-white/5 border-white/10 text-white"
                    />
                  </div>
                  <div className="flex-1 space-y-2">
                    <Label className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Value</Label>
                    <Input 
                      placeholder="e.g., 16GB" 
                      value={spec.value} 
                      onChange={(e) => updateSpec(index, 'value', e.target.value)}
                      className="bg-white/5 border-white/10 text-white"
                    />
                  </div>
                  <Button 
                    type="button" 
                    onClick={() => removeSpec(index)} 
                    variant="ghost" 
                    size="icon" 
                    className="text-slate-500 hover:text-red-400 hover:bg-red-400/10 h-10 w-10 mb-[1px]"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
              
              {/* Hidden input to send specs as JSON */}
              <input type="hidden" name="specifications" value={JSON.stringify(Object.fromEntries(specs.filter(s => s.key && s.value).map(s => [s.key, s.value])))} />
            </CardContent>
          </Card>

          <Card className="bg-slate-900/40 border-white/5 backdrop-blur-md">
            <CardHeader>
              <CardTitle className="text-white text-xl">Media Assets</CardTitle>
            </CardHeader>
            <CardContent>
              <AdminMediaUpload name="images" multiple initialImages={initialData?.images} />
            </CardContent>
          </Card>
        </div>

        <div className="space-y-8">
          <Card className="bg-slate-900/40 border-white/5 backdrop-blur-md">
            <CardHeader>
              <CardTitle className="text-white text-xl">Publish Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5">
                <div className="space-y-0.5">
                  <Label className="text-white font-bold">In Stock</Label>
                  <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Visible to customers</p>
                </div>
                <Switch name="in_stock" defaultChecked={initialData?.in_stock ?? true} />
              </div>

              <Button type="submit" className="w-full h-14 bg-blue-600 hover:bg-blue-500 text-white font-black tracking-widest rounded-2xl shadow-xl shadow-blue-600/20 transition-all active:scale-95 uppercase">
                {initialData ? "Update Product" : "Deploy to Store"}
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-blue-600/10 border-blue-500/20 backdrop-blur-md">
            <CardContent className="pt-6">
              <div className="flex gap-4">
                <div className="p-3 rounded-xl bg-blue-600/20 text-blue-400 h-fit">
                  {inventoryType === 'workstations' ? <Monitor className="w-5 h-5" /> : 
                   inventoryType === 'flagships' ? <Smartphone className="w-5 h-5" /> : 
                   <Cpu className="w-5 h-5" />}
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-bold text-white">Pro Tip</p>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Adding accurate specifications helps customers filter your products more effectively in the store.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </form>
  );
}
