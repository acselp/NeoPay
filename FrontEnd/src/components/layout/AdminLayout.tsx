import { useState } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Cable,
  Gauge,
  Settings,
  List,
  Ruler,
  ChevronRight,
  Zap, Scroll,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface NavItem {
  name: string;
  icon?: LucideIcon;
  /** Leaf items navigate via `href`. Omit on items that only group `children`. */
  href?: string;
  /** Match the route exactly (e.g. for `/` or parents that share a prefix with children). */
  end?: boolean;
  /** Nested items. When present the item renders as a collapsible group. */
  children?: NavItem[];
}

const navigation: NavItem[] = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard, end: true },
  { name: 'Customers', href: '/customers', icon: Users },
  { name: 'Connections', href: '/connections', icon: Cable },
  {
    name: 'Meters',
    icon: Gauge,
    children: [
      { name: "Meter list", href: '/meter/list' },
      { name: "Meter readings", href: '/meter/readings' },
    ]
  },
  {
    name: 'Utilities',
    icon: Settings,
    children: [
      { name: 'Utilities List', href: '/utilities', end: true },
      { name: 'Units Management', href: '/utilities/units' },
    ],
  },
];

const linkClasses = (isActive: boolean) =>
  `flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
    isActive
      ? 'bg-blue-600 text-white'
      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
  }`;

function isItemActive(item: NavItem, pathname: string): boolean {
  if (item.children) {
    return item.children.some((child) => isItemActive(child, pathname));
  }
  if (!item.href) return false;
  return item.end
    ? pathname === item.href
    : pathname === item.href || pathname.startsWith(`${item.href}/`);
}

function NavLeaf({ item }: { item: NavItem }) {
  return (
    <NavLink
      to={item.href!}
      end={item.end}
      className={({ isActive }) => linkClasses(isActive)}
    >
      { item.icon ? <item.icon className="h-5 w-5 mr-3" /> : "" }
      {item.name}
    </NavLink>
  );
}

function NavGroup({ item }: { item: NavItem }) {
  const { pathname } = useLocation();
  const active = isItemActive(item, pathname);
  const [open, setOpen] = useState(active);

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        className={`w-full ${linkClasses(active && !open)}`}
      >
        <item.icon className="h-5 w-5 mr-3" />
        <span className="flex-1 text-left">{item.name}</span>
        <ChevronRight
          className={`h-4 w-4 transition-transform ${open ? 'rotate-90' : ''}`}
        />
      </button>

      {open && (
        <div className="mt-1 ml-4 pl-3 border-l border-slate-700 space-y-1">
          {item.children!.map((child) => (
            <NavItemRenderer key={child.name} item={child} />
          ))}
        </div>
      )}
    </div>
  );
}

function NavItemRenderer({ item }: { item: NavItem }) {
  return item.children ? <NavGroup item={item} /> : <NavLeaf item={item} />;
}

export default function AdminLayout() {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col">
        {/* Logo */}
        <div className="h-16 flex items-center px-6 border-b border-slate-700">
          <Zap className="h-8 w-8 text-blue-400" />
          <span className="ml-3 text-xl font-semibold">UtilityHub</span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {navigation.map((item) => (
            <NavItemRenderer key={item.name} item={item} />
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-slate-700">
          <div className="text-xs text-slate-400">
            Utility Management Platform
            <br />
            v1.0.0
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
