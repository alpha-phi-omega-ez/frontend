import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <section className="justify-center items-center h-full">
      <div className="text-center mb-10">
        <h1 className="text-9xl font-bold">404 Not Found</h1>
      </div>
      <Image
        width={1200}
        height={900}
        alt="404 Not Found, Glump on toilet"
        className="w-1/2 mx-auto"
        src="/images/glump-toilet.png"
      />
      <div className="flex justify-center mt-12 mb-8">
        <Link
          className="p-8 text-xl main-blue-background main-gold-color rounded-xl"
          href="/"
        >
          Home
        </Link>
      </div>
    </section>
  );
}
