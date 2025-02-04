import { Button, Link } from "@heroui/react";
import { Image } from "@heroui/react";

export default function RecruitmentPage() {
  return (
    <section className="justify-center items-center h-full">
      <div className="text-center mb-10">
        <h1 className="text-9xl font-bold">404 Not Found</h1>
      </div>
      <Image
        width="100%"
        alt="404 Not Found, Glump on toilet"
        className="w-1/2 mx-auto"
        src="/images/glump-toilet.png"
      />
      <div className="flex justify-center mt-12 mb-8">
        <Button
          as={Link}
          className="p-8 text-xl main-blue-background main-gold-color"
          href="/"
          variant="flat"
        >
          Home
        </Button>
      </div>
    </section>
  );
}
