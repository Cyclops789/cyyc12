import { usePersistedLocatedState } from "@/helpers/hooks/usePersistedLocatedState";
import { useMemo } from "react";
import { twi } from "tw-to-css";

export default () => {
    const [color, setBaseColor] = usePersistedLocatedState("theme", "red");
    // @ts-ignore this is valid
    const baseColor = useMemo(() => color.replaceAll('"', ''), [color]);

    const rbgAt700 = useMemo(
        () => twi(`text-${baseColor ? baseColor : 'red'}-700`)
        .replace('color:', '')
        .replace(';', '')
        // @ts-ignore this is valid
        .replaceAll(',', ' ')
    , []);
    const rbgAt600 = useMemo(
        () => twi(`text-${baseColor ? baseColor : 'red'}-600`)
        .replace('color:', '')
        .replace(';', '')
        // @ts-ignore this is valid
        .replaceAll(',', ' ')
    , []);

    return { 
        baseColor, 
        setBaseColor, 
        rbgAt700, 
        rbgAt600 
    };
}