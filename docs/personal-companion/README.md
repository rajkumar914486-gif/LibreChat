# Personal Companion

This branch adds the first usable companion layer to your LibreChat fork: a persistent behavioral skill, a custom new-chat launcher, enabled saved-memory/personalization settings in the example configuration, focused tests, and research-informed implementation notes.

## Included

- `skill/personal-companion/SKILL.md` — the assistant adapts between guide, teacher, challenger, strategist, builder, researcher, operator, and companion. It has explicit rules for stale memory, feasibility, care, user agency, and capability honesty.
- `client/src/components/Chat/PersonalCompanionPanel.tsx` — a responsive new-chat panel with five working prompt starters: **Help me think**, **Teach me**, **Challenge me**, **Build with me**, and **Just talk**. Each submits through LibreChat's existing chat submission flow.
- `client/src/components/Chat/__tests__/PersonalCompanionPanel.spec.tsx` — focused tests for rendering, challenge submission, and the no-agenda conversation path.
- `e2e/specs/mock/deployment-skills.spec.ts` and its setup — end-to-end coverage for loading the deployment skill alongside LibreChat's existing fixture.
- `librechat.example.yaml` — companion welcome text and saved-memory/personalization are enabled in the example config.
- `docs/personal-companion/RESEARCH_NOTES.txt` — research sources and design decisions.
- This installation and validation guide.

## Enable it in a deployment

The changes are on branch `feat/personal-intelligence-companion` and are proposed in a draft pull request. To try them, build/deploy that branch or merge it into your deployment's source tree first.

LibreChat documents `skill/` as its shared deployment-skills directory. Make sure your running instance is built from this branch, that the Skills feature is enabled for your user/model, and restart the server. Then verify **Personal Companion** appears in the Skills interface. Deployment skills are read-only shared instructions loaded at server startup, not a per-user memory store.

The new-chat panel is integrated into the existing landing page and uses the currently selected LibreChat endpoint/model. It does not silently switch providers or create new API credentials. The example config now enables LibreChat's saved-memory/personalization feature; this stores user memory in your configured LibreChat deployment, so keep that deployment private and review the saved items.

## Welcome text (optional)

Merge this into your existing `librechat.yaml` `interface:` block. Do not replace the rest of your configuration.

```yaml
interface:
  customWelcome: "I'm here. Tell me what's happening — I'll help you think, learn, build, plan, or just talk."
```

## Make personalization persist

LibreChat's saved-memory and Personalization features are enabled in the example configuration. The skill uses them only when they are actually available to the selected model/agent. Automatic memory updates from ordinary chat messages require a configured memory agent (an existing agent ID or a provider/model you have credentials for); that part is deliberately left as a commented example because this repository cannot know which provider credentials you have. Without a memory agent, saved memories can still be created, edited, deleted, and referenced manually.

The companion does not automatically import ChatGPT/Gemini/Claude histories or any external profile. Add only context you intentionally want LibreChat to retain. The memory settings do not give the model access to private files, another service's history, your calendar, or devices.

## What this does not claim

This is an incremental foundation, not a fully autonomous JARVIS clone. It does not add background monitoring, calendar/device control, an independent planning daemon, or cross-service memory synchronization. Those require separate integrations, permissions, and tests. It cannot make a weak model as capable as a stronger one merely by prompt. Existing LibreChat providers, tools, and security boundaries remain in force.

## Validation checklist

Run from a full local checkout with dependencies installed:

```bash
npm run test:client -- --runInBand PersonalCompanionPanel.spec.tsx
npm run typecheck --workspace @librechat/frontend
```

Also manually verify in the running application:
- [ ] The **Personal Companion** deployment skill appears after restart.
- [ ] Each new-chat card submits its intended prompt.
- [ ] Teaching is clear and appropriately scoped.
- [ ] Challenges have an observable success condition and do not inflate competence.
- [ ] **Just talk** does not force a task list.
- [ ] A recent explicit correction supersedes an old remembered goal.
- [ ] With memory disabled, the model does not claim cross-session recall.
- [ ] No secrets or private memory were committed to this repository.

The GitHub Actions checks are the authoritative build/test signal for this branch; review their status before deploying.
