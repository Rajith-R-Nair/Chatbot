import TopHeader from "@/components/topHeader";

export default function Layout({ children }: any) {
  return (
    <>
      <TopHeader />
      <main className="">
        <div className="max-w-[1056px] mx-auto pt-6 h-full">{children}</div>
      </main>
    </>
  );
}
