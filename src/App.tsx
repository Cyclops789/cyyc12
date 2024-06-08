import Desktop from "@/components/Desktop/Desktop";
import DesktopHandler from "@/components/Desktop/DesktopHandler";
import tw from 'twin.macro';
import '@/App.css';

const Container = tw.div`w-screen h-screen bg-black flex justify-center items-center`;

export default function App() {
  return (
    <DesktopHandler>
      <Desktop />
      <Container>
        <img css={tw`z-[1] w-[100px]`} loading={"lazy"} src={'/debian.png'} alt={"background-image"} width={3840} height={2160} />
      </Container>
    </DesktopHandler>
  );
}
