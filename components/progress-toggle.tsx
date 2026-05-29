"use client";

import { CheckCircle2 } from "lucide-react";
import { useState, useTransition } from "react";
import { Button } from "./ui/button";

export function ProgressToggle({
  lessonId,
  initialCompleted
}: {
  lessonId: string;
  initialCompleted: boolean;
}) {
  const [completed, setCompleted] = useState(initialCompleted);
  const [isPending, startTransition] = useTransition();

  function updateProgress() {
    const nextValue = !completed;
    setCompleted(nextValue);
    startTransition(async () => {
      const response = await fetch("/api/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lessonId, isCompleted: nextValue })
      });

      if (!response.ok) {
        setCompleted(!nextValue);
      }
    });
  }

  return (
    <Button type="button" variant={completed ? "secondary" : "primary"} onClick={updateProgress} disabled={isPending} className="gap-2">
      <CheckCircle2 className="h-4 w-4" />
      {completed ? "Completed" : "Mark complete"}
    </Button>
  );
}
