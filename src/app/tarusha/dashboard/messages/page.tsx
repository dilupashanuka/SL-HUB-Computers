import { createClient } from '@/utils/supabase/server';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mail, Trash2, CheckCircle, User, Calendar, MessageSquare } from 'lucide-react';
import { markAsRead, deleteMessage } from './actions';

export default async function MessagesPage() {
  const supabase = await createClient();
  const { data: messages } = await supabase.from('messages').select('*').order('created_at', { ascending: false });

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-extrabold tracking-tight text-white">Client Inquiries</h1>
        <p className="text-slate-400 font-medium">Manage and respond to direct messages from your customers.</p>
      </div>

      <div className="space-y-4">
        {messages?.map((msg) => (
          <Card key={msg.id} className={`bg-slate-900/40 border-white/5 backdrop-blur-md overflow-hidden ${!msg.is_read ? 'ring-1 ring-blue-500/30' : ''}`}>
            <div className="flex flex-col md:flex-row">
              {/* Message Meta */}
              <div className="p-6 md:w-80 border-b md:border-b-0 md:border-r border-white/5 bg-white/5">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                      <User className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-white truncate">{msg.name}</p>
                      <p className="text-[10px] text-slate-500 truncate font-mono">{msg.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 text-slate-400">
                    <Calendar className="w-3.5 h-3.5" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">
                      {new Date(msg.created_at).toLocaleDateString()}
                    </span>
                  </div>

                  {!msg.is_read && (
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-[9px] font-black text-blue-400 uppercase tracking-widest w-fit">
                      New Inquiry
                    </div>
                  )}
                </div>
              </div>

              {/* Message Content */}
              <div className="flex-1 p-6 relative">
                <div className="mb-4">
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-1">Subject</p>
                  <h3 className="text-white font-bold">{msg.subject || 'No Subject'}</h3>
                </div>
                <div className="mb-8">
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2">Message</p>
                  <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-wrap">
                    {msg.message}
                  </p>
                </div>

                <div className="flex items-center gap-3 md:absolute md:top-6 md:right-6">
                  {!msg.is_read && (
                    <form action={markAsRead}>
                      <input type="hidden" name="id" value={msg.id} />
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="h-9 border-white/10 text-[10px] font-bold uppercase tracking-widest hover:bg-blue-600 hover:text-white"
                      >
                        <CheckCircle className="w-3.5 h-3.5 mr-2" /> Mark Read
                      </Button>
                    </form>
                  )}
                  <form action={deleteMessage}>
                    <input type="hidden" name="id" value={msg.id} />
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-9 text-slate-500 hover:text-red-400 hover:bg-red-400/10"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </Card>
        ))}
        {!messages?.length && (
          <div className="py-20 text-center border-2 border-dashed border-white/5 rounded-3xl">
            <Mail className="w-12 h-12 text-slate-700 mx-auto mb-4" />
            <p className="text-slate-500 font-medium tracking-tight">Your inbox is clear. No client inquiries at the moment.</p>
          </div>
        )}
      </div>
    </div>
  );
}
