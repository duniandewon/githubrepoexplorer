import { Star } from "lucide-react";

import { Repository } from "@/types";

export function Repository({ repo }: { repo: Repository }) {
    return (
        <div className="w-full border rounded-b-md p-2">
            <div className="grid grid-cols-2">
                <h2 className="font-bold">{repo.title}</h2>
                <div className=" flex items-center gap-1.5 justify-self-end">
                    <p>{repo.star}</p>
                    <Star size={14} fill="#fff" />
                </div>
                <p>{repo.description}</p>
            </div>
        </div>
    )
}