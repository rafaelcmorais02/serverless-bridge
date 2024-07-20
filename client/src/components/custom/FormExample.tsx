import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from '@/components/ui/card';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
    firstName: z
        .string()
        .min(2, {
            message: 'Seu nome deve ter no mínimo 2 caracteres',
        })
        .refine((val) => isNaN(Number(val)), {
            message: 'Somente texto é permitido',
        }),
    lastName: z
        .string()
        .min(2, {
            message: 'Seu último nome deve ter no mínimo 2 caracteres',
        })
        .refine((val) => isNaN(Number(val)), {
            message: 'Somente texto é permitido',
        }),
    phone: z
        .string()
        .length(11, {
            message: 'O número de telefone deve ter exatamente 11 dígitos',
        })
        .regex(/^\d+$/, {
            message: 'O número de telefone deve conter apenas dígitos',
        }),
    email: z.string().email({ message: 'Endereço de email inválido' }),
});

export const FormExample = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstName: '',
            lastName: '',
            phone: '',
            email: '',
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values);
    }

    return (
        <div className="flex justify-center items-center text-xl">
            <Card className="mt-10 w-2/3">
                <CardHeader>
                    <CardTitle>Exemplo de formulário</CardTitle>
                    <CardDescription>
                        O formulário a seguir não irá persistir seus dados
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-3"
                        >
                            <FormField
                                control={form.control}
                                name="firstName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Primeiro nome</FormLabel>
                                        <FormControl>
                                            <Input type="text" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="lastName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Último nome</FormLabel>
                                        <FormControl>
                                            <Input type="text" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="phone"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Telefone</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="tel"
                                                autoComplete="off"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                autoComplete="off"
                                                type="email"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit">Registrar</Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
};

export default FormExample;
