# Personal Companion integration

This branch adds a shared LibreChat deployment skill and its research notes. It does not replace LibreChat's chat interface or claim that a skill by itself provides new model abilities.

## What is included

- `skill/personal-companion/SKILL.md`: behavioral instructions for adapting between guide, teacher, challenger, strategist, builder, researcher, operator, and companion behaviors.
- `docs/personal-companion/RESEARCH_NOTES.txt`: research-informed design principles and source links.

LibreChat's deployment-skill system loads skills from the repository's configured deployment skills directory. This repository already documents `skill/` as the shared deployment-skills directory. Confirm that deployment skills and Skills are enabled in your running instance; then restart the server so the new skill is loaded. The skill is shared deployment guidance, not a private memory store.

## Suggested welcome copy

In your deployment's `librechat.yaml`, consider setting:

```yaml
interface:
  customWelcome: "I'm here. Tell me what's happening — I'll help you think, learn, build, plan, or just talk."
```

Merge this into your existing `interface` section; do not replace the rest of your configuration.

## Enable the skill

1. Deploy or check out branch `feat/personal-intelligence-companion`.
2. Confirm the deployment's skills feature is enabled and its deployment skills directory points to the repository's `skill/` directory (or copy `skill/personal-companion/` into the configured deployment skills directory).
3. Restart LibreChat.
4. In the Skills interface, verify that **Personal Companion** is visible and available. If the server's skill loader or feature flags differ in your deployment, follow the documentation for that exact LibreChat version.

## Memory and personalization

LibreChat has user memory preferences, but memory must be enabled and available to the chosen model/configuration. This skill tells the assistant how to use available memory carefully; it does not create cross-service memory or automatically import ChatGPT conversations. Import only the context you want LibreChat to retain, and inspect/correct stored memories using the features your deployment actually exposes.

## What is not implemented by this branch

This is a first integration layer, not the finished dream system. It does not add a new autonomous planner service, background monitoring, calendar/device access, new model providers, or a custom animated companion UI. Those require separate implementation, permissions, integrations, and testing. LibreChat's existing configured providers, agents, tools, and memory remain the runtime capabilities.

## Validation checklist

- [ ] Skill appears after restart.
- [ ] Ask it to explain a topic and confirm it teaches at the right level.
- [ ] Ask it to challenge you and confirm it gives a bounded task with a clear success condition.
- [ ] Tell it you only want to talk and confirm it does not force a productivity plan.
- [ ] Correct a remembered goal and check whether future replies follow the newer fact.
- [ ] Disable memory and verify the assistant does not claim to remember prior sessions.
- [ ] Confirm no API keys, private memories, or secrets were added to this repository.
