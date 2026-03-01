import PageShell from "@/components/PageShell";
import Link from "next/link";

export default function Books() {
    return (
        <PageShell title="books">
            <blockquote>Sometimes, immersed in his books, there would come to him the awareness of all that he did not know, of all that he had not read; and the serenity for which he labored was shattered as he realized the little time he had in life to read so much, to learn what he had to know. - John Williams, Stoner</blockquote>
            <blockquote><Link href="/books/quotes">more of my favorite quotes &gt;</Link></blockquote>

            <h2>In Progress</h2>
            <h3>Algorithms to Live By</h3>

            <h2>2026</h2>
            <h3>Software Engineering after the Vibe Shift</h3>
            <h3>A Short Stay in Hell</h3>
            <h3>Stoner</h3>
            <h3>House of Flame and Shadow</h3>
            <h3>I Who Have Never Known Men</h3>
            <h3>House of Sky and Breath</h3>

            <h2>2025</h2>
            <h3>Dark Matter</h3>
            <h3>House of Earth and Blood</h3>
            <h3>Sword of Kaigen</h3>
            <h3>Heretics of Dune</h3>
            <h3>I, Robot</h3>
            <h3>The Housemaid</h3>
            <h3>Project Hail Mary</h3>
            <h3>God Emperor of Dune</h3>
            <h3>Kingdom of Ash</h3>
            <h3>Tower of Dawn</h3>
            <h3>Empire of Storms</h3>
            <h3>Queen of Shadows</h3>
            <h3>Assassin&apos;s Blade</h3>
            <h3>Heir of Fire</h3>
            <h3>Thinking in Systems: A Primer</h3>
            <h3>Crown of Midnight</h3>
            <h3>Children of Dune</h3>

            <h2>2024</h2>
            <h3>Dune + Dune Messiah</h3>
            <h3>ACOTAR</h3>
            <h3>Throne of Glass</h3>
            <h3>The Stranger</h3>
            <h3>Tuesdays with Morrie</h3>
            <h3>The Last Lecture</h3>
        </PageShell>
    );
}
