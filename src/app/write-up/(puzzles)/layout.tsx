import Link from 'next/link';

export default function PuzzleLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <main className="pt-0 md:pt-10 lg:pt-10 pb-16 px-4 min-h-screen">
            <div className="max-w-4xl p-2 mx-auto">
                <Link
                    href="/write-up"
                    className="inline-block text-xs text-gray-400 hover:text-neon-green mb-6 transition-colors"
                >
                    ← BACK TO WRITE UPS
                </Link>
                <article className="prose text-md prose-invert prose-green max-w-none font-sans">
                    {children}
                </article>
            </div>
        </main>
    );
}
