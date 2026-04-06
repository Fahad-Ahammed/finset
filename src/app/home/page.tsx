import Sidebar from "@/components/sidebar/Sidebar";

export default function HomePage() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex flex-1 items-center justify-center bg-white">
        <p className="text-lg font-medium text-[#A2A2B5]">pending work</p>
      </main>
    </div>
  );
}
