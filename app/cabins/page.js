import { Suspense } from "react";
import CabinList from "../_components/CabinList";
import Spinner from "../_components/Spinner";
import Filter from "../_components/Filter";
import ReservationReminder from "../_components/ReservationReminder";

export const metadata = {
  title: "Cabins",
};

// disable data cache
// export const revalidate = 0;

// ISR, fetch new data every hour(in seconds)
export const revalidate = 3600; // page level, but can be in individual component level which actually fetches

// search params are ?capacity=small, only page will receive this prop,
// not component and this is not known at build time and hence page is dynamically rendering
export default function Page({ searchParams }) {
  const filter = searchParams?.capacity || "all";
  return (
    <div>
      <h1 className="text-4xl mb-5 text-accent-400 font-medium">
        Our Luxury Cabins
      </h1>
      <p className="text-primary-200 text-lg mb-10">
        Cozy yet luxurious cabins, located right in the heart of the Italian
        Dolomites. Imagine waking up to beautiful mountain views, spending your
        days exploring the dark forests around, or just relaxing in your private
        hot tub under the stars. Enjoy nature&apos;s beauty in your own little
        home away from home. The perfect spot for a peaceful, calm vacation.
        Welcome to paradise.
      </p>

      <div className="flex justify-end mb-8">
        <Filter />
      </div>
      <Suspense fallback={<Spinner />} key={filter}>
        {/* Navigations are wraped into transitions, so suspense will not re-render the fallback.
            We fix it through passing a unique key for each navigation */}
        {/* whenever key of suspense changes, fallback will be shown again */}
        <CabinList filter={filter} />
        <ReservationReminder />
      </Suspense>
    </div>
  );
}
