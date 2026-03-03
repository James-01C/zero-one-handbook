import { getAllSections } from '@/lib/content';
import { SectionCard } from '@/components/home/SectionCard';

export default function Home() {
  const sections = getAllSections();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Zero One Handbook</h1>
        <p className="mt-2 text-muted-foreground">
          SOPs, reference docs, policies, and guides for the Zero One Creative
          team.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {sections.map((section) => (
          <SectionCard key={section.slug} section={section} />
        ))}
      </div>
    </div>
  );
}
