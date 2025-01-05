import { Image, Button } from "@nextui-org/react";
import { useRouter } from "next/router";

export default function Error({ title }: { title: string }) {
  const router = useRouter();

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
          onPress={() => {
            router.push("/logout");
          }}
          className="p-8 text-xl main-blue-background main-gold-color"
          variant="flat"
        >
          Home
        </Button>
      </div>
    </div>
  );
}
