import DefaultLayout from "@/layouts/default";
import Error from "@/components/error";

export default function LoginErrorPage() {
  return (
    <DefaultLayout>
      <Error title="Error logging in" />
    </DefaultLayout>
  );
}
