export default function useAsynced(next: () => any) {
    return (async () => await next())();
}