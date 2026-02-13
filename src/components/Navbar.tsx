import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import PawIcon from "./PawIcon";
import { Button } from "./ui/button";
import { useAuth } from "@/hooks/useAuth";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";

const Navbar = () => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isHome = location.pathname === "/";

  const MobileLink = ({ href, to, children }: { href?: string; to?: string; children: React.ReactNode }) => {
    if (to) {
      return (
        <Link
          to={to}
          className="text-lg font-medium text-foreground py-2 block w-full hover:text-primary transition-colors"
          onClick={() => setIsOpen(false)}
        >
          {children}
        </Link>
      );
    }
    return (
      <a
        href={href}
        className="text-lg font-medium text-foreground py-2 block w-full hover:text-primary transition-colors"
        onClick={() => setIsOpen(false)}
      >
        {children}
      </a>
    );
  };

  return (
    <nav className="w-full py-4 px-6 md:px-8 bg-background/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <PawIcon size="md" variant="brown" />
          <span className="text-xl font-bold text-foreground">PawNote</span>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors font-medium">
            Home
          </Link>
          <a href={isHome ? "#features" : "/#features"} className="text-muted-foreground hover:text-foreground transition-colors font-medium">
            How it works
          </a>
          <a href={isHome ? "#pricing" : "/#pricing"} className="text-muted-foreground hover:text-foreground transition-colors font-medium">
            Pricing
          </a>
          <Link to="/blog" className="text-muted-foreground hover:text-foreground transition-colors font-medium">
            Blog
          </Link>
        </div>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <Link to="/dashboard">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-6 font-semibold">
                Dashboard
              </Button>
            </Link>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost" className="text-foreground hover:bg-secondary rounded-full px-5 font-semibold">
                  Log in
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-6 font-semibold">
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="h-10 w-10">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[80vw] sm:w-[350px] p-6">
              <SheetHeader>
                <SheetTitle className="text-left flex items-center gap-2">
                  <PawIcon size="sm" variant="brown" />
                  PawNote
                </SheetTitle>
                <SheetDescription className="sr-only">
                  Navigation menu for mobile devices
                </SheetDescription>
              </SheetHeader>
              <div className="flex flex-col gap-6 mt-6">
                <MobileLink to="/">Home</MobileLink>
                <MobileLink href={isHome ? "#features" : "/#features"}>How it works</MobileLink>
                <MobileLink href={isHome ? "#pricing" : "/#pricing"}>Pricing</MobileLink>
                <MobileLink to="/blog">Blog</MobileLink>



                <div className="h-px bg-border my-2" />

                {user ? (
                  <MobileLink to="/dashboard">Dashboard</MobileLink>
                ) : (
                  <div className="flex flex-col gap-3">
                    <MobileLink to="/login">Log in</MobileLink>
                    <MobileLink to="/signup">Sign up</MobileLink>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
