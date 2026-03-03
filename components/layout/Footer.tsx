export function Footer() {
  return (
    <footer className="border-t border-border px-4 py-4 lg:px-6">
      <p className="text-xs text-muted-foreground">
        &copy; {new Date().getFullYear()} Zero One Creative. Zero One Handbook
        v1.2.0
      </p>
    </footer>
  );
}
