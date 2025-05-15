import ideas from "@/data/ideas.json";
import SonnetWeatherUI from "@/components/SonnetWeatherUI";

export async function generateStaticParams() {
  return ideas.map((idea) => ({ slug: idea.idea_id }));
}

export default function IdeaPage({ params }: { params: { slug: string } }) {
  const idea = ideas.find((i) => i.idea_id === params.slug);
  if (!idea) return <div>Idée introuvable.</div>;

  const renderInteraction = () => {
    switch (idea.type) {
      case "sonnetweather":
        return <SonnetWeatherUI />;
      default:
        return null;
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">{idea.nom_idee}</h2>
      <p className="text-neutral-400 italic mb-4">{idea.pitch_rapide}</p>
      <p className="whitespace-pre-wrap text-sm mb-8">{idea.explication_detaillee}</p>
      {renderInteraction()}
    </div>
  );
}