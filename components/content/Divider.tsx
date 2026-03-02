export function Divider() {
  return (
    <div className="my-12 flex items-center justify-center" role="separator">
      <div className="h-px flex-1 bg-border" />
      <div className="mx-4 size-1.5 rounded-full bg-muted-foreground/30" />
      <div className="h-px flex-1 bg-border" />
    </div>
  );
}
