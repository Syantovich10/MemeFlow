function Loader({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      role="status"
      aria-label="Loading"
      data-slot="loader"
      className={["inline-flex h-5 items-center gap-1", className]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {Array.from({ length: 3 }).map((_, index) => (
        <span
          key={index}
          aria-hidden="true"
          className="flow-pulse-dot size-1.5 rotate-45 rounded-[2px]"
        />
      ))}
    </span>
  )
}

export { Loader }
