import { title } from "@/components/primitives";
import { Card, Link } from "@nextui-org/react";

const national_policies = [
  {
    title: "Risk Management Policy",
    link: "https://apo.org/resources/risk-management-policy/",
  },
  {
    title: "Bylaws",
    link: "https://apo.org/resources/national-bylaws/",
  },
  {
    title: "Certificate of Insurance",
    link: "https://apo.org/resources/apo-certificate-of-insurance/",
  },
];

export default function PoliciesPage() {
  return (
    <section className="justify-center pb-4 md:pb-6">
      <div className="text-center">
        <h1 className={title()}>Chapter Bylaws & Constitution</h1>
      </div>
      <div className="gap-5 grid sm:grid-cols-1 md:grid-cols-2 my-5">
        <Card>
          <iframe
            src="/pdfs/Chapter_Bylaws.pdf#toolbar=0"
            width="100%"
            height="550px"
            className="rounded-lg"
          />
        </Card>
        <Card>
          <iframe
            src="/pdfs/Chapter_Constitution.pdf#toolbar=0"
            width="100%"
            height="550px"
            className="rounded-lg"
          />
        </Card>
      </div>
      <section className="justify-center pb-4 md:pb-6">
        <div className="text-center mt-5">
          <h1 className={title()}>Chapter Risk Management</h1>
        </div>
        <Card className="mt-4">
          <iframe
            src="/pdfs/Risk_Managament.pdf#toolbar=0"
            width="100%"
            height="550px"
            className="rounded-lg"
          />
        </Card>
      </section>
      <section className="justify-center pb-4 md:pb-6">
        <div className="text-center mt-5">
          <h1 className={title()}>National Policies</h1>
        </div>
        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-4">
          {national_policies.map((policy, index) => (
            <Card key={index} className="p-4">
              <Link href={policy.link} target="_blank">
                {policy.title}
              </Link>
            </Card>
          ))}
        </div>
      </section>
    </section>
  );
}
