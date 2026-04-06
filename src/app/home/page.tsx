import Sidebar from "@/components/sidebar/Sidebar";
import Header from "@/components/header/Header";

export default function HomePage() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex flex-1 flex-col bg-white">
        <Header />
        <main className="flex flex-1 items-center justify-center">
          <p className="text-lg font-medium text-[#A2A2B5]">pending work</p>
        </main>
      </div>
    </div>
  );
}
