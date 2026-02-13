import { Link } from "react-router-dom";
import PawIcon from "./PawIcon";

const Footer = () => {
  return (
    <footer className="w-full px-6 md:px-12 py-12 md:py-20 bg-primary/5 border-t border-border/50">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 md:gap-8">

          {/* Column 1: Brand & Community (Takes up 2 cols on wide screens) */}
          <div className="md:col-span-2 flex flex-col items-start gap-6">
            <div className="flex items-center gap-2">
              <PawIcon size="lg" variant="brown" />
              <span className="text-2xl font-bold text-foreground">PawNote</span>
            </div>
            <p className="text-muted-foreground text-base max-w-sm leading-relaxed">
              Never forget what the vet said. Turn vet visits into actionable care plans.
            </p>

            <div className="flex flex-col gap-3 mt-4">
              <span className="text-sm font-semibold text-foreground">Community</span>
              <div className="flex items-center gap-4">
                <a href="https://www.instagram.com/entrext.labs" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
                </a>
                <a href="https://discord.com/invite/ZZx3cBrx2" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path d="M18.93 5.34a16.89 16.89 0 0 0-4.07-1.23.06.06 0 0 0-.07.03c-.18.31-.38.72-.52 1.04a15.72 15.72 0 0 0-4.54 0c-.14-.32-.35-.73-.53-1.04a.06.06 0 0 0-.07-.03 16.84 16.84 0 0 0-4.07 1.23.06.06 0 0 0-.03.02C2.1 9.42 1.26 13.38 1.68 17.29a.07.07 0 0 0 .03.05 16.94 16.94 0 0 0 5.02 2.47.06.06 0 0 0 .07-.02c.39-.52.74-1.06 1.04-1.64a.06.06 0 0 0-.03-.09 11.12 11.12 0 0 1-1.56-.73.06.06 0 0 1-.01-.1c.1-.08.21-.16.31-.24a.06.06 0 0 1 .07-.01c3.27 1.46 6.81 1.46 10.04 0a.06.06 0 0 1 .07.01c.1.08.21.16.31.24a.06.06 0 0 1 0 .1c-.5.28-1.02.53-1.56.73a.06.06 0 0 0-.04.09c.3.58.66 1.12 1.04 1.64a.06.06 0 0 0 .07.02 16.9 16.9 0 0 0 5.02-2.47.06.06 0 0 0 .03-.05c.5-5.05-.84-9.44-3.55-13.32a.05.05 0 0 0-.02-.03zM8.68 14.56c-1.18 0-2.15-1.06-2.15-2.36s.95-2.36 2.15-2.36c1.21 0 2.17 1.07 2.15 2.36 0 1.3-.95 2.36-2.15 2.36 zm7.94 0c-1.18 0-2.15-1.06-2.15-2.36s.95-2.36 2.15-2.36c1.21 0 2.17 1.07 2.15 2.36 0 1.3-.94 2.36-2.15 2.36z" /></svg>
                </a>
                <a href="https://www.linkedin.com/company/entrext/" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>
                </a>
                <a href="https://entrextlabs.substack.com/subscribe" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path d="M4 4h16M4 8h16M4 12l8 6 8-6M4 20h16" /></svg>
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Product */}
          <div className="flex flex-col gap-6">
            <h3 className="font-bold text-lg text-foreground">Product</h3>
            <div className="flex flex-col gap-4 text-muted-foreground">
              <Link to="/" className="hover:text-primary transition-colors">Why it works</Link>
              <a href="#features" className="hover:text-primary transition-colors">How It Works</a>
              <a href="#pricing" className="hover:text-primary transition-colors">Pricing</a>
              <Link to="/blog" className="hover:text-primary transition-colors">Blog</Link>
              <Link to="/faq" className="hover:text-primary transition-colors">FAQ</Link>
            </div>
          </div>

          {/* Column 3: Legal */}
          <div className="flex flex-col gap-6">
            <h3 className="font-bold text-lg text-foreground">Legal</h3>
            <div className="flex flex-col gap-4 text-muted-foreground text-sm">
              <Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
            </div>
          </div>

          {/* Column 4: Contact */}
          <div className="flex flex-col gap-6">
            <h3 className="font-bold text-lg text-foreground">Contact Us</h3>
            <div className="flex flex-col gap-4 text-muted-foreground text-sm">
              <a href="mailto:business@entrext.in" className="hover:text-primary transition-colors break-all">
                business@entrext.in
              </a>
              <a href="https://linktr.ee/entrext.pro" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">
                Support Center
              </a>
            </div>
          </div>

        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-border/30 w-full text-center md:text-left">
          <p className="text-sm text-muted-foreground/60">
            © 2026 PawNote. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
