"use client";
import Desktop from "@/components/Desktop/Desktop";
import Image from "next/image";
import DesktopHandler from "@/components/Desktop/DesktopHandler";

export default function Home() {
	return (
		<DesktopHandler>
			<Desktop />
			<div className="w-screen h-screen bg-black flex justify-center items-center">
				<Image className="z-[1] w-[100px]" src={'/debian.png'} alt={"background-image"} width={3840} height={2160} />
			</div>
		</DesktopHandler>
	);
}
