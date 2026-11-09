import { open, stat } from 'node:fs/promises';
import path from 'node:path';

const GUIDE_CANDIDATES = ['academic-pipeline/SKILL.md', 'SKILL.md', 'skills/academic-research-skills/SKILL.md'];
const MAX_GUIDE_CHARS = 12000;

/**
 * Read at most a bounded prefix of a UTF-8 guide. Reading the whole file first
 * would let one oversized checkout block the tool call; the byte budget leaves
 * room for multi-byte characters before the character cap is applied.
 */
async function readGuideHead(file) {
  const handle = await open(file, 'r');
  try {
    const buffer = Buffer.alloc(MAX_GUIDE_CHARS * 4);
    const { bytesRead } = await handle.read(buffer, 0, buffer.length, 0);
    const body = buffer.subarray(0, bytesRead).toString('utf8');
    return body.length > MAX_GUIDE_CHARS ? body.slice(0, MAX_GUIDE_CHARS) + '\n\n[truncated]' : body;
  } finally {
    await handle.close();
  }
}

/** Services used by the tool and the runtime skill. */
export const inject = ['tools', 'skills'];

const SKILL_CONTENT = [
  '# Academic Research Skills',
  '',
  'Run a checkpointed academic research pipeline: research → write → review → revise → finalize.',
  'This is the bridge skill registered by the ARS panel. The authoritative workflow lives in the local checkout at `academic-pipeline/SKILL.md`. When a repository path is known, call `ars_guide` with that path and follow the returned guide; this text is the fallback when no checkout is available.',
  '',
  'Based on Academic Research Skills by Cheng-I Wu (https://github.com/Imbad0202/academic-research-skills), CC BY-NC 4.0.',
  '',
  '## Stages',
  '',
  '1. **Research.** RQ brief, methodology blueprint, verified annotated bibliography, synthesis, insight collection.',
  '2. **Write.** Outline approval first, then the draft; unsupported fills become `[MATERIAL GAP]`.',
  '2.5 **Integrity gate.** Run the seven-mode AI failure checklist and report each mode; then wait for the user to acknowledge the report.',
  '3. **Review.** Journal-fit reviewer plus three reviewers and a Devil\'s Advocate; produce a decision and a revision roadmap.',
  "3'. **Re-review.** Verify the revision against the roadmap; the revision loop is capped at two rounds.",
  '4. **Revise.** Point-by-point response, revised draft, delta report.',
  '4.5 **Final integrity gate.** Zero-tolerance re-run; no skip.',
  '5. **Finalize.** Format and venue-specific AI disclosure before rendering.',
  '6. **Process summary.** Process record, collaboration review, open issues.',
  '',
  '## Non-negotiables',
  '',
  '- Stop at every checkpoint and wait for the user. Do not run the whole pipeline in one pass.',
  '- Never fabricate citations, authors, years, or DOIs. Mark uncertainty and distinguish verified from unverified sources.',
  '- Report integrity findings item by item instead of saying "checked".',
  '- ARS checks citation existence, claim-to-source alignment, reported methodology, figure and reporting conformance. It does **not** prove that experiments were performed, that raw data are authentic, or that results reproduce.',
  '- The human owns the research question, method choice, data interpretation, and final conclusions.',
  '- If ARS is not installed, explain how to install it; do not pretend it ran.',
].join('\n');

/**
 * Register a read-only tool that hands the agent the real ARS pipeline guide
 * from a local checkout. It does not run any upstream script.
 * @param ctx - context providing the tool and skill registries.
 */
export function apply(ctx) {
  ctx.effect(
    () =>
      ctx.skills.register({
        name: 'academic-research-skills',
        description:
          'Run the ARS research pipeline (research, write, review, revise, finalize) with mandatory integrity gates and user checkpoints.',
        whenToUse:
          'Use when the user asks for academic research, a literature review, a paper draft, a peer review, a revision plan, or a systematic-review screening workflow with an auditable process.',
        source: 'plugin:@dsh-research-studio/academic-research-skills',
        content: SKILL_CONTENT,
      }),
    'ars: runtime skill',
  );

  ctx.tools.register({
    name: 'ars_guide',
    description:
      'Read the pipeline guide (academic-pipeline/SKILL.md) from a local Academic Research Skills checkout. Use it before following the ARS pipeline; it returns the guide text or explains which files are missing.',
    parameters: {
      type: 'object',
      properties: {
        repoPath: {
          type: 'string',
          description: 'Absolute path to the local academic-research-skills repository.',
        },
      },
    },
    output: {
      schema: {
        type: 'object',
        properties: {
          text: {
            type: 'string',
            description: 'Guide text, or an explanation when no guide file was found.',
          },
        },
        required: ['text'],
      },
      render(_args, value) {
        return [{ type: 'text', text: value.text }];
      },
    },
    async execute(args) {
      const root = typeof args.repoPath === 'string' ? args.repoPath.trim() : '';
      if (root === '') {
        return { text: 'Provide repoPath: the absolute path to the local academic-research-skills repository.' };
      }
      for (const relative of GUIDE_CANDIDATES) {
        const file = path.join(root, relative);
        try {
          const info = await stat(file);
          if (!info.isFile()) continue;
          return { text: '# ' + relative + '\n\n' + (await readGuideHead(file)) };
        } catch (error) {
          // try the next candidate location
        }
      }
      return {
        text:
          'No SKILL.md found under ' +
          root +
          '. Expected academic-pipeline/SKILL.md or SKILL.md in the repository root.',
      };
    },
  });
}
