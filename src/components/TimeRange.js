function TimeRange({ timeRange, setTimeRange }) {
	return (
		<div className='TimeRange'>
			<ul className='flex pb-1'>
				<li
					className={
						timeRange === 'long_term' ? 'current flex center' : 'flex center'
					}
					onClick={() => setTimeRange('long_term')}
				>
					All Time
				</li>
				<li
					className={
						timeRange === 'medium_term' ? 'current flex center' : 'flex center'
					}
					onClick={() => setTimeRange('medium_term')}
				>
					Past 6 Months
				</li>
				<li
					className={
						timeRange === 'short_term' ? 'current flex center' : 'flex center'
					}
					onClick={() => setTimeRange('short_term')}
				>
					Past Month
				</li>
			</ul>
		</div>
	);
}

export default TimeRange;
