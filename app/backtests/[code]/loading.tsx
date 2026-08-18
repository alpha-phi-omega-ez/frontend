export default function CourseCodeLoading() {
  return (
    <section className="justify-center pb-4 md:pb-6">
      <div className="animate-pulse space-y-6">
        <div className="mx-auto h-10 w-48 rounded-md bg-default-200" />
        <div className="h-10 w-72 rounded-md bg-default-200" />
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="h-16 rounded-lg bg-default-200" />
          ))}
        </div>
      </div>
    </section>
  );
}
