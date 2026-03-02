"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
    TooltipProvider,
} from "@/components/ui/tooltip"

export function BackButton() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link href="/">
            <Button
              size="icon"
              variant="outline"
              className="rounded-full
              backdrop-blur-md
              bg-background/70
              hover:scale-110
              transition-all
              duration-300"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
        </TooltipTrigger>
        <TooltipContent>
          Back to Home
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}