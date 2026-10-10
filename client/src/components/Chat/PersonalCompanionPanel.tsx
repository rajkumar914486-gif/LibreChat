import { memo, useCallback } from 'react';
import {
  ArrowUpRight,
  BookOpen,
  BrainCircuit,
  Hammer,
  Heart,
  Sparkles,
  Swords,
} from 'lucide-react';
import { useLocalize, useSubmitMessage } from '~/hooks';

const companionPaths = [
  {
    title: 'Help me think',
    description: 'Untangle a question or decision',
    icon: BrainCircuit,
    prompt:
      'Be my thinking partner. Help me untangle what I am dealing with. First understand the real question, then help me reason clearly and identify one useful next step. Do not force a productivity plan if I only need to talk.',
  },
  {
    title: 'Teach me',
    description: 'Make a difficult idea click',
    icon: BookOpen,
    prompt:
      'Be my teacher. Start from my current understanding, explain the idea in the simplest accurate way, use one concrete example, and help me discover the next knowledge gap. Keep the explanation focused and practical.',
  },
  {
    title: 'Challenge me',
    description: 'Give me a fair, real test',
    icon: Swords,
    prompt:
      'Be my challenger. Based on the context available, give me one meaningful, realistic challenge that tests actual understanding or skill. Include a clear success condition. Do not inflate my progress or make the challenge unnecessarily large.',
  },
  {
    title: 'Build with me',
    description: 'Turn an idea into working code',
    icon: Hammer,
    prompt:
      'Be my technical build partner. Help me turn the current idea into a working result. Inspect the relevant context and constraints first, preserve what already works, break the work into testable increments, and be explicit about what has and has not been verified.',
  },
  {
    title: 'Just talk',
    description: 'No agenda required',
    icon: Heart,
    prompt:
      'I want to talk, not automatically receive a plan. Be present and respond naturally to what I share. Listen first; do not turn this into a task list unless I ask for advice.',
  },
];

function PersonalCompanionPanel() {
  const { submitMessage } = useSubmitMessage();
  const localize = useLocalize();

  const startPath = useCallback(
    (prompt: string) => {
      submitMessage({ text: prompt });
    },
    [submitMessage],
  );

  return (
    <section
      aria-labelledby="personal-companion-heading"
      className="mx-auto mt-5 w-full max-w-3xl px-2 sm:px-4"
    >
      <div className="mb-3 flex items-center justify-center gap-2 text-center">
        <span className="relative flex size-8 items-center justify-center rounded-full border border-cyan-500/30 bg-gradient-to-br from-cyan-400/20 via-sky-500/10 to-violet-500/20 text-cyan-600 shadow-sm dark:text-cyan-300">
          <Sparkles size={14} aria-hidden="true" />
        </span>
        <div>
          <h2
            id="personal-companion-heading"
            className="text-sm font-semibold tracking-wide text-text-primary"
          >
            {localize('com_ui_companion_heading')}
          </h2>
          <p className="mt-0.5 text-xs text-text-secondary">
            {localize('com_ui_companion_subtitle')}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {companionPaths.map(({ title, description, icon: Icon, prompt }) => (
          <button
            key={title}
            type="button"
            onClick={() => startPath(prompt)}
            className="border-border-medium/80 bg-surface-secondary/70 group relative flex min-h-[82px] flex-col items-start justify-between overflow-hidden rounded-2xl border p-3 text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-cyan-500/40 hover:bg-surface-tertiary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring-primary sm:min-h-[90px] sm:p-3.5"
            aria-label={`${title}: ${description}`}
          >
            <span className="flex w-full items-center justify-between">
              <span className="border-border-medium/70 flex size-8 items-center justify-center rounded-xl border bg-surface-primary text-text-secondary transition-colors group-hover:border-cyan-500/30 group-hover:text-cyan-600 dark:group-hover:text-cyan-300">
                <Icon size={16} aria-hidden="true" />
              </span>
              <ArrowUpRight
                size={14}
                aria-hidden="true"
                className="text-text-tertiary transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-cyan-600 dark:group-hover:text-cyan-300"
              />
            </span>
            <span className="mt-2 block">
              <span className="block text-sm font-medium text-text-primary">{title}</span>
              <span className="mt-0.5 block text-xs leading-4 text-text-secondary">
                {description}
              </span>
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}

export default memo(PersonalCompanionPanel);
