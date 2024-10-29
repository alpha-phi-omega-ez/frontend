import DefaultLayout from "@/layouts/default";
import { Image, Button, Link } from "@nextui-org/react";

export default function ErrorPage(title: string) {
  return (
    <DefaultLayout>
      <section className="justify-center pb-4 md:pb-6">
        <div className="text-center mb-10">
          <h1 className="text-9xl font-bold">{title}</h1>
        </div>
        <Image
          width="100%"
          alt="Error logging in"
          className="w-1/2 mx-auto"
          src="/images/glump-confused.png"
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
    </DefaultLayout>
  );
}
