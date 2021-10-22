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
		scale: 1.05,
		transition: {
			type: 'easeOutQuad',
			duration: 0.2,
		},
	},
};

export const slideFromLeftVariants = {
	hidden: {
		x: '-20vw',
		opacity: 0,
	},
	visible: {
		x: ['-20vw', '2vw', '0vw'],
		opacity: 1,
		transition: {
			type: 'easeOut',
			delay: 1,
			duration: 0.75,
		},
	},
};

export const slideFromRightVariants = {
	hidden: {
		x: '20vw',
		opacity: 0,
	},
	visible: {
		x: ['20vw', '-2vw', '0vw'],
		opacity: 1,
		transition: {
			type: 'easeInOut',
			delay: 1,
			duration: 0.75,
		},
	},
};
