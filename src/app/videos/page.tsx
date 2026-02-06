import { GlitchText } from "@/components/GlitchText";
import { PixelCard } from "@/components/PixelCard";
import { PixelButton } from "@/components/PixelButton";
import Image from "next/image";
import { fetchLatestVideos, formatViews, formatRelativeDate } from "@/lib/youtube";

export default async function VideosPage() {
    const CHANNEL_ID = "UCmOnc4ziXeC9zH7KdiRUg9Q";
    const youtubeVideos = await fetchLatestVideos(CHANNEL_ID);
    const videos = youtubeVideos.map((vid, i) => ({
        title: vid.title,
        category: "TECH & SCIENCE",
        thumb: vid.thumbnail,
        views: formatViews(vid.views),
        date: formatRelativeDate(vid.published),
        rarity: i === 0 ? "NEWEST" : (parseInt(vid.views) > 500000 ? "POPULAR" : "ARCHIVE"),
        url: vid.url
    }));

    return (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-8 md:gap-20 selection:bg-neon-green selection:text-black">

            <header className="flex flex-col items-center md:items-start pt-0 md:pt-16 border-b-4 border-white/5 pb-10 gap-4">
                <GlitchText text="VIDEO_ARCHIVE" as="h1" className="text-fluid-2xl tracking-tighter text-center md:text-left mx-auto md:mx-0" />
                <p className="text-gray-500 text-[10px] md:text-sm tracking-[0.3em] uppercase max-w-xl text-center md:text-left">
                    Real-time data sync from @vinconium sector.
                </p>
            </header>

            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {videos.length === 0 && (
                    <div className="col-span-full py-20 text-center border-4 border-dashed border-white/10">
                        <p className="text-gray-500 font-bold uppercase tracking-widest">Signal Lost... Reconnecting to YouTube Feed</p>
                    </div>
                )}

                {videos.map((vid, i) => (
                    <div key={i} className="group flex">
                        <PixelCard
                            variant="default"
                            title={`FILE::${vid.title}`}
                            noPadding
                            className="h-full hover:-translate-y-2 transition-all duration-300 flex flex-col overflow-hidden w-full"
                        >
                            <div className="relative overflow-hidden border-b-4 border-black group-hover:border-neon-green transition-colors aspect-video">
                                <Image
                                    src={vid.thumb}
                                    alt={vid.title}
                                    fill
                                    className="object-cover image-rendering-pixelated opacity-80 group-hover:opacity-100 transition-all duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>

                                <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur-sm px-2 py-1 text-[10px] font-mono font-bold text-neon-green border border-neon-green/30 shadow-pixel-sm">
                                    SYNCHRONIZED
                                </div>

                                <div className="absolute top-2 left-2 flex gap-2">
                                    <span className="text-[7px] sm:text-[8px] font-bold px-1.5 sm:px-2 py-0.5 sm:py-1 bg-black text-white border border-white/20 whitespace-nowrap uppercase tracking-widest shadow-pixel-sm">
                                        {vid.rarity}
                                    </span>
                                </div>
                            </div>

                            <div className="p-4 md:p-6 flex-1 flex flex-col">
                                <div className="flex flex-col gap-1 mb-4">
                                    <span className="text-[9px] md:text-xs text-cyber-pink font-bold tracking-[0.2em]">{vid.category}</span>
                                    <h3 className="text-sm md:text-base text-white group-hover:text-retro-yellow transition-colors leading-tight font-bold break-words line-clamp-2">
                                        {vid.title}
                                    </h3>
                                    <span className="text-[8px] md:text-[10px] text-gray-500 font-mono mt-1">{vid.date}</span>
                                </div>

                                <div className="mt-auto flex flex-col gap-4">
                                    <div className="flex justify-between items-center pt-4 border-t border-white/5">
                                        <span className="text-[8px] md:text-[10px] text-gray-500 uppercase tracking-widest">{vid.views} DECIDED</span>
                                        <div className="flex-1 max-w-[100px] mx-4 h-1 bg-white/5 rounded-full hidden sm:block">
                                            <div className="h-full bg-neon-green/30 w-3/4"></div>
                                        </div>
                                    </div>
                                    <a
                                        href={vid.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-full"
                                    >
                                        <PixelButton variant="neon" className="px-4 py-2 whitespace-nowrap text-[8px] sm:text-[10px] w-full">
                                            INITIALIZE_STREAM
                                        </PixelButton>
                                    </a>
                                </div>
                            </div>
                        </PixelCard>
                    </div>
                ))}
            </section>

            <footer className="mt-20 pb-32 flex justify-center">
                <PixelCard variant="glass" className="w-full max-w-md py-4 text-center">
                    <p className="text-[10px] text-gray-500 tracking-widest uppercase">Streaming {videos.length} Active Data Packets</p>
                </PixelCard>
            </footer>
        </main>
    );
}
