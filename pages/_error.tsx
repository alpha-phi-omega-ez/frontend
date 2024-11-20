import { Image, Button, Link } from "@nextui-org/react";

export default function Error({ title }: { title: string }) {
  return (
    <div className="mb-10">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold">{title}</h2>
      </div>
      <Image
        width="100%"
        alt="Error logging in"
        className="w-1/3 mx-auto"
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
    </div>
  );
}
