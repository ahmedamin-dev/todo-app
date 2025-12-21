import Navbar from "@/components/Navbar";

export default function TodoLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="grow p-4">{children}</div>
    </div>
  );
}
