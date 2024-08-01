import Cabin from "@/app/_components/Cabin";
import Reservations from "@/app/_components/Reservations";
import Spinner from "@/app/_components/Spinner";
import { getCabin, getCabins } from "@/app/_lib/data-service";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export async function generateMetadata({ params }) {
  const { cabinId } = params;
  const cabin = await getCabin(cabinId);
  if (!cabin) notFound();

  const { name } = cabin;
  return {
    title: `Cabin: ${name}`,
  };
}

export async function generateStaticParams() {
  // we return array of object with the param name so that our page with dynamic
  // param is still statically rendered. Then will enable us to export our entire
  // app as static site and deploy easily on any static hosting provider
  const cabins = await getCabins();
  const ids = cabins.map((cabin) => ({ cabinId: String(cabin.id) }));
  return ids;
}

// page associated with dynamic route sagment,
// just like this one, [cabinId], will get access to params prop
export default async function Page({ params }) {
  const { cabinId } = params;
  const cabin = await getCabin(cabinId);

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <Cabin cabin={cabin} />

      <div>
        <h2 className="text-5xl font-semibold text-center mb-10 text-accent-400">
          Reserve {cabin.name} today. Pay on arrival.
        </h2>
        {/* Separate component Reservations wasn't needed. As it is fetching its own data, it could've slowed this whole page.
        So separated so that promises inside Reservations do not block rendering of this page */}
        <Suspense fallback={<Spinner />}>
          <Reservations cabin={cabin} />
        </Suspense>
      </div>
    </div>
  );
}
