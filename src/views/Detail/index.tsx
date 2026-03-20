// import { useState } from "react";
// import { useParams } from "react-router-dom";
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

// import useEventsResults from "../../state/events-results";
import eventFetcher from '../../utils/fetchEvents';
import { detailStyles } from '../../utils/constStyles';

const pathname = window.location.pathname;
const resource = eventFetcher(pathname.substring(8, pathname.length));

const Detail = () => {
	// const { data } = useEventsResults();
	// const { eventId } = useParams();
	// const [eventData, setEventData] = useState({});
	const eventData = resource.eventDetail.read();

	return (
		<div className={detailStyles.container}>
			<div className={detailStyles.mainInfoContainer}>
				<img
					src={eventData.images?.[0].url}
					className={detailStyles.eventImage}
					alt={eventData.name}
				/>
				<h4 className={detailStyles.eventName}>{eventData.name}</h4>
				<p className={detailStyles.infoParagraph}>{eventData.info}</p>
				{eventData.dates?.start.dateTime ? (
					<p className={detailStyles.dateParagraph}>
						{format(
							new Date(eventData.dates?.start.dateTime),
							'd LLLL yyyy H:mm',
							{ locale: es }
						)}
						hrs
					</p>
				) : null}
			</div>
			<div className={detailStyles.seatInfoContainer}>
				<h6 className={detailStyles.seatMapTitle}>Mapa del evento</h6>
				<img src={eventData.seatmap?.staticUrl} alt='Seatmap event' />
				<p className={detailStyles.pleaseNoteLegend}>{eventData.pleaseNote}</p>
				<p className={detailStyles.priceRangeLegend}>
					Rango de precios: {eventData.priceRanges?.[0].min}-
					{eventData.priceRanges?.[0].max} {eventData.priceRanges?.[0].currency}
				</p>
			</div>
			<a href={eventData.url}>Ir por tus boletos</a>
		</div>
	);
};

export default Detail;
