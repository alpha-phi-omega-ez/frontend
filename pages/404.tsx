import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import { Button, Link } from "@nextui-org/react";

export default function RecruitmentPage() {
  return (
    <DefaultLayout>
      <section className="justify-center items-center h-full">
        <div className="text-center">
          <h1 className="text-9xl font-bold">404 Not Found</h1>
        </div>
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
