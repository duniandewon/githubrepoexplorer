import { User } from "@/types";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Repository } from "@/components/repository";

export function UsersList({ users }: { users: User[] }) {
    return (
        <Accordion type="single" collapsible className="w-full">
            {
                users.map(user => (
                    <AccordionItem key={user.id} value={user.username}>
                        <AccordionTrigger>{user.username}</AccordionTrigger>
                        <AccordionContent className='grid grid-cols-[repeat(auto-fill,_minmax(300px,_1fr))] gap-4'>
                            {user.repositories.map(repo => (
                                <Repository key={repo.id} repo={repo} />
                            ))}
                        </AccordionContent>
                    </AccordionItem>
                ))
            }
        </Accordion>
    )
}