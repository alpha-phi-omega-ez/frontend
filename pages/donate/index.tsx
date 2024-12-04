import { title } from "@/components/primitives";
import { Image, Link } from "@nextui-org/react";

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
          Without our donor's help, we couldn't do the work we do!
        </p>
        <h2 className="text-3xl font-bold mt-10">How to Donate?</h2>
        <p className="mt-4">
          You can donate through our{" "}
          <Link href="https://www.paypal.com/paypalme/apoez">paypal</Link> or
          via check. If using check, make sure to make it out to "Alpha Phi
          Omega Epsilon Zeta Chapter". Our mailing address is:
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
