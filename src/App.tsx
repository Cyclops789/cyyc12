import Desktop from "@/components/Desktop/Desktop";
import DesktopHandler from "@/components/Desktop/DesktopHandler";
import '@/App.css';
import { useRef, useEffect, useState } from "react";
import { Helmet as Meta } from "react-helmet";
import TaskBar from "@/components/Desktop/TaskBar/TaskBar";
import { useWindowsStore } from "./stores/windows";
import Background from "@/components/Desktop/Backgrounds";
import useThemeStore from "@/styles/useThemeStore";
import tw, { styled } from 'twin.macro';

const Container = tw.div`w-screen h-screen flex justify-center items-center`;

export default function App() {
  const selectAbleContainerRef = useRef<HTMLDivElement>(null);
  const { activeWindow } = useWindowsStore();
  const { baseColor } = useThemeStore();

  return (
    <div data-theme={baseColor}>
      <DesktopHandler {...{ selectAbleContainerRef }}>
        <Desktop {...{ selectAbleContainerRef }} />
        <Meta>
          <title>Cyyc12{(activeWindow && activeWindow !== 'startmenu' && activeWindow !== 'icons') ? ` - ${activeWindow.charAt(0).toUpperCase() + activeWindow.slice(1)}` : ''}</title>
        </Meta>
        <Container>
          <Background />
        </Container>
        <TaskBar />
      </DesktopHandler>
    </div>
  );
}
