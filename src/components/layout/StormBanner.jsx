import { company } from '../../content/company';

/**
 * Gulf Coast hurricane season runs June to November, and the week after a storm
 * is the week this business does a year of emergency work. Flipping
 * `company.stormMode` to true puts this bar above everything, on every page, and
 * flipping it back removes it -- one boolean rather than an edit to a template
 * somebody has to remember to undo in December.
 */
export default function StormBanner() {
  if (!company.stormMode) return null;
  return (
    <div className="bg-rigging-600 text-white">
      <div className="shell flex flex-wrap items-center justify-between gap-x-6 gap-y-1 py-2.5">
        <p className="text-[0.92rem] font-semibold">
          Storm response is running. Trees on structures are going first.
        </p>
        <a
          href={`tel:${company.phoneHref}`}
          className="pressable mono text-[0.86rem] font-semibold underline underline-offset-4 hover:no-underline"
        >
          Call {company.phone}
        </a>
      </div>
    </div>
  );
}
