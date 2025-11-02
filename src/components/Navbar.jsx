import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiMenu, FiX, FiPieChart, FiPlusCircle, FiList, FiSettings } from "react-icons/fi"; // FiSettings imported
import { useExpense } from "../context/ExpenseContext";
import { motion, AnimatePresence } from "framer-motion";

// --- COLOR PALETTE DEFINITIONS ---
const COLOR_NAVY = "#0F172A";       // Primary Base/Header
const COLOR_SKY_BLUE = "#0284C7";    // Secondary Action/Brand Accent (SpendSmart Color)
const COLOR_EMERALD = "#10B981";     // Income (Positive)
const COLOR_RED = "#E11D48";         // Expense (Negative)
const COLOR_TEXT_WHITE = "#E5E7EB";  // Primary Text Color
const COLOR_LINK_HOVER = "#1D2E4A";  // A slightly lighter navy for hover state background
// -----------------------------------

// Define the navigation links
const NAV_LINKS = [
    { to: "/", label: "Dashboard", Icon: FiPieChart },
    { to: "/add", label: "Add", Icon: FiPlusCircle },
    { to: "/transactions", label: "Transactions", Icon: FiList },
    { to: "/settings", label: "Settings", Icon: FiSettings }, // Settings link
];

const menuVariants = {
    hidden: { rotate: 0 },
    visible: { rotate: 90 },
};

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const loc = useLocation();
    const { balance } = useExpense();

    // Scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Function to create a standard navigation link component
    const navLink = (to, label, Icon, isIconOnly = false) => {
        const active = loc.pathname === to;
        const className = isIconOnly 
            ? `flex items-center justify-center p-2 rounded-md transition-all duration-300 ${active ? `bg-[${COLOR_LINK_HOVER}]` : `hover:bg-[${COLOR_LINK_HOVER}]`}` 
            : `flex items-center gap-2 px-3 py-2 rounded-md transition-all duration-300 ${active ? `bg-[${COLOR_LINK_HOVER}] font-semibold` : `hover:bg-[${COLOR_LINK_HOVER}]`}`;

        return (
            <motion.div key={to} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <Link
                    to={to}
                    onClick={() => setOpen(false)}
                    className={className}
                >
                    {/* Icon is always displayed */}
                    <Icon className="text-xl" style={{ color: active ? COLOR_SKY_BLUE : COLOR_TEXT_WHITE }} />
                    
                    {/* Text is hidden on desktop for icon-only links, shown otherwise/on mobile */}
                    {!isIconOnly && (
                        <span className="hidden sm:inline text-sm font-medium" style={{ color: active ? COLOR_SKY_BLUE : COLOR_TEXT_WHITE }}>
                            {label}
                        </span>
                    )}
                </Link>
            </motion.div>
        );
    };

    return (
        <header
            style={{
                backgroundColor: scrolled ? COLOR_NAVY : "#1d2e4a",
            }}
            className={`sticky top-0 z-50 transition-all duration-300 shadow-2xl backdrop-blur-md w-full border-b border-white/10`}
        >
            <div className="mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center w-full h-16">
                    
                    {/* Website Name - Top Left */}
                    <Link
                        to="/"
                        className="flex items-center gap-2 ml-2 sm:ml-0 hover:scale-[1.03] transition-transform duration-300"
                    >
                        {/* Logo: White icon for contrast */}
                        <div className={`flex items-center justify-center w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 p-1`}>
                            <FiPieChart className={`text-xl`} style={{ color: '#FFFFFF' }} />
                        </div>
                        <div className="flex flex-col leading-none">
                            {/* Brand Name: Sky Blue */}
                            <div className={`text-xl font-extrabold tracking-tight`}>
                                <span style={{ color: COLOR_SKY_BLUE }}>
                                    SpendSmart
                                </span>
                            </div>
                            {/* Tagline: Sky Blue */}
                            <div className={`text-[10px] italic hidden sm:block`} style={{ color: COLOR_SKY_BLUE }}>Budget • Track • Grow</div>
                        </div>
                    </Link>

                    {/* Nav Links + Balance - Top Right (Desktop) */}
                    <div className="hidden sm:flex items-center gap-6 mr-2 sm:mr-0">
                        <nav className="flex items-center gap-3">
                            {/* Standard Links */}
                            {NAV_LINKS.slice(0, 3).map(link => navLink(link.to, link.label, link.Icon))}
                            
                            {/* Settings Link: Now Icon-only on Desktop */}
                            {navLink(NAV_LINKS[3].to, NAV_LINKS[3].label, NAV_LINKS[3].Icon, true)}
                        </nav>

                        <div className="flex items-center gap-3 border-l border-white/20 pl-4">
                            {/* Balance Label: Sky Blue */}
                            <div className="text-sm" style={{ color: COLOR_SKY_BLUE }}>Balance</div>
                            {/* Balance Pill: Green/Red colors */}
                            <div
                                style={{
                                    backgroundColor: balance >= 0 ? COLOR_EMERALD : COLOR_RED,
                                }}
                                className={`px-3 py-1 rounded-md font-semibold text-white`}
                            >
                                ${balance.toFixed(2)}
                            </div>
                        </div>
                    </div>

                    {/* Mobile Balance (Always visible in the header) */}
                    <div className="flex items-center sm:hidden">
                        <div
                            style={{
                                backgroundColor: balance >= 0 ? COLOR_EMERALD : COLOR_RED,
                            }}
                            className={`px-2 py-1 mr-2 rounded-lg text-sm font-bold text-white transition-colors duration-500`}
                        >
                            ${balance.toFixed(0)}
                        </div>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <div className="sm:hidden flex justify-end mr-2">
                        <button
                            onClick={() => setOpen((v) => !v)}
                            className={`p-2 rounded-md text-white/95 hover:bg-white/10 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[${COLOR_SKY_BLUE}]`}
                            aria-label="Toggle menu"
                            aria-expanded={open}
                        >
                            {/* Framer Motion Icon Rotation */}
                            <motion.div
                                key={open ? "open" : "closed"}
                                initial="hidden"
                                animate={open ? "visible" : "hidden"}
                                variants={menuVariants}
                                transition={{ duration: 0.3 }}
                            >
                                {open ? <FiX size={24} /> : <FiMenu size={24} />}
                            </motion.div>
                        </button>
                    </div>
                </div>
            </div>

            {/* MOBILE MENU DROPDOWN - Includes Settings Link */}
            <div
                className={`sm:hidden overflow-hidden transition-all duration-500 ease-in-out ${
                    open ? "max-h-96 opacity-100 translate-y-0" : "max-h-0 opacity-0 -translate-y-3"
                }`}
            >
                {/* Mobile menu background color update */}
                <div className={`bg-[${COLOR_NAVY}]/95 backdrop-blur-md border-t border-white/10 p-3`}>
                    <div className="flex flex-col gap-2">
                        
                        {/* Map through all NAV_LINKS for mobile menu (showing text and icon) */}
                        {NAV_LINKS.map(link => (
                            <Link
                                key={link.to}
                                to={link.to}
                                onClick={() => setOpen(false)}
                                className={`flex items-center gap-3 px-3 py-2 rounded transition hover:bg-white/10 ${loc.pathname === link.to ? `bg-[${COLOR_LINK_HOVER}] font-semibold` : ''}`}
                            >
                                <link.Icon style={{ color: loc.pathname === link.to ? COLOR_SKY_BLUE : COLOR_TEXT_WHITE }} />
                                <span style={{ color: loc.pathname === link.to ? COLOR_SKY_BLUE : COLOR_TEXT_WHITE }}>{link.label}</span>
                            </Link>
                        ))}
                        

                        {/* Mobile Balance Display */}
                        <div className="mt-2 px-3 py-2 text-sm" style={{ color: COLOR_SKY_BLUE }}>
                            Balance:{" "}
                            <span
                                style={{
                                    color: balance >= 0 ? COLOR_EMERALD : COLOR_RED,
                                }}
                                className={`font-semibold`}
                            >
                                ${balance.toFixed(2)}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}