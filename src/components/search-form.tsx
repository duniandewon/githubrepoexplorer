import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from 'zod'

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
    search: z.string().min(3, {
        message: "Search must be at least 3 characters long",
    }),
})

export interface SearchForm {
    onSubmit(values: z.infer<typeof formSchema>): void
}

export function SearchForm({ onSubmit }: SearchForm) {


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            search: ""
        }
    })

    const handleSubmit = (data: z.infer<typeof formSchema>) => {
        onSubmit(data);
        form.reset()
      };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="search"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Search a user</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter username" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" className="w-full" disabled={!form.formState.isDirty}>Search</Button>
            </form>
        </Form>
    )
}