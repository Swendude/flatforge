import SvgEditor from "@/components/SvgEditor";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col gap-2 p-12">
      <section id="header" className="flex items-end gap-4 border-b-2">
        <h1 className="text-4xl font-thin">Flatforge</h1>
        <h2>Craft your own Flatmini!</h2>
      </section>

      <SvgEditor />
    </main>
  );
}
