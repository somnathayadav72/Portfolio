import Link from "next/link";

export default function NotFound() {
  return (
    <main className="notFound">
      <p className="mono">404 / FIELD NOTE NOT FOUND</p>
      <h1>That page isn’t in the book.</h1>
      <Link className="button button--dark" href="/">Return to the portfolio</Link>
    </main>
  );
}
