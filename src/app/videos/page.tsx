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
        category: "TECH",
        thumb: vid.thumbnail,
        views: formatViews(vid.views),
        date: formatRelativeDate(vid.published),
        rarity: i === 0 ? "NEWEST" : (parseInt(vid.views) > 500000 ? "POPULAR" : "ARCHIVE"),
        url: vid.url
    }));

    return (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-12 md:gap-20 selection:bg-neon-green selection:text-black">

            <header className="grid grid-cols-12 pt-40 gap-6 items-end border-b-4 border-white/5 pb-12">
                <div className="col-span-12 md:col-span-8">
                    <GlitchText text="VIDEO_ARCHIVE" as="h1" className="text-fluid-2xl tracking-tighter" />
                    <p className="text-gray-500 mt-4 text-[10px] md:text-sm tracking-[0.3em] uppercase max-w-xl">
                        Real-time data sync from @vinconium sector.
                    </p>
                </div>
            </header>

            <section className="grid grid-cols-12 gap-8 md:gap-10">
                {videos.length === 0 && (
                    <div className="col-span-12 py-20 text-center border-4 border-dashed border-white/10">
                        <p className="text-gray-500 font-bold uppercase tracking-widest">Signal Lost... Reconnecting to YouTube Feed</p>
                    </div>
                )}

                {videos.map((vid, i) => (
                    <div key={i} className={`col-span-12 ${i % 3 === 0 ? 'md:col-span-12 lg:col-span-8' : 'md:col-span-6 lg:col-span-4'} group`}>
                        <PixelCard
                            variant={i % 3 === 0 ? 'primary' : 'default'}
                            title={`FILE::${vid.title}`}
                            noPadding
                            className="h-full hover:-translate-y-2 transition-all duration-300 flex flex-col overflow-hidden"
                        >
                            <div className={`relative overflow-hidden border-b-4 border-black group-hover:border-neon-green transition-colors ${i % 3 === 0 ? 'aspect-video lg:aspect-[21/9]' : 'aspect-video'}`}>
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

                                <div className="absolute top-4 left-4 flex gap-2">
                                    <span className="text-[8px] font-bold px-2 py-1 bg-black text-white border border-white/20 whitespace-nowrap uppercase tracking-widest shadow-pixel-sm">
                                        {vid.rarity}
                                    </span>
                                </div>
                            </div>

                            <div className="p-4 md:p-6 flex-1 flex flex-col">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex flex-col gap-1">
                                        <span className="text-[10px] md:text-xs text-cyber-pink font-bold tracking-[0.2em]">{vid.category}</span>
                                        <h3 className="text-sm md:text-fluid-lg text-white group-hover:text-retro-yellow transition-colors leading-none truncate max-w-[200px] lg:max-w-none">
                                            {vid.title}
                                        </h3>
                                    </div>
                                    <span className="text-[8px] md:text-[10px] text-gray-500 font-mono mt-1 shrink-0">{vid.date}</span>
                                </div>

                                {i % 3 === 0 && (
                                    <p className="text-gray-400 text-fluid-xs mb-6 hidden md:block leading-relaxed max-w-2xl">
                                        Direct transmission from the Vinconium Sector. This data packet contains experimental research protocols and decoded frequency updates from the latest server cycle.
                                    </p>
                                )}

                                <div className="mt-auto flex flex-col xl:flex-row justify-between xl:items-center pt-6 border-t border-white/5 gap-4">
                                    <div className="flex gap-4 items-center overflow-hidden">
                                        <span className="text-[10px] text-gray-500 whitespace-nowrap uppercase tracking-widest">{vid.views} DECIDED</span>
                                        <div className="h-1 w-16 bg-white/5 rounded-full hidden sm:block">
                                            <div className="h-full bg-neon-green/30 w-3/4"></div>
                                        </div>
                                    </div>
                                    <a
                                        href={vid.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-full xl:w-auto"
                                    >
                                        <PixelButton variant="neon" className="px-4 py-2 whitespace-nowrap text-[10px] w-full">
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
