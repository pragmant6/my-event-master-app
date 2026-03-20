import useLikeEvents from '../../../../hooks/useLikeEvents';
import HearthFilled from '../../../../assets/hearth-filled.png';
import HearthUnfilled from '../../../../assets/hearth-unfilled.png';
import { eventStyles } from '../../../../utils/constStyles';

const EventItem = ({ info, id, name, image, onEventClick }) => {
	const { isEventLiked, toggleEventLike } = useLikeEvents(id);

	const handleSeeMoreClick = (evt) => {
		evt.stopPropagation();
		onEventClick(id);
	};

	const handleHearthClick = () => {
		toggleEventLike();
	};

	return (
		<div
			onClick={() => console.log('padre clickeado')}
			className={`${eventStyles.eventItemContainer} ${styles.anotherContainer}`}>
			<div className={eventStyles.imageContainer}>
				<img
					src={isEventLiked ? HearthFilled : HearthUnfilled}
					alt='Hearth button'
					className={eventStyles.hearthImage}
					onClick={handleHearthClick}
				/>
				<img src={image} alt={name} width={200} height={200} />
			</div>
			<div className={eventStyles.eventInfoContainer}>
				<h4 className={eventStyles.eventName}>{name}</h4>
				<p className={eventStyles.eventInfo}>{info}</p>
				<button onClick={handleSeeMoreClick} className={styles.seeMoreBtn}>
					{/*<Link to={`/detail/${id}`}>
                        Ver mas
                    </Link>*/}
					Ver mas
				</button>
			</div>
		</div>
	);
};

export default EventItem;
