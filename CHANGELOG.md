# Changelog

All notable changes to this repository are documented here.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-11-09

First public, source-distributed release. Two independently installable DSH
workspace panels, extracted from the author's local plugins into one governed
repository.

### Added

- **PPT Master panel** (`packages/ppt-master`): sidebar entry and main panel for
  composing a PPT Master workflow prompt. Fields for source/topic, canvas,
  page count, pacing, route, native charts, and local repository path.
- **Academic Research Skills panel** (`packages/academic-research-skills`):
  sidebar entry and main panel for composing an ARS prompt, with five skill
  groups, 33 single-skill modes, six-stage overview, checkpoint and integrity
  gate requirements, and an explicit integrity boundary.
- Live prompt preview, copy, and **Place in a new session** action; the prompt
  is placed in the composer and is not sent automatically.
- Browser-local form persistence (`dsh.ppt-master.v1`, `dsh.ars.v1`) with
  validation and graceful fallback.
- Local directory picker and debounced path-readability check.
- Host runtime skills `ppt-master` / `academic-research-skills`, with upstream
  attribution and integrity boundaries.
- Read-only guide tools `ppt_master_guide` / `ars_guide`, bounded to 12,000
  characters, with an explicit `[truncated]` marker.
- Bilingual UI (zh/en) and bilingual package metadata.
- Theme-token-only UI, keyboard support, focus rings, status text, and
  reduced-motion handling.
- Repository contract tests, render smoke tests, host smoke tests, and a
  one-command verification script.
- Five-layer documentation (business/delivery, architecture/code,
  quality/testing, cross-cutting, red lines), design system, contracts,
  release process, acceptance matrix, and five ADRs.
- GitHub issue/PR templates and a CI workflow for static verification.

### Changed

- Package ids moved from local-only names to
  `@dsh-research-studio/ppt-master` and
  `@dsh-research-studio/academic-research-skills`.
- Bundle rows and runtime skill `source` strings now use the public package
  names.
- Guide tools now read a bounded UTF-8 prefix instead of loading the whole
  `SKILL.md` before truncation.
- Repository root and PPT package are MIT; the ARS package is
  CC BY-NC 4.0 to respect its upstream license.

### Fixed

- Host tool output schema now uses object-level `required: ['text']`; the
  previous property-level form was rejected by DSH's JSON schema validator.
- ARS prompt now states the integrity boundary explicitly: checks do **not**
  prove experiments ran, data is authentic, or results reproduce.
- PPT privacy copy no longer implies that only model calls can receive data.
- PPT hero no longer implies masters are always preserved; templates keep
  masters and layouts when a template is used.

### Security

- No network requests, telemetry, remote storage, `eval`, `innerHTML`, or
  dynamic code execution in client bundles.
- Host guide tools are read-only and do not execute upstream scripts.
- Repository scan for common secret patterns and legacy package prefixes.

### Known limitations

- No browser-level E2E; render tests use a VM and a React stub.
- No upstream execution tests; PPTX generation and the ARS pipeline require a
  local upstream checkout and environment.
- DSH client plugin APIs are still evolving; compatibility is not guaranteed
  across all DSH versions.
- The ARS panel is non-commercial; commercial use requires separate permission
  from the upstream rights holder.
- Path `ok` means readable, not executable; Python/dependency readiness is not
  verified by the panel.
- Documentation is Chinese-first; English coverage is the README and in-code UI
  strings.

[1.0.0]: https://github.com/OWNER/dsh-research-studio/releases/tag/v1.0.0
