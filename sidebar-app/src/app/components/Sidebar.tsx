"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Variants } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import {
  Bell,
  Briefcase,
  CalendarRange,
  ChevronLeft,
  ChevronRight,
  Gauge,
  Home,
  MessageCircle,
  Settings,
  Users
} from "lucide-react";

type NavItem = {
  label: string;
  description: string;
  icon: LucideIcon;
  badge?: string;
};

const navItems: NavItem[] = [
  { label: "Overview", description: "Realtime analytics dashboard", icon: Home, badge: "Live" },
  { label: "Projects", description: "Track progress & velocity", icon: Briefcase, badge: "12" },
  { label: "Teams", description: "Collaborate with squads", icon: Users },
  { label: "Timeline", description: "Plan sprints & releases", icon: CalendarRange },
  { label: "Messages", description: "Stay in sync", icon: MessageCircle, badge: "5" },
  { label: "Insights", description: "Performance breakdown", icon: Gauge },
  { label: "Notifications", description: "System level updates", icon: Bell },
  { label: "Settings", description: "Automation & preferences", icon: Settings }
];

const panelVariants: Variants = {
  open: {
    width: 280,
    transition: { type: "spring" as const, stiffness: 140, damping: 16 }
  },
  closed: {
    width: 92,
    transition: { type: "spring" as const, stiffness: 200, damping: 22 }
  }
};

const highlightVariants: Variants = {
  enter: {
    opacity: 1,
    x: 0,
    transition: { type: "spring" as const, stiffness: 250, damping: 18 }
  },
  exit: { opacity: 0, x: -20, transition: { duration: 0.12 } }
};

const NavItemCard = ({
  item,
  active,
  expanded,
  onSelect
}: {
  item: NavItem;
  active: boolean;
  expanded: boolean;
  onSelect: () => void;
}) => {
  const Icon = item.icon;

  return (
    <button
      onClick={onSelect}
      className="nav-item"
      aria-pressed={active}
      title={!expanded ? item.label : undefined}
    >
      <motion.div
        layout
        className="nav-item__inner"
        animate={{ backgroundColor: active ? "rgba(59,130,246,0.12)" : "transparent" }}
        transition={{ duration: 0.2 }}
      >
        <motion.span layout className="nav-item__icon">
          <Icon strokeWidth={1.8} />
        </motion.span>

        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              key="label"
              className="nav-item__content"
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.16 }}
            >
              <span className="nav-item__title">{item.label}</span>
              <span className="nav-item__description">{item.description}</span>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence initial={false}>
          {expanded && item.badge && (
            <motion.span
              key="badge"
              className="nav-item__badge"
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.6, opacity: 0 }}
              transition={{ type: "spring", stiffness: 280, damping: 16 }}
            >
              {item.badge}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </button>
  );
};

const SidebarHeader = ({ expanded }: { expanded: boolean }) => (
  <motion.div
    layout
    className="sidebar__header"
    initial={false}
    animate={{ justifyContent: expanded ? "space-between" : "center" }}
  >
    <AnimatePresence initial={false}>
      {expanded && (
        <motion.div
          key="title"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.24, ease: [0.22, 0.61, 0.36, 1] }}
        >
          <p className="sidebar__title">Pulse OS</p>
          <span className="sidebar__subtitle">Navigation</span>
        </motion.div>
      )}
    </AnimatePresence>
  </motion.div>
);

const SidebarFooter = ({ expanded }: { expanded: boolean }) => (
  <motion.div layout className="sidebar__footer" initial={false}>
    <motion.div
      layout
      className="profile-card"
      animate={{ padding: expanded ? "1rem" : "0.75rem" }}
      transition={{ duration: 0.2 }}
    >
      <div className="profile-card__avatar">
        <span>JS</span>
      </div>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            key="profile"
            className="profile-card__content"
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -8 }}
          >
            <strong>Jordan Sawyer</strong>
            <span>Product Design Lead</span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  </motion.div>
);

const ToggleButton = ({
  expanded,
  onToggle
}: {
  expanded: boolean;
  onToggle: () => void;
}) => (
  <motion.button
    layout
    type="button"
    aria-label={expanded ? "Collapse sidebar" : "Expand sidebar"}
    className="sidebar__toggle"
    onClick={onToggle}
    whileTap={{ scale: 0.94 }}
  >
    <AnimatePresence initial={false} mode="wait">
      <motion.span
        key={expanded ? "collapse" : "expand"}
        initial={{ opacity: 0, rotate: expanded ? 0 : -90 }}
        animate={{ opacity: 1, rotate: expanded ? 0 : -180 }}
        exit={{ opacity: 0, rotate: expanded ? 90 : 0 }}
        transition={{ duration: 0.2 }}
      >
        {expanded ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
      </motion.span>
    </AnimatePresence>
  </motion.button>
);

const Sidebar = () => {
  const [expanded, setExpanded] = useState(true);
  const [activeItem, setActiveItem] = useState(navItems[0].label);

  const activeIndex = useMemo(
    () => navItems.findIndex((item) => item.label === activeItem),
    [activeItem]
  );

  return (
    <motion.aside
      className="sidebar"
      variants={panelVariants}
      animate={expanded ? "open" : "closed"}
      initial={false}
    >
      <SidebarHeader expanded={expanded} />
      <ToggleButton expanded={expanded} onToggle={() => setExpanded((prev) => !prev)} />

      <nav className="sidebar__nav" aria-label="Primary">
        <AnimatePresence>
          {expanded && (
            <motion.div
              key="grad"
              className="sidebar__gradient"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
          )}
        </AnimatePresence>

        <motion.div layout className="sidebar__list">
          <AnimatePresence initial={false}>
            {navItems.map((item, index) => (
              <motion.div key={item.label} layout="position" className="nav-item__wrapper">
                <AnimatePresence>
                  {activeIndex === index && (
                    <motion.span
                      layoutId="active-indicator"
                      className="nav-item__highlight"
                      variants={highlightVariants}
                      initial="exit"
                      animate="enter"
                      exit="exit"
                    />
                  )}
                </AnimatePresence>
                <NavItemCard
                  item={item}
                  active={activeItem === item.label}
                  expanded={expanded}
                  onSelect={() => setActiveItem(item.label)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </nav>

      <SidebarFooter expanded={expanded} />
    </motion.aside>
  );
};

export default Sidebar;
