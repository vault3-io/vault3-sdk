import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";

interface ShowAnimationProps {
	delay?: number;
	duration?: number;
	children: JSX.Element[] | JSX.Element;
}

export const EaseInAnimation = (props: ShowAnimationProps) => {
	const { delay, children, duration } = props;
	const componentStatus = {
		visible: {
			opacity: 1,
			transition: {
				duration: duration ?? 1,
				ease: "easeInOut",
				delay: delay ? delay : 0,
			},
		},
		hidden: {
			opacity: 0,
		},
	};

	const controls = useAnimation();
	const [ref, inView] = useInView();
	useEffect(() => {
		if (inView) {
			controls.start("visible");
		}
	}, [controls, inView]);

	return (
		<motion.div
			ref={ref}
			animate={controls}
			initial="hidden"
			variants={componentStatus}
		>
			{children}
		</motion.div>
	);
};
