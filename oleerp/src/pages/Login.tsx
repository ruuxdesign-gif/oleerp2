import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import logoOle from '@/assets/logo-ole.png';
import './Login.css'; // Import the CSS file

const loginSchema = z.object({
  email: z.string().email('E-mail inválido'),
  password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
  rememberMe: z.boolean().default(false),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  const handleLogin = async (data: LoginFormInputs) => {
    console.log('Iniciando handleLogin com dados:', data);
    setLoading(true);
    setError(null);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log('Simulação de API concluída.');

      if (data.email === 'test@example.com' && data.password === 'password123') {
        console.log('Login bem-sucedido!');
        toast.success('Login bem-sucedido!', {
          description: 'Você será redirecionado para o dashboard.',
        });
        navigate('/dashboard'); // Redirect to a dashboard or home page
      } else {
        console.log('Credenciais inválidas.');
        setError('Credenciais inválidas. Por favor, tente novamente.');
        toast.error('Erro de Login', {
          description: 'Credenciais inválidas.',
        });
      }
    } catch (err) {
      console.error('Erro durante o login:', err);
      setError('Ocorreu um erro. Por favor, tente novamente mais tarde.');
      toast.error('Erro', {
        description: 'Ocorreu um erro inesperado.',
      });
    } finally {
      setLoading(false);
      console.log('handleLogin finalizado.');
    }
  };

  const handleForgotPassword = () => {
    toast.info('Esqueceu a senha?', {
      description: 'Funcionalidade de recuperação de senha em desenvolvimento.',
    });
    // Implement navigation to forgot password page
  };

  const handleCreateAccount = () => {
    toast.info('Criar conta', {
      description: 'Funcionalidade de criação de conta em desenvolvimento.',
    });
    // Implement navigation to registration page
  };

  return (
    <div className="login-container">
      <div className="shape-blur-1"></div>
      <div className="shape-blur-2"></div>
      <div className="login-card">
        <div className="login-header">
          <img src={logoOle} alt="Olé ERP Logo" className="login-logo" />
          <h1 className="login-title">Bem-vindo de volta!</h1>
          <p className="login-subtitle">Faça login na sua conta para continuar</p>
        </div>
        <form onSubmit={handleSubmit(handleLogin, (errors) => console.error(errors))} className="login-form">
          <div className="form-group">
            <Label htmlFor="email">E-mail</Label>
            <Input
              id="email"
              type="email"
              placeholder="seu@email.com"
              {...register('email')}
              className={errors.email ? 'input-error' : ''}
            />
            {errors.email && <p className="error-message">{errors.email.message}</p>}
          </div>
          <div className="form-group">
            <Label htmlFor="password">Senha</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              {...register('password')}
              className={errors.password ? 'input-error' : ''}
            />
            {errors.password && <p className="error-message">{errors.password.message}</p>}
          </div>
          <div className="flex items-center justify-between mt-4 mb-6">
            <div className="flex items-center space-x-2">
              <Controller
                name="rememberMe"
                control={control}
                render={({ field }) => (
                  <Checkbox
                    id="rememberMe"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
              <Label htmlFor="rememberMe">Lembrar-me</Label>
            </div>
            <Button variant="link" type="button" onClick={handleForgotPassword} className="text-sm text-primary hover:underline">
              Esqueceu a senha?
            </Button>
          </div>
          {error && <p className="error-message text-center mb-4">{error}</p>}
          <Button type="submit" className="w-full login-button" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Entrando...
              </>
            ) : (
              'Entrar'
            )}
          </Button>
        </form>
        <p className="login-signup-text">
          Não tem uma conta?{' '}
          <Button variant="link" onClick={handleCreateAccount} className="p-0 h-auto text-primary hover:underline">
            Crie uma
          </Button>
        </p>
      </div>
    </div>
  );
};

export default Login;