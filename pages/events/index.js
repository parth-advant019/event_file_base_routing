import { getAllEvents } from "../../dummy-data";
import EventList from "../../components/events/event-list";
import EventsSearch from "../../components/events/events-search";
import { Fragment } from "react/jsx-runtime";
import { useRouter } from "next/router";

function AllEventsPage() {
  const events = getAllEvents();

  const router = useRouter();
  function findEventHandler(year, month) {
    const fulPath = `/events/${year}/${month}/`;
    router.push(fulPath);
  }

  return (
    <Fragment>
      <EventsSearch onSearch={findEventHandler} />
      <EventList items={events} />
    </Fragment>
  );
}

export default AllEventsPage;
