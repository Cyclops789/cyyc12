"use client";
import Desktop from "@/components/Desktop/Desktop";
import Image from "next/image";
import DesktopHandler from "@/components/Desktop/DesktopHandler";
import tw from 'tailwind-styled-components';

const Container = tw.div`w-screen h-screen bg-black flex justify-center items-center`;

export default function Home() {
	return (
		<DesktopHandler>
			<Desktop />
			<Container>
				<Image className="z-[1] w-[100px]" src={'/debian.png'} alt={"background-image"} width={3840} height={2160} />
			</Container>
		</DesktopHandler>
	);
}
