import Link from 'next/link';

export default function WriteUpLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <main className="pt-24 pb-16 px-4 min-h-screen">
            <div className="max-w-4xl mx-auto">
                <Link
                    href="/write-up"
                    className="inline-block text-xs text-gray-400 hover:text-neon-green mb-6 transition-colors"
                >
                    ← BACK TO WRITE UPS
                </Link>
                <article className="prose prose-invert max-w-none">
                    {children}
                </article>
            </div>
        </main>
    );
}
