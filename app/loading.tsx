export default function Loading() {
  return (
    <div className="container mx-auto max-w-7xl px-6 pt-20 pb-8">
      <div className="animate-pulse space-y-6">
        <div className="h-10 w-72 rounded-md bg-default-200" />
        <div className="h-6 w-56 rounded-md bg-default-200" />
        <div className="grid gap-4 md:grid-cols-3">
          <div className="h-64 rounded-lg bg-default-200" />
          <div className="h-64 rounded-lg bg-default-200" />
          <div className="h-64 rounded-lg bg-default-200" />
        </div>
      </div>
    </div>
  );
}
