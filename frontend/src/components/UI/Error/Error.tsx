import { CircleAlert } from "lucide-react"

interface ErrorProps extends React.ComponentPropsWithoutRef<"div"> {
    errorMessage?: string
}

function Error({ className, errorMessage, ...props }: ErrorProps) {
  return (
    <div
      role="alert"
      data-slot="error"
      className={[
        "inline-flex min-h-5 items-center gap-2 text-sm font-medium text-destructive",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      <CircleAlert
        aria-hidden="true"
        className="size-4 shrink-0 drop-shadow-[0_0_6px_color-mix(in_oklch,var(--destructive)_55%,transparent)]"
      />
      <span>{errorMessage ? errorMessage : null}</span>
    </div>
  )
}

export { Error }
