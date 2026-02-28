import PageShell from "@/components/PageShell";
import Link from "next/link";

export default function Projects() {
    return (
        <PageShell title="projects">
            <blockquote>pictures + links to source coming soon</blockquote>

            <h2>Personal</h2>

            <h3><a href="https://github.com/Dalton8804/NoteDrop" target="_blank" rel="noopener noreferrer">NoteDrop</a></h3>

            <h3><a href="https://thuum.daltonavery.com/" target="_blank" rel="noopener noreferrer">Thu&apos;um</a></h3>

            <h3><a href="https://github.com/Dalton8804/linked" target="_blank" rel="noopener noreferrer">Linked</a></h3>

            <h3><Link href="/fish">Fish</Link></h3>
            <ul>
                <li>inspired by argonautcode on youtube</li>
            </ul>

            <h2>Texas A&amp;M University</h2>

            <h3>Drone Route Planning</h3>

            <h3>DaltonOS</h3>

            <h2>Lamar University</h2>

            <h3>Thundershell</h3>

            <h3>Poker</h3>
        </PageShell>
    );
}
