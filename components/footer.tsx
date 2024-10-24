// app/footer.tsx

// Import necessary modules
import Link from "next/link";
import {
  DiscordIcon,
  FacebookIcon,
  InstagramIcon,
  RedditIcon,
  TikTokIcon,
  TwitchIcon,
  TwitterIcon,
  YoutubeIcon,
} from "./icons";

// Define the Footer component
export const Footer = () => {
  return (
    <footer className="main-blue-background py-8 text-center main-white-font">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-2">
          Alpha Phi Omega Epsilon Zeta Chapter
        </h2>
        <p className="text-base main-gold-font mb-2 md:mb-4">
          Leadership, Friendship, Service
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="mb-2">
            <h3 className="text-lg font-semibold mb-1">Email</h3>
            <Link href="mailto:contact@apoez.org">contact@apoez.org</Link>
          </div>
          <div className="mb-2">
            <h3 className="text-lg font-semibold mb-2">Follow Us</h3>
            <div className="flex justify-center gap-2">
              <Link href="https://discord.gg/gdj472abUP" target="_blank">
                <DiscordIcon />
              </Link>
              <Link href="https://twitter.com/apoepsilonzeta" target="_blank">
                <TwitterIcon />
              </Link>
              <Link href="https://www.twitch.tv/apoez_rpi" target="_blank">
                <TwitchIcon />
              </Link>
              <Link href="https://www.facebook.com/APOatRPI" target="_blank">
                <FacebookIcon />
              </Link>
              <Link href="https://www.instagram.com/apoez_rpi/" target="_blank">
                <InstagramIcon />
              </Link>
              <Link
                href="https://www.youtube.com/@alphaphiomegaez9224"
                target="_blank"
              >
                <YoutubeIcon />
              </Link>
              <Link
                href="https://www.tiktok.com/@apo.epsilon.zeta"
                target="_blank"
              >
                <TikTokIcon />
              </Link>
              <Link href="https://www.reddit.com/user/apo_ez/" target="_blank">
                <RedditIcon />
              </Link>
            </div>
          </div>
          <div className="mb-2">
            <h3 className="text-lg font-semibold mb-1">Phone Number</h3>
            <Link href="tel:518-276-6516">(518) 276-6516</Link>
          </div>
          <div className="mb-2">
            <h3 className="text-lg font-semibold mb-1">Donate</h3>
            <ul className="list-none">
              <li>
                <Link
                  href="https://www.paypal.com/paypalme/apoez"
                  target="_blank"
                >
                  PayPal
                </Link>
              </li>
              <li>
                <p>Check</p>
              </li>
            </ul>
          </div>
          <div className="mb-2">
            <h3 className="text-lg font-semibold mb-1">Address</h3>
            <p>110 8th St</p>
            <p>Troy NY, 12180</p>
          </div>
          <div className="mb-2">
            <h3 className="text-lg font-semibold mb-1">Find us on Campus!</h3>
            <p>Union Room 3420</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
