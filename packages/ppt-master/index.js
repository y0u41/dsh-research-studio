import { open, stat } from 'node:fs/promises';
import path from 'node:path';

const GUIDE_CANDIDATES = ['skills/ppt-master/SKILL.md', 'SKILL.md', 'ppt-master/SKILL.md'];
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
  '# PPT Master',
  '',
  'Turn a document, a set of notes, or a topic into a natively editable PowerPoint deck.',
  'This is the bridge skill registered by the PPT Master panel. The authoritative workflow lives in the local checkout at `skills/ppt-master/SKILL.md`. When a repository path is known, call `ppt_master_guide` with that path and follow the returned guide; this text is the fallback when no checkout is available.',
  '',
  'Upstream: https://github.com/hugohe3/ppt-master (MIT).',
  '',
  '## Workflow',
  '',
  '1. **Intake.** Identify the source material (PDF, DOCX, web page, images, or pasted text) and the goal. Ask only for what blocks the work.',
  '2. **Narrative.** State the argument in 3-5 sentences and propose a page outline before designing.',
  '3. **Spec.** Fix the canvas (16:9 by default), page count, template route, and chart handling. Confirm the spec unless the user explicitly asked for quick generation.',
  '4. **Design.** Work page by page; content before decoration. Mark gaps as `[MATERIAL GAP]` instead of inventing material.',
  '5. **Export.** Produce a native `.pptx` with editable shapes and text. Use native charts and tables (`--native-charts-and-tables`) when the user needs editable data.',
  '6. **Report.** Give the output path and a one-line takeaway for each slide.',
  '',
  '## Rules',
  '',
  '- Never invent facts, numbers, citations, or sources; mark assumptions explicitly.',
  '- Keep every element editable. Do not flatten text into images.',
  '- The pipeline runs on the user\'s machine. Model calls, plus any search, image, or speech service the user enables, are the only outbound paths.',
  '- If the repository or its Python environment is missing, say what is needed instead of pretending to run it.',
  '- The user decides the question, the structure, and the final wording; the tool handles the assembly.',
].join('\n');

/**
 * Register a read-only tool that hands the agent the real PPT Master workflow
 * guide from a local checkout. It does not run any upstream script.
 * @param ctx - context providing the tool and skill registries.
 */
export function apply(ctx) {
  ctx.effect(
    () =>
      ctx.skills.register({
        name: 'ppt-master',
        description:
          'Turn documents or a topic into a natively editable PowerPoint deck with the PPT Master workflow.',
        whenToUse:
          'Use when the user asks for a presentation or deck (PPT/PPTX) from a PDF, DOCX, web page, notes, or a topic, especially when the result must stay editable in PowerPoint.',
        source: 'plugin:@dsh-research-studio/ppt-master',
        content: SKILL_CONTENT,
      }),
    'ppt-master: runtime skill',
  );

  ctx.tools.register({
    name: 'ppt_master_guide',
    description:
      'Read the workflow guide (SKILL.md) from a local PPT Master checkout. Use it before following the PPT Master pipeline; it returns the guide text or explains which files are missing.',
    parameters: {
      type: 'object',
      properties: {
        repoPath: {
          type: 'string',
          description: 'Absolute path to the local ppt-master repository.',
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
        return { text: 'Provide repoPath: the absolute path to the local ppt-master repository.' };
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
          '. Expected skills/ppt-master/SKILL.md or SKILL.md in the repository root.',
      };
    },
  });
}
