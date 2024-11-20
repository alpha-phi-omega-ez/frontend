import DefaultLayout from "@/layouts/default";
import ErrorPage from "../../_error";

export default function LoginErrorPage() {
  return (
    <DefaultLayout>
      <ErrorPage title="Error logging in" />
    </DefaultLayout>
  );
}
