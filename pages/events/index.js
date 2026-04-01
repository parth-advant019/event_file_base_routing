import { getAllEvents } from "../../helpers/api-utils";
import EventList from "../../components/events/event-list";
import EventsSearch from "../../components/events/events-search";
import { Fragment } from "react/jsx-runtime";
import { useRouter } from "next/router";

function AllEventsPage(props) {
  const router = useRouter();
  const { events } = props;

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

export async function getStaticProps() {
  const events = await getAllEvents();

  return {
    props: {
      events: events,
    },
    revalidate: 60,
  };
}

export default AllEventsPage;
