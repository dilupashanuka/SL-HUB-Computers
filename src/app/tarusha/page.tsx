import { login } from './actions';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function AdminLoginPage() {
  return (
    <div className="relative flex min-h-[calc(100vh-160px)] items-center justify-center py-24 px-4 sm:px-6 lg:px-8 bg-slate-950 overflow-hidden">
      {/* Background with overlay */}
      <div className="absolute inset-0 z-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 mix-blend-multiply" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center" />
      </div>

      <Card className="w-full max-w-md relative z-10 border-white/10 bg-black/20 backdrop-blur-2xl shadow-2xl text-white">
        <CardHeader className="space-y-2 text-center pb-8">
          <CardTitle className="text-3xl font-extrabold tracking-tight text-white">Admin Login</CardTitle>
          <CardDescription className="text-slate-400">
            Enter your credentials to access the secure dashboard
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-300 font-medium">Email Address</Label>
              <Input 
                id="email" 
                name="email" 
                type="email" 
                placeholder="admin@slhub.com" 
                required 
                className="bg-white/10 border-white/10 text-white placeholder:text-slate-500 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-slate-300 font-medium">Password</Label>
              <Input 
                id="password" 
                name="password" 
                type="password" 
                required 
                className="bg-white/10 border-white/10 text-white focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <Button 
              formAction={login} 
              className="w-full mt-8 h-12 bg-blue-600 hover:bg-blue-500 text-white font-bold text-lg rounded-lg shadow-lg shadow-blue-900/20 transition-all transform hover:scale-[1.02] active:scale-[0.98]" 
              type="submit"
            >
              Sign In to Dashboard
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

