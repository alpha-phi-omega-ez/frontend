import {
  Button,
  Link,
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
  Card,
} from "@heroui/react";
import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import { ChevronDown, Logo } from "@/components/icons";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";

export const Navbar = () => {
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  const { auth } = useAuth();
  const isAuthenticated = auth.isAuthenticated;
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const handleLogin = () => {
    const currentPath = encodeURIComponent(router.asPath);
    router.push(`/login?redirect=${currentPath}`);
  };

  return (
    <NextUINavbar
      maxWidth="xl"
      position="sticky"
      className="main-blue-background main-white-font"
    >
      <NavbarContent className="hidden sm:flex">
        <NavbarBrand>
          <Link href="/" className="no-hover">
            <Logo height={50} width={300} />
          </Link>
        </NavbarBrand>
        {siteConfig.navItems.map((item) => (
          <div
            key={item.item}
            className="relative group"
            onMouseEnter={() => setOpenDropdown(item.item)}
            onMouseLeave={() => setOpenDropdown(null)}
          >
            <NavbarItem>
              <Button
                disableRipple
                className="p-0 bg-transparent data-[hover=true]:bg-transparent main-white-font text-lg"
                endContent={<ChevronDown fill="currentColor" size={16} />}
                radius="sm"
                variant="light"
              >
                {item.item}
              </Button>
            </NavbarItem>

            {/* Dropdown menu */}
            {openDropdown === item.item && (
              <Card className="absolute top-full left-0 py-2 shadow-lg z-50 rounded-md w-max min-w-[200px]">
                {item.sublinks.map((sublink) => (
                  <a
                    key={sublink.href}
                    href={sublink.href}
                    className="py-2 px-4 text-base hover:bg-gray-600 whitespace-nowrap"
                  >
                    {sublink.label}
                  </a>
                ))}
              </Card>
            )}
          </div>
        ))}
        {isAuthenticated && (
          <div
            key="admin"
            className="relative group"
            onMouseEnter={() => setOpenDropdown("admin")}
            onMouseLeave={() => setOpenDropdown(null)}
          >
            <NavbarItem>
              <Button
                disableRipple
                className="p-0 bg-transparent data-[hover=true]:bg-transparent main-white-font text-lg"
                endContent={<ChevronDown fill="currentColor" size={16} />}
                radius="sm"
                variant="light"
              >
                Admin
              </Button>
            </NavbarItem>

            {/* Dropdown menu */}
            {openDropdown === "admin" && (
              <Card className="absolute top-full left-0 py-2 shadow-lg z-50 rounded-md w-max min-w-[200px]">
                {siteConfig.adminNavItems.map((sublink) => (
                  <a
                    key={sublink.href}
                    href={sublink.href}
                    className="py-2 px-4 text-base hover:bg-gray-600 whitespace-nowrap"
                  >
                    {sublink.label}
                  </a>
                ))}
              </Card>
            )}
          </div>
        )}
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <ThemeSwitch />
        <NavbarItem>
          <Button
            className="data-[active=true]:text-primary data-[active=true]:font-medium main-gold-background main-blue-color main-black-font font-bold"
            onPress={() => {
              if (isAuthenticated) {
                router.push("/logout");
              } else {
                handleLogin();
              }
            }}
            variant="flat"
          >
            {isAuthenticated ? "Logout" : "Login"}
          </Button>
        </NavbarItem>
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-2">
          <ThemeSwitch />
          <Button
            className="data-[active=true]:text-primary data-[active=true]:font-medium main-gold-background main-blue-color main-black-font font-bold"
            onPress={() => {
              if (isAuthenticated) {
                router.push("/logout");
              } else {
                handleLogin();
              }
            }}
            variant="flat"
          >
            {isAuthenticated ? "Logout" : "Login"}
          </Button>
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig.navItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`} className="mb-4">
              {item.sublinks.map((sublink) => (
                <Link
                  key={sublink.href}
                  href={sublink.href}
                  size="lg"
                  className="mr-1 px-2 text-base hover:bg-gray-600 rounded-md"
                >
                  {sublink.label}
                </Link>
              ))}
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </NextUINavbar>
  );
};
