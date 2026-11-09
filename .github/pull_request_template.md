## What changed

<!-- One or two sentences. Link the issue: Closes #123 -->

## Layer

- [ ] Business / delivery
- [ ] Architecture / code
- [ ] Quality / testing
- [ ] Cross-cutting foundation
- [ ] Red lines
- [ ] Documentation

## Verification

```text
npm test
```

<!-- Paste the final lines, or say which check could not run and why. -->

## Checklist

- [ ] I read `docs/red-lines.md`; this change does not fabricate execution or citations.
- [ ] `npm test` passes locally.
- [ ] New or changed behavior has a test.
- [ ] zh/en keys and placeholders stay aligned.
- [ ] No new runtime dependency, network request, `eval`, `innerHTML`, or hard-coded UI color.
- [ ] License, upstream attribution, and the ARS non-commercial boundary are intact.
- [ ] Docs / CHANGELOG updated when user-visible.
- [ ] The two packages remain independently installable (`@dsh-research-studio/ppt-master`, `@dsh-research-studio/academic-research-skills`).

## Risk and rollback

<!-- What could break? How would we revert? -->
