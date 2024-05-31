import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";

interface EaseInWithSlidingAnimationProps {
	initX?: number;
	finalX?: number;
	initY?: number;
	finalY?: number;
	delay?: number;
	duration?: number;
	children: JSX.Element[] | JSX.Element;
}

export const EaseInWithSlidingAnimation = (
	props: EaseInWithSlidingAnimationProps
) => {
	const { initX, finalX, initY, finalY, delay, duration, children } = props;
	const componentStatus = {
		visible: {
			opacity: 1,
			x: finalX ? finalX : 0,
			y: finalY ? finalY : 0,
			transition: {
				duration: duration ? duration : 1.5,
				ease: "easeInOut",
				delay: delay ? delay : 0,
			},
		},
		hidden: {
			opacity: 0,
			x: initX ? initX : 0,
			y: initY ? initY : 0,
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
