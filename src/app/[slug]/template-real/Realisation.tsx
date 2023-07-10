import { PageType, RealisationType } from "../page";
import he from "he";

export default function Realisation({
  page,
}: {
  page: PageType<RealisationType>;
}) {
  return (
    <main id="realisations">
      <section className="top">
        <div className="container">
          <h1>{he.decode(page.title)}</h1>
        </div>
      </section>
    </main>
  );
}
