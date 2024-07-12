export default function useAsynced(next: () => Promise<any>) {
    return (async () => await next())();
}