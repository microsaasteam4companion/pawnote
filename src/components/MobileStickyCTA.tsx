import { Link } from "react-router-dom";
import { Button } from "./ui/button";

const MobileStickyCTA = () => {
    return (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/90 backdrop-blur-lg border-t border-border md:hidden z-40 animate-fade-in shadow-[0_-4px_10px_rgba(0,0,0,0.03)] pb-safe">
            <Link to="/signup" className="w-full block">
                <Button className="w-full rounded-full text-lg font-bold shadow-sm py-6 bg-primary text-primary-foreground hover:bg-primary/90 transition-all active:scale-[0.98]">
                    Get Started
                </Button>
            </Link>
        </div>
    );
};

export default MobileStickyCTA;
