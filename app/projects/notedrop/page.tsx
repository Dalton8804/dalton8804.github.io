import PageShell from "@/components/PageShell";

export default function NoteDrop() {
    return (
        <PageShell title="notedrop">
            <p>a macos menubar app to quickly jot down small notes. open it, type, hit enter — the whole thing takes less than a second and never steals focus.</p>

            <img
                src="/assets/NoteDropScreenshot.png"
                alt="NoteDrop menubar window"
            />
            <p>the menubar window in action.</p>

            <h2>Download</h2>
            <ul>
                <li><a href="https://github.com/Dalton8804/NoteDrop/releases/latest/download/NoteDrop-macos-arm64.dmg">macOS · Apple Silicon (.dmg)</a></li>
                <li><a href="https://github.com/Dalton8804/NoteDrop/releases/latest/download/NoteDrop-macos-x64.dmg">macOS · Intel (.dmg)</a></li>
            </ul>
            <p>not sure which one? apple menu → about this mac. a chip that starts with &quot;M&quot; (apple silicon) is arm64; an &quot;intel&quot; chip is x64.</p>
            <p>requires macOS 11 or later. <br /><a href="https://github.com/Dalton8804/NoteDrop/releases/latest" target="_blank" rel="noopener noreferrer">release notes &amp; older versions</a></p>

            <h2>Usage</h2>
            <ul>
                <li>Alt+Shift+O — open the window</li>
                <li>Enter — add the typed text as a note</li>
                <li>click a note to remove it</li>
            </ul>

            <h2>Roadmap</h2>
            <ul>
                <li>custom keybinds</li>
                <li>cli companion tool</li>
                <li>cloud sync</li>
                <li>obsidian integration</li>
                <li>notion integration</li>
            </ul>

            <h2>Links</h2>
            <ul>
                <li><a href="https://github.com/Dalton8804/NoteDrop" target="_blank" rel="noopener noreferrer">GitHub repo</a></li>
            </ul>
        </PageShell>
    );
}
