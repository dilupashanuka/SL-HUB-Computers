'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Trash2, Edit2, Loader2, Save, X, Settings, Smartphone, PenTool as Tool, Truck, Headphones, Monitor, Cpu, Sparkles } from 'lucide-react';
import { toast } from 'sonner';
import { upsertService, deleteService } from './actions';

export default function ServicesManagerPage() {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [formData, setFormData] = useState({ id: '', title: '', description: '', icon: 'settings', price_range: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const supabase = createClient();

  const fetchServices = async () => {
    try {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('created_at', { ascending: true });
        
      if (error) throw error;
      setServices(data || []);
    } catch (error) {
      toast.error('Failed to fetch services');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleEdit = (service: any) => {
    setIsEditing(service.id);
    setFormData({
      id: service.id,
      title: service.title || '',
      description: service.description || '',
      icon: service.icon || 'settings',
      price_range: service.price_range || '',
    });
  };

  const handleCancel = () => {
    setIsEditing(null);
    setFormData({ id: '', title: '', description: '', icon: 'settings', price_range: '' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formDataObj = new FormData();
    if (isEditing && isEditing !== 'new') {
      formDataObj.append('id', isEditing);
    }
    formDataObj.append('title', formData.title);
    formDataObj.append('description', formData.description);
    formDataObj.append('icon', formData.icon);
    formDataObj.append('price_range', formData.price_range);

    const result = await upsertService(formDataObj);
    
    if (result.success) {
      toast.success(isEditing === 'new' ? 'Service created' : 'Service updated');
      handleCancel();
      fetchServices();
    } else {
      toast.error(result.error || 'Failed to save service');
    }
    setIsSubmitting(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this service?')) return;
    
    const result = await deleteService(id);
    if (result.success) {
      toast.success('Service deleted');
      fetchServices();
    } else {
      toast.error(result.error || 'Failed to delete service');
    }
  };

  const ICONSList = [
    { name: 'settings', component: Settings },
    { name: 'smartphone', component: Smartphone },
    { name: 'tool', component: Tool },
    { name: 'truck', component: Truck },
    { name: 'headphones', component: Headphones },
    { name: 'monitor', component: Monitor },
    { name: 'cpu', component: Cpu },
  ];

  const getIcon = (iconName: string) => {
    const icon = ICONSList.find(i => i.name === iconName);
    const IconComponent = icon?.component || Settings;
    return <IconComponent className="w-6 h-6" />;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight">Services Manager</h1>
          <p className="text-slate-400 mt-2">Manage the services displayed on your website</p>
        </div>
        <Button 
          onClick={() => setIsEditing('new')} 
          disabled={isEditing !== null}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Service
        </Button>
      </div>

      {isEditing && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">
              {isEditing === 'new' ? 'Create New Service' : 'Edit Service'}
            </h2>
            <Button variant="ghost" size="icon" onClick={handleCancel}>
              <X className="w-4 h-4" />
            </Button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Service Title</label>
                <Input 
                  value={formData.title}
                  onChange={e => setFormData({...formData, title: e.target.value})}
                  placeholder="e.g. PC Building"
                  required
                  className="bg-slate-950 border-slate-800"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Starting Price (Optional)</label>
                <Input 
                  value={formData.price_range}
                  onChange={e => setFormData({...formData, price_range: e.target.value})}
                  placeholder="e.g. LKR 5,000"
                  className="bg-slate-950 border-slate-800"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Description</label>
              <Textarea 
                value={formData.description}
                onChange={e => setFormData({...formData, description: e.target.value})}
                placeholder="Detailed description of the service..."
                required
                className="bg-slate-950 border-slate-800 min-h-[100px]"
              />
            </div>

            <div className="space-y-3">
              <label className="text-sm font-medium text-slate-300">Select Icon</label>
              <div className="flex flex-wrap gap-3">
                {ICONSList.map((icon) => {
                  const Icon = icon.component;
                  return (
                    <button
                      key={icon.name}
                      type="button"
                      onClick={() => setFormData({...formData, icon: icon.name})}
                      className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition-all ${
                        formData.icon === icon.name 
                          ? 'bg-blue-600 border-blue-500 text-white' 
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-600'
                      }`}
                    >
                      <Icon className="w-6 h-6" />
                      <span className="text-xs">{icon.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
              <Button type="button" variant="ghost" onClick={handleCancel}>Cancel</Button>
              <Button type="submit" disabled={isSubmitting} className="bg-blue-600 hover:bg-blue-700">
                {isSubmitting ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                Save Service
              </Button>
            </div>
          </form>
        </div>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map(service => (
          <div key={service.id} className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 group hover:border-blue-500/50 transition-all">
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center">
                {getIcon(service.icon)}
              </div>
              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button variant="ghost" size="icon" onClick={() => handleEdit(service)} className="h-8 w-8 text-slate-400 hover:text-white">
                  <Edit2 className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => handleDelete(service.id)} className="h-8 w-8 text-red-400 hover:text-red-300">
                  <Trash2 className="w-4 h-4" />
             </Button>
              </div>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>
            {service.price_range && (
              <span className="inline-block px-3 py-1 bg-slate-800 text-slate-300 text-xs rounded-full font-medium mb-3">
                Starting {service.price_range}
              </span>
            )}
            <p className="text-slate-400 text-sm line-clamp-3 leading-relaxed">
              {service.description}
            </p>
          </div>
        ))}
        {services.length === 0 && !isEditing && (
          <div className="col-span-full py-12 text-center border border-dashed border-slate-800 rounded-2xl">
            <Sparkles className="w-8 h-8 text-slate-600 mx-auto mb-3" />
            <h3 className="text-lg font-medium text-slate-300">No Services Found</h3>
            <p className="text-slate-500">Add your first service to display it on the website.</p>
          </div>
        )}
      </div>
    </div>
  );
}
