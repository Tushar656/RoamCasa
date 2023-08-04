"use client"

import { useRouter } from "next/navigation";
import Heading from "./Heading";
import Button from "./Button";

interface EmptyStateProps {
    title?: string;
    subtitle?: string;
    showReset?: boolean;
}

const EmptyState: React.FC<EmptyStateProps> = ({
    title = "No exect matches",
    subtitle = "Tru changing or removing some of your filters", 
    showReset
}) => {
    const router = useRouter();

  return (
    <div className="h-[60vh] flex flex-col gap-2 justify-center items-center">
        <Heading
            center
            title={title}
            subtitle={subtitle}
        />
        <div>
            {showReset && (
                <Button
                    outline
                    label="Remove all filters"
                    onClick={() => router.push('/')}
                />
            )}
        </div>
    </div>
  )
}

export default EmptyState
