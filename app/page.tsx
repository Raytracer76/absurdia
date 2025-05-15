// app/page.tsx
import ideas from "@/data/ideas.json";
import Link from "next/link";

export default function Home() {
  return (
    <main className="p-8 text-white">
      <h1 className="text-2xl font-bold mb-4">Bienvenue sur Absurdia.ai</h1>
      <p className="mb-6">Explorez nos idées absurdes et inutiles :</p>
      <ul className="space-y-3">
        {ideas.map((idea) => (
          <li key={idea.idea_id}>
            <Link
              href={`/${idea.idea_id}`}
              className="text-blue-400 underline hover:text-blue-200"
            >
              🌟 {idea.nom_idee}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
