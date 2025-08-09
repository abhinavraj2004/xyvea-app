import Link from 'next/link';

export function Footer() {
  return (
    <footer className="w-full shrink-0">
      <div className="container mx-auto flex h-16 items-center justify-center px-4 md:px-6">
        <div className="flex flex-wrap justify-center items-center space-x-4 text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Xyvea. All rights reserved.</p>
          <Link href="/leaderboard" className="hover:text-foreground transition-colors">
            Leaderboard
          </Link>
          <Link href="/legal/terms" className="hover:text-foreground transition-colors">
            Terms of Service
          </Link>
          <Link href="/legal/privacy" className="hover:text-foreground transition-colors">
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}
