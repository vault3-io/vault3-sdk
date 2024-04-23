import { useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import { Box, HStack, Icon } from "@chakra-ui/react";
interface Props {
	images: string[];
}

export function SpaceDocumentsSlider({ images }: Props) {
	const [currentSlide, setCurrentSlide] = useState(0);
	const [loaded, setLoaded] = useState(false);
	const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
		mode: "free-snap",
		slides: {
			origin: "center",
			perView: 1,
			spacing: 16,
		},
		initial: 0,
		slideChanged(slider) {
			setCurrentSlide(slider.track.details.rel);
		},
		created() {
			setLoaded(true);
		},
	});

	const lastSlideId = (images.length ?? 0) - 1;

	return (
		<>
			<Box
				position="relative"
				maxW="100%"
				w={400}
				px={8}
				className="navigation-wrapper"
			>
				<div ref={sliderRef} className="keen-slider">
					{images.map((image, idx) => (
						<Box
							key={idx}
							className="keen-slider__slide"
							display="flex"
							alignItems="center"
							justifyContent="center"
							maxW="100%"
							h={300}
						>
							<img src={image} alt={`slide ${idx}`} />
						</Box>
					))}
				</div>
				{loaded && instanceRef.current && (
					<>
						<Arrow
							left
							onClick={(e: any) =>
								e.stopPropagation() ||
								instanceRef.current?.prev()
							}
							disabled={currentSlide === 0}
						/>

						<Arrow
							onClick={(e: any) =>
								e.stopPropagation() ||
								instanceRef.current?.next()
							}
							disabled={currentSlide === lastSlideId}
						/>
					</>
				)}
			</Box>
			{loaded && instanceRef.current && (
				<HStack py={4} className="dots">
					{images.map((_, idx) => {
						return (
							<Box
								as="button"
								border="2px solid"
								borderColor="brand.dark"
								w={2.5}
								h={2.5}
								background={
									currentSlide === idx
										? "brand.dark"
										: "transparent"
								}
								borderRadius="50%"
								cursor="pointer"
								key={idx}
								onClick={() => {
									instanceRef.current?.moveToIdx(idx);
								}}
								className={
									"dot" +
									(currentSlide === idx ? " active" : "")
								}
							></Box>
						);
					})}
				</HStack>
			)}
		</>
	);
}

function Arrow({
	disabled,
	left,
	onClick,
}: {
	disabled: boolean;
	left?: boolean;
	onClick: (e: any) => void;
}) {
	return (
		<Box
			as="button"
			onClick={onClick}
			opacity={disabled ? 0.5 : 1}
			cursor="pointer"
			position="absolute"
			left={left ? 0 : "auto"}
			right={left ? "auto" : 0}
			top="50%"
			transform="translateY(-50%)"
		>
			<Icon
				as={left ? MdArrowBackIos : MdArrowForwardIos}
				w={6}
				h={6}
				color="brand.dark"
			/>
		</Box>
	);
}
