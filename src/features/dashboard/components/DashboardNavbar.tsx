"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Sparkles, User, Settings, LogOut, FileText, CheckCircle } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useAppSelector } from "@/redux/hooks";
import { selectCurrentResume, selectResumeId } from "@/features/resume/selectors/resumeSelectors";
import { getUserResumes } from "@/features/resume/services/resumeService";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useHasMounted } from "@/hooks/useHasMounted";

export function DashboardNavbar() {
  const router = useRouter();
  const pathname = usePathname();
  const user = useAppSelector((state) => state.auth.user);
  const hasMounted = useHasMounted();

  // Active resume ID from Redux or DB
  const currentResume = useAppSelector(selectCurrentResume);
  const activeResumeId = useAppSelector(selectResumeId) || (currentResume && !currentResume.isSampleData ? currentResume.id : null);
  const [navResumeId, setNavResumeId] = useState<string | null>(activeResumeId);

  useEffect(() => {
    if (activeResumeId) {
      setNavResumeId(activeResumeId);
      return;
    }
    if (user?.id) {
      getUserResumes(user.id).then(({ data }) => {
        if (data && data.length > 0) {
          setNavResumeId(data[0].id);
        }
      });
    }
  }, [activeResumeId, user?.id]);

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.refresh();
    router.push("/auth/login");
  };

  // Extract display text — use static placeholders until after mount to guarantee 100% hydration matching
  const displayName = hasMounted ? (user?.name || user?.email || "User") : "User";
  const userName = hasMounted ? (user?.name || "Authenticated User") : "Authenticated User";
  const userEmail = hasMounted ? (user?.email || "No email available") : "No email available";
  const initial = hasMounted ? displayName.charAt(0).toUpperCase() : "U";

  const resumeHref = navResumeId ? `/protected/resume/${navResumeId}` : "/protected/resume/new";

  const navLinks = [
    { label: "Dashboard", href: "/protected", icon: Sparkles },
    { label: "Resumes", href: resumeHref, icon: FileText },
    { label: "ATS Checker", href: "/protected/ats", icon: CheckCircle },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/70 backdrop-blur-xl transition-colors duration-300">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left: Brand Logo & Navigation */}
        <div className="flex items-center gap-8">
          <Link
            href="/protected"
            className="flex items-center gap-2 text.xl font-bold text-foreground tracking-tight transition-opacity hover:opacity-80"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-secondary shadow-md">
              <Sparkles className="h-4 w-4 text-white" aria-hidden="true" />
            </div>
            <span className="bg-gradient-to-r from-foreground via-foreground to-muted-foreground bg-clip-text text-transparent">
              Craftume
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive =
                pathname === link.href ||
                (link.label === "Resumes" && pathname.startsWith("/protected/resume"));
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-card/40 hover:text-foreground"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right: User Profile Dropdown */}
        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className="group flex items-center gap-3 rounded-full border border-border bg-card/40 p-1 pr-3 text-left transition-all duration-200 hover:border-primary/40 hover:bg-card/70 focus:outline-none focus:ring-2 focus:ring-primary/40"
                aria-label="User menu"
              >
                {hasMounted && user?.avatarUrl ? (
                  /* eslint-disable-next-html-element-suppression */
                  <img
                    src={user.avatarUrl}
                    alt={displayName}
                    className="h-8 w-8 rounded-full object-cover border border-primary/20"
                  />
                ) : (
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-tr from-primary/30 to-secondary/30 text-sm font-bold text-foreground border border-primary/30 shadow-inner">
                    {initial}
                  </div>
                )}
                <span className="hidden sm:inline-block max-w-[120px] truncate text-xs font-medium text-foreground">
                  {displayName}
                </span>
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              className="w-56 rounded-xl border border-border bg-card/90 backdrop-blur-xl p-2 shadow-2xl text-foreground"
            >
              <DropdownMenuLabel className="p-2 font-normal">
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-semibold leading-none text-foreground truncate">
                    {userName}
                  </p>
                  <p className="text-xs leading-none text-muted-foreground truncate">
                    {userEmail}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-border/60" />
              
              <DropdownMenuItem asChild>
                <Link
                  href="/protected/settings"
                  className="flex cursor-pointer items-center gap-2 rounded-lg px-2 py-2 text-sm text-foreground hover:bg-primary/10 transition-colors"
                >
                  <Settings className="h-4 w-4 text-primary" />
                  <span>Settings</span>
                </Link>
              </DropdownMenuItem>

              <DropdownMenuSeparator className="bg-border/60" />

              <DropdownMenuItem
                onClick={handleSignOut}
                className="flex cursor-pointer items-center gap-2 rounded-lg px-2 py-2 text-sm text-destructive hover:bg-destructive/10 transition-colors focus:text-destructive"
              >
                <LogOut className="h-4 w-4" />
                <span>Sign Out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
