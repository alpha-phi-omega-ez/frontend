import { title } from "@/components/primitives";
import { Image, Link } from "@heroui/react";

const images = [
  {
    alt: "National Convention",
    img: "/images/Nationals.jpg",
  },
  {
    alt: "Overnighter",
    img: "/images/overnighter/Overnighter(15).jpg",
  },
  {
    alt: "Youth Service Day",
    img: "/images/ysd/YSD(1).jpg",
  },
  {
    alt: "Can Sorting",
    img: "/images/service_day/RPI_Service_Day(12).jpg",
  },
];

export default function DonatePage() {
  return (
    <section className="justify-center pb-4 md:pb-6">
      <div className="text-center mb-6">
        <h1 className={title()}>Why Donate?</h1>
        <p className="mt-5">
          As a non-profit service organization, our main priority is serving the
          community. Your support allows for continued outreach and assistance
          to communities and goes towards executing large-scale service projects
          such as overnighter, Youth Service Day, RPI Service Day, helps us
          attend conferences like nationals, and helps offset costs not covered
          by brother dues. Each dollar you donate goes towards our service
          program and maintaining our office.
        </p>
        <p className="mt-5">
          Without our donor&apos;s help, we couldn&apos;t do the work we do!
        </p>
        <h2 className="text-3xl font-bold mt-10">Creating an Endowment</h2>
        <p className="mt-4">
          The chapter is creating an endowment for long term financial
          stability. We are currently raising money to establish the endowment
          donations can be made through this{" "}
          <Link href="https://securelb.imodules.com/s/1225/lg22/form.aspx?sid=1225&gid=1&pgid=6795&cid=15861&dids=488.101&bledit=1&sort=1">
            link
          </Link>
          . The goal of the endowment is to reduce the financial burden of
          students joining our chapter, currently the national office charger
          new members $99 to join. The endowment will allow us to offset costs
          in the long term and reduce our dependency on dues.
        </p>
        <h2 className="text-3xl font-bold mt-10">How to Donate?</h2>
        <p className="mt-4">
          You can donate through our{" "}
          <Link href="https://www.paypal.com/paypalme/apoez">paypal</Link> or
          via check. If using check, make sure to make it out to &quot;Alpha Phi
          Omega Epsilon Zeta Chapter&quot;. Our mailing address is:
        </p>
        <p className="mt-2">C/O Rensselaer Union</p>
        <p className="mt-2">110 8th Street</p>
        <p className="mt-2">Troy, NY, 12180</p>
      </div>
      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 mt-8 mb-8">
        {images.map((item, index) => (
          <Image
            key={index}
            shadow="sm"
            width="100%"
            alt={item.alt}
            className="w-full object-cover rounded-t-lg"
            src={item.img}
          />
        ))}
      </div>
    </section>
  );
}
