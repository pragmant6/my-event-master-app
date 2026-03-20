import { useNavigate } from 'react-router-dom';
import { memo } from 'react';

import EventItem from './components/EventItem';

type Event = {
	id: string;
	name: string;
	info?: string;
	images: { url: string }[];
};

type EventsProps = {
	searchTerm: string;
	events: Event[];
};

const Events: React.FC<EventsProps> = ({ searchTerm, events }) => {
	const navigate = useNavigate();

	const handleEventItemClick = (id: string) => {
		navigate(`/detail/${id}`);
	};

	const renderEvents = () => {
		let eventsFiltered = events;

		if (searchTerm.length > 0) {
			eventsFiltered = eventsFiltered.filter((item) =>
				item.name.toLowerCase().includes(searchTerm.toLowerCase())
			);
		}

		return eventsFiltered.map((eventItem) => (
			<EventItem
				key={`event-item-${eventItem.id}`}
				name={eventItem.name}
				info={eventItem.info}
				image={eventItem.images?.[0]?.url}
				onEventClick={handleEventItemClick}
				id={eventItem.id}
			/>
		));
	};

	return (
		<div>
			<h2>Eventos</h2>
			{renderEvents()}
		</div>
	);
};

export default memo(Events);
