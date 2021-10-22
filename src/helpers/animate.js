export const containerVariants = {
	hidden: {
		opacity: 0,
	},
	visible: {
		opacity: 1,
		transition: {
			delay: 0.25,
			duration: 0.5,
			when: 'beforeChildren',
		},
	},
};

export const tableVariants = {
	hidden: {
		opacity: 0,
		transition: {
			staggerChildren: 0.08,
		},
	},
	visible: {
		opacity: 1,
		transition: {
			type: 'easeInOut',
			staggerChildren: 0.08,
			when: 'beforeChildren',
		},
	},
};

export const showVariants = {
	hidden: {
		opacity: 0,
	},
	visible: {
		opacity: 1,
	},
};

export const cardVariants = {
	hidden: {
		opacity: 0,
		y: '100px',
	},
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			type: 'ease',
			delay: 0.3,
			duration: 0.6,
			staggerChildren: 0.5,
			when: 'beforeChildren',
		},
	},
};

export const infoVariants = {
	hidden: {
		x: '-100vw',
	},
	visible: {
		x: 0,
		transition: { type: 'spring', stiffness: 120 },
	},
};

export const linkVariants = {
	hidden: {
		scale: 0,
	},
	visible: {
		scale: 1,
		transition: {
			type: 'easeOutQuad',
			delay: 1.5,
			duration: 0.5,
		},
	},
	hover: {
		scale: 1.1,
		transition: {
			type: 'easeOutQuad',
			duration: 0.2,
		},
	},
};

export const hoverVariants = {
	hover: {
		scale: 1.1,
		transition: {
			type: 'easeOutQuad',
			duration: 0.2,
		},
	},
};

export const buttonVariants = {
	hidden: {
		backgroundColor: 'rgba(201,18,120,0.85)',
	},
	visible: {
		backgroundColor: 'rgba(201,18,120,0.85)',
	},
	active: {
		backgroundColor: 'rgba(29,185,84,0.85)',
		transition: {
			duration: 1,
		},
	},
	hover: {
		backgroundColor: 'rgba(29,185,84,0.85)',
		transition: {
			duration: 1,
		},
	},
};

export const genreVariants = {
	hidden: {
		backgroundColor: 'rgba(29,185,84,0.85)',
	},
	visible: {
		backgroundColor: 'rgba(29,185,84,0.85)',
	},
	hover: {
		backgroundColor: [
			'rgba(29,185,84,0.85)',
			'rgba(255,204,92,0.85)',
			'rgba(105,48,255,0.85)',
			'rgba(201,18,120,0.85)',
			'rgba(29,185,84,0.85)',
		],
		transition: {
			duration: 2,
			repeat: 1,
			repeatType: 'reverse',
		},
	},
};
