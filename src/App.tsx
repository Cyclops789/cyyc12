import Desktop from "@/components/Desktop/Desktop";
import DesktopHandler from "@/components/Desktop/DesktopHandler";
import tw from 'twin.macro';
import '@/App.css';
import { useRef } from "react";
import { Helmet as Meta } from "react-helmet";
import TaskBar from "@/components/Desktop/TaskBar/TaskBar";
import { useWindowsStore } from "./stores/windows";
import Background from "@/components/Desktop/Backgrounds";

const Container = tw.div`w-screen h-screen flex justify-center items-center`;

export default function App() {
  const selectAbleContainerRef = useRef<HTMLDivElement>(null);
  const { activeWindow } = useWindowsStore();

  return (
    <DesktopHandler {...{ selectAbleContainerRef }}>
      <Desktop {...{ selectAbleContainerRef }} />
      <Meta>
        <title>Cyyc12{(activeWindow && activeWindow !== 'startmenu' && activeWindow !== 'icons') ? ` - ${activeWindow.charAt(0).toUpperCase() + activeWindow.slice(1)}${activeWindow === 'file' ? ' manager' : ''}` : ''}</title>
      </Meta>
      <Container>
        <Background />
      </Container>
      <TaskBar />
    </DesktopHandler>
  );
}
