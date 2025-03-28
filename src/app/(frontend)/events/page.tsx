import Link from "next/link";
import { EVENTS_QUERY } from '@/sanity/lib/queries';
import { sanityFetch } from "@/sanity/lib/live";

interface Event {
  _id: string;
  name: string;
  slug: { current: string };
  date: string;
  headline: {
    name: string;
  };
  venue: {
    name: string;
  };
}

export default async function EventsPage() {
  const { data: events } = await sanityFetch({ query: EVENTS_QUERY });

  return (
    <section className="container mx-auto grid grid-cols-1 gap-6 p-12">
      <h1 className="text-4xl font-bold">Upcoming Events</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {events?.map((event: Event) => (
          <Link
            key={event._id}
            href={`/events/${event.slug.current}`}
            className="group relative block bg-black"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/0 to-black/0" />
            <div className="relative p-4 sm:p-6 lg:p-8">
              <p className="text-sm font-medium uppercase tracking-widest text-pink-500">
                {new Date(event.date).toLocaleDateString()}
              </p>
              <p className="text-xl font-bold text-white sm:text-2xl">{event.name}</p>
              {event.headline && (
                <p className="mt-2 text-sm text-white/80">with {event.headline.name}</p>
              )}
              {event.venue && (
                <p className="mt-1 text-sm text-white/60">at {event.venue.name}</p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
} 