import { SideNav } from "./side-nav";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="container mx-auto min-h-screen pt-8 mb-8">
      <div className="flex flex-col md:flex-row gap-8">
        
        <div className="hidden md:block md:w-40 md:border-r md:pr-4 md:pt-8">
          <SideNav />
        </div>
        
        <div className="w-full">
          {children}
        </div>
      </div>
    </main>
  );
}