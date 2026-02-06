import Link from 'next/link';

const puzzles = [
    { id: 7, title: "The 2048 Killer", href: "/write-up/puzzle-7", status: "solved" },
    { id: 6, title: "Deadman's Final Blow", href: "/write-up/puzzle-6", status: "solved" },
    { id: 5, title: "Digital Ransom", href: "/write-up/puzzle-5", status: "solved" },
    { id: 4, title: "Voice From The Above", href: "/write-up/puzzle-4", status: "solved" },
    { id: 3, title: "The Stolen Art", href: "/write-up/puzzle-3", status: "solved" },
    { id: 2, title: "The Stalker", href: "/write-up/puzzle-2", status: "solved" },
    { id: 1, title: "Genesis", href: "/write-up/puzzle-1", status: "solved" },
];

export default function WriteUpPage() {
    return (
        <main className="pt-24 pb-16 px-4 min-h-screen">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-2xl md:text-4xl font-bold text-neon-green mb-2 tracking-wider">
                    WriteUp...
                </h1>
                <p className="text-xs text-gray-400 mb-8">Vinconium Puzzle</p>

                <div className="grid gap-4">
                    {puzzles.map((puzzle) => (
                        <Link
                            key={puzzle.id}
                            href={puzzle.href}
                            className="group block bg-black/80 border border-white/10 p-4 hover:border-neon-green/50 hover:bg-black/90 transition-all"
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <span className="text-neon-green text-xs font-bold">
                                        #{puzzle.id}
                                    </span>
                                    <span className="text-white text-sm font-bold group-hover:text-neon-green transition-colors">
                                        {puzzle.title}
                                    </span>
                                </div>
                                <span
                                    className={`text-[10px] px-2 py-1 ${puzzle.status === "solved"
                                        ? "bg-neon-green/20 text-neon-green"
                                        : "bg-yellow-500/20 text-yellow-400"
                                        }`}
                                >
                                    {puzzle.status.toUpperCase()}
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </main>
    );
}
