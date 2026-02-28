export default function PageShell({ title, children }) {
    return (
        <div id="main-container">
            <header id="main-header">{title}</header>
            <main id="main-content">{children}</main>
        </div>
    );
}
