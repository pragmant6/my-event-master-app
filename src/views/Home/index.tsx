import { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import ReactPaginate from 'react-paginate';

import Navbar from '../../components/Navbar';
import Events from '../../components/Events'; // 👈 IMPORTANTE
import useEventsResults from '../../state/events-results';
import { paginationStyles } from '../../utils/constStyles';

type PageClickEvent = {
	selected: number;
};

export const Home: React.FC = () => {
	const { data, isLoading, error, fetchEvents } = useEventsResults();

	const events = useMemo(
		() => data?._embedded?.events || [],
		[data?._embedded?.events]
	);

	const page = useMemo(() => data?.page || {}, [data?.page]);

	const [isToggle, setIsToggle] = useState<boolean>(false);
	const [searchTerm, setSearchTerm] = useState<string>('');

	const containerRef = useRef<HTMLDivElement | null>(null);
	const fetchMyEventsRef = useRef<typeof fetchEvents | null>(null);

	fetchMyEventsRef.current = fetchEvents;

	useEffect(() => {
		fetchMyEventsRef.current?.();
	}, []);

	const handleNavbarSearch = (term: string) => {
		setSearchTerm(term);
		fetchEvents(`&keyword=${term}`);
	};

	const handlePageClick = useCallback(
		({ selected }: PageClickEvent) => {
			fetchEvents(`&keyword=${searchTerm}&page=${selected}`);
		},
		[searchTerm, fetchEvents]
	);

	const renderEvents = () => {
		if (isLoading) {
			return <div>Cargando resultados...</div>;
		}

		if (error) {
			return <div>Ha ocurrido un error</div>;
		}

		return (
			<div>
				<button onClick={() => setIsToggle(!isToggle)}>
					{isToggle ? 'ON' : 'OFF'}
				</button>

				<Events searchTerm={searchTerm} events={events} />

				<ReactPaginate
					className={paginationStyles.pagination}
					nextClassName={paginationStyles.next}
					previousClassName={paginationStyles.previous}
					pageClassName={paginationStyles.page}
					activeClassName={paginationStyles.activePage}
					disabledClassName={paginationStyles.disabledPage}
					breakLabel='...'
					nextLabel='>'
					onPageChange={handlePageClick}
					pageRangeDisplayed={5}
					pageCount={page?.totalPages || 0}
					previousLabel='<'
					renderOnZeroPageCount={null}
				/>
			</div>
		);
	};

	return (
		<>
			<Navbar onSearch={handleNavbarSearch} ref={containerRef} />
			{renderEvents()}
		</>
	);
};
