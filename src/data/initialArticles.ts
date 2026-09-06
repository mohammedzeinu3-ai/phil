import { Article } from '../types';

export const INITIAL_ARTICLES: Article[] = [
  {
    id: 'issue-36-algorithmic-self',
    issueNumber: 36,
    publishDate: 'September 4, 2026',
    weekLabel: 'Week 36 · September 2026',
    title: 'The Tyranny of the Frictionless Life',
    subtitle: 'On radical Sartreian freedom, predictive comfort, and the voluntary surrender of bad faith in the algorithmic era.',
    branch: 'Existentialism',
    readTimeMinutes: 11,
    coverImage: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1600&q=80',
    coverCaption: 'Rodin’s The Thinker reimagined under contemporary epistemic shadows.',
    author: {
      name: 'Dr. Alistair Vance',
      title: 'Editor & Philosophical Essayist',
      bio: 'Author of "The Unquiet Mind" and Senior Lecturer in Continental Philosophy. He edits The Weekly Dialectic every Friday.',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
    },
    summaryThesis: 'By engineering an existence free of friction, doubt, and resistance, modern algorithmic systems do not liberate our autonomy—they institutionalize what Jean-Paul Sartre diagnosed as "mauvaise foi" (bad faith). True human agency demands the vertigo of choosing without a predetermined trajectory.',
    discussionPrompt: 'When an algorithm predicts your taste with 95% accuracy before you even experience it, did you choose it, or did you merely consent to your own statistical ghost? Can authentic freedom survive in a world where uncertainty is treated as an engineering defect?',
    content: `### I. The Architecture of Preempted Desire

Every morning begins not with a deliberation, but with an anticipation executed on our behalf. The news feed curates what we ought to find distressing; the predictive dispatch anticipates what we will consume; the route-planner eliminates the possibility of the wrong turn. We call this optimization. But philosophy compels us to interrogate: what precisely is being optimized, and at what existential expense?

In *Being and Nothingness* (1943), Jean-Paul Sartre offered a terrifying proposition: human beings are not merely free; we are "condemned to be free." To be human is to exist prior to any defined essence (*l'existence précède l'essence*). There is no blueprint, no divine ledger, no mathematical formula that dictates what a life ought to be. We are thrown into the world, and every hesitation, every refusal to decide, is itself an irrevocable choice.

> "Man is condemned to be free; because once thrown into the world, he is responsible for everything he does."
> — Jean-Paul Sartre, *Existentialism is a Humanism*

Yet human beings abhor the dizzying vertigo of pure freedom. Sartre termed our instinctual evasion of this burden *mauvaise foi*—bad faith. In bad faith, an individual pretends they are an object, a mere thing buffeted by circumstance, a cog in an immutable machine. When the 19th-century waiter plays at being a waiter, exaggerating his mechanical courtesies, he is soothing his dread by pretending he has no choice but to be precisely what he is.

Today, however, bad faith no longer requires individual psychological denial. It has been institutionalized as infrastructure.

---

### II. The Statistical Ghost as Substitute Self

Consider the mechanism of predictive feeds. They do not operate through coercion; their violence is gentle, velvet-lined. By observing thousands of discrete interactions—the micro-pause before scrolling, the pupil dilation, the purchasing cadence—the system constructs what Byung-Chul Han terms our "digital homunculus."

This homunculus is not you. It is a statistical shadow derived entirely from your past behaviors. Yet, because the algorithm continuously reflects this ghost back at you, you begin to mold your future self to match it.

Here lies the ontological trap:
1. The past is the realm of what Sartre called the *facticity*—the unchangeable, inert facts of what has already transpired.
2. Freedom, conversely, resides entirely in the *transcendence*—the radical capacity of human consciousness to rupture continuity, to contradict its own historical momentum, to say: *"I was that, but I shall be something entirely contrary."*

When you delegate your reading lists, your romantic inclinations, and your moral compass to algorithmic recommendation engines, you subordinate transcendence to facticity. You allow past statistical averages to dictate future metaphysical possibilities.

---

### III. The Value of the Unchosen Encounter

In his meditation on technology, Martin Heidegger cautioned against seeing the world merely as *Bestand*—a "standing reserve" of resources waiting to be efficiently ordered and consumed. 

When you wander into an old library and pick a book purely because its spine is worn or its title cryptic, you surrender to contingency. You expose your consciousness to an alien intellect that your past preferences would never have sanctioned. But when recommendation engines gatekeep the horizon of what you encounter, they construct an epistemic panopticon. You are never exposed to the genuinely shocking; you are merely exposed to variations of your preexisting dispositions.

The result is what Friedrich Nietzsche warned of in *Thus Spoke Zarathustra*: the arrival of the "Last Man"—the being who desires neither strife nor agony, who seeks only agreeable warmth and mild digestion:

> "One still works, for work is a form of entertainment. But one is careful lest the entertainment be too strenuous. One no longer becomes poor or rich: both are too burdensome. Who still wants to rule? Who still wants to obey? Both are too burdensome."
> — Friedrich Nietzsche, *Thus Spoke Zarathustra*

---

### IV. An Ethic of Deliberate Friction

What, then, is the Socratic duty of the contemporary thinker? It cannot be naive Luddism; the engines of computation are neither inherently malevolent nor easily disassembled.

Rather, we must formulate an **Ethics of Deliberate Friction**:

- **Cultivate the Rupture**: Systematically introduce deliberate contradiction into your intellectual habits. Read the thinker whose premises fill you with visceral repulsion.
- **Honor the Unproductive Moment**: Refuse to measure contemplative quietude by metrics of output or cognitive efficiency.
- **Embrace Epistemic Humility**: Acknowledge that the desires you experience with the greatest immediacy may not be your authentic volition, but the harvested yields of behavioral architecture.

To exist authentically in the present century is an act of defiance. It requires us to step out of the frictionless trajectory designed by machines, look into the abyss of our own undetermined will, and claim the heavy, terrifying dignity of choosing for ourselves.`,
    quotes: [
      {
        quote: 'Man is condemned to be free; because once thrown into the world, he is responsible for everything he does.',
        author: 'Jean-Paul Sartre',
        source: 'Being and Nothingness (1943)'
      },
      {
        quote: 'The digital panopticon is not an empire of freedom, but an empire of transparency where every desire is already mapped before it is born.',
        author: 'Byung-Chul Han',
        source: 'Psychopolitics: Neoliberalism and New Technologies of Power'
      }
    ],
    references: [
      {
        title: 'Being and Nothingness: An Essay on Phenomenological Ontology',
        author: 'Jean-Paul Sartre',
        year: '1943',
        note: 'Classic statement of existential freedom and bad faith.'
      },
      {
        title: 'The Question Concerning Technology',
        author: 'Martin Heidegger',
        year: '1954',
        note: 'Crucial critique of instrumental enframing (Gestell).'
      },
      {
        title: 'Psychopolitics: Neoliberalism and New Technologies of Power',
        author: 'Byung-Chul Han',
        year: '2017',
        note: 'Exploration of smart power and self-exploitation.'
      }
    ],
    dilemma: {
      id: 'dilemma-36',
      question: 'The Omniscient Life-Advisor: Would you accept a system that perfectly calculates your optimal life?',
      context: 'Imagine an AI system that predicts with 100% accuracy which career, partner, and daily habits will maximize your lifetime flourishing and subjective happiness. However, following its advice means you never exercise blind, uncalculated choice again.',
      options: [
        {
          id: 'opt-reject',
          label: 'Reject the Advisor: Struggle and unoptimized error are essential to authentic human dignity.',
          philosophicalStance: 'Existentialist / Kantian Autonomy',
          votes: 142
        },
        {
          id: 'opt-accept',
          label: 'Accept the Advisor: Rejecting guaranteed flourishing out of vanity or pride is irrational.',
          philosophicalStance: 'Rule Utilitarian / Pragmatist',
          votes: 68
        },
        {
          id: 'opt-partial',
          label: 'Selective Consultation: Treat it as a Socratic interlocutor, but preserve final veto power.',
          philosophicalStance: 'Aristotelian Phronesis (Practical Wisdom)',
          votes: 189
        }
      ],
      userVotedOptionId: undefined
    },
    likesCount: 184,
    bookmarksCount: 92,
    isLiked: false,
    isBookmarked: false,
    isPublished: true
  },
  {
    id: 'issue-35-ship-of-theseus-mind',
    issueNumber: 35,
    publishDate: 'August 28, 2026',
    weekLabel: 'Week 35 · August 2026',
    title: 'The Digital Ship of Theseus',
    subtitle: 'If your neurons are replaced grain by grain with synthetic silicon, at what threshold does the "I" perish?',
    branch: 'Metaphysics',
    readTimeMinutes: 9,
    coverImage: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1600&q=80',
    coverCaption: 'Plutarch’s enduring maritime puzzle transposed onto computational consciousness.',
    author: {
      name: 'Dr. Alistair Vance',
      title: 'Editor & Philosophical Essayist',
      bio: 'Author of "The Unquiet Mind" and Senior Lecturer in Continental Philosophy.',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
    },
    summaryThesis: 'Personal identity is not an indivisible metaphysical substance, but an ongoing relational pattern. If we replace our biological cognition gradually without interrupting phenomenal awareness, Derek Parfit’s "Relation R" shows that survival matters, not strict numerical identity.',
    discussionPrompt: 'If a synthetic replica woke up tomorrow with every single one of your memories, emotions, and moral convictions, while your biological body painlessly ceased to exist, would you have survived the night—or were you replaced by an identical stranger?',
    content: `### The Classical Riddle of the Timber

Plutarch recounted the ancient paradox of the ship on which Theseus and the youths of Athens returned from Crete:

> "The ship wherein Theseus and the youth of Athens returned had thirty oars, and was preserved by the Athenians down even to the time of Demetrius Phalereus, for they took away the old planks as they decayed, putting in new and stronger timber in their place, insomuch that this ship became a standing example among the philosophers... one side holding that the ship remained the same, and the other contending that it was not the same."

Now translate this classic paradox into the theater of human subjective experience.

Suppose neurosurgeons replace a single damaged neuron in your hippocampus with an identical microscopic silicon transistor that performs the exact identical computational and electrochemical function. You awake from anesthesia: your memories are intact, your taste for bitter coffee unchanged, your sorrow over lost loves undiminished.

Next month, they replace ten thousand. Then ten million. Eventually, after ten years of gradual interventions, zero percent of your cranial vault contains organic carbon; it is entirely an architecture of patterned semiconductors.

Are you still alive? Or did the original person slowly bleed out into nonexistence while a synthetic mimic took up residence?

---

### Derek Parfit and the Illusion of Numerical Identity

In his groundbreaking work *Reasons and Persons* (1984), the late Oxford philosopher Derek Parfit argued that our obsessive belief in a singular, indivisible Ego is a metaphysical error.

Parfit distinguished between:
- **Numerical Identity**: Is Object A identical to Object B in the strict mathematical sense ($A = B$)?
- **Psychological Continuity and Connectedness (Relation R)**: Does the mental state at Time 2 inherit the memories, intentions, dispositions, and narrative trajectory of Time 1?

Parfit’s radical conclusion is that **identity is not what matters for survival**. What matters is Relation R—psychological connectedness and continuity with the right kind of cause.

If this is true, then worrying whether the uploaded or silicon-based version of you is "really you" is as nonsensical as asking whether a nation remains "the same nation" after every citizen who signed its founding charter has passed away. The pattern persists; the illusion of an indivisible homunculus within is what dissolves.`,
    quotes: [
      {
        quote: 'My death will break the more direct relations between my present experiences and future experiences, but it will not break the relation of psychological connectedness.',
        author: 'Derek Parfit',
        source: 'Reasons and Persons (1984)'
      }
    ],
    references: [
      {
        title: 'Reasons and Persons',
        author: 'Derek Parfit',
        year: '1984',
        note: 'Masterpiece on personal identity and ethics.'
      },
      {
        title: 'An Essay Concerning Human Understanding',
        author: 'John Locke',
        year: '1689',
        note: 'Introduced consciousness and memory as the locus of identity.'
      }
    ],
    dilemma: {
      id: 'dilemma-35',
      question: 'The Teletransporter Paradox: Would you step into the booth?',
      context: 'A booth scans your molecular structure, destroys your physical body on Earth, and beams the precise blueprint to Mars where an atom-for-atom replica is constructed in seconds.',
      options: [
        {
          id: 'tele-refuse',
          label: 'Refuse: It is suicide followed by murder; a clone on Mars is not me.',
          philosophicalStance: 'Animalism / Biological Essentialism',
          votes: 210
        },
        {
          id: 'tele-accept',
          label: 'Accept: If psychological continuity is unbroken, I have survived.',
          philosophicalStance: 'Parfitian Psychological Continuity',
          votes: 114
        }
      ],
      userVotedOptionId: undefined
    },
    likesCount: 156,
    bookmarksCount: 88,
    isLiked: false,
    isBookmarked: false,
    isPublished: true
  },
  {
    id: 'issue-34-epistemic-humility-socrates',
    issueNumber: 34,
    publishDate: 'August 21, 2026',
    weekLabel: 'Week 34 · August 2026',
    title: 'The Moral Duty of Not Knowing',
    subtitle: 'Why Socratic ignorance and Pyrrhonian skepticism are our only defense against moral fanaticism.',
    branch: 'Epistemology',
    readTimeMinutes: 8,
    coverImage: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1600&q=80',
    coverCaption: 'The ancient Agora: where certainty was interrogated and revealed as presumption.',
    author: {
      name: 'Dr. Alistair Vance',
      title: 'Editor & Philosophical Essayist',
      bio: 'Author of "The Unquiet Mind" and Senior Lecturer in Continental Philosophy.',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
    },
    summaryThesis: 'Certainty is not a sign of intellectual vigor; it is an emotional defense mechanism against ambiguity. To practice epistemic humility—admitting the boundaries of our justification—is not passive weakness, but an active civic and moral obligation.',
    discussionPrompt: 'Which of your most fiercely defended beliefs would you have the courage to abandon if Socrates cross-examined you today? How can we distinguish genuine conviction from tribal loyalty?',
    content: `### The Oracle at Delphi

When Chaerephon asked the Pythia at Delphi whether any mortal was wiser than Socrates, the priestess replied with an unequivocal negative: no man was wiser.

Socrates was bewildered. He knew he possessed neither specialized craft nor esoteric wisdom. To unravel the riddle, he embarked on his famous interrogations through the public markets of Athens, questioning politicians, tragic poets, and artisans.

His realization remains the foundation of Western critical thought:

> "I am wiser than this man, for neither of us appears to know anything great and good; but he fancies he knows something, although he knows nothing; whereas I, as I do not know anything, so I do not fancy I do."
> — Plato, *Apology* (21d)

---

### Epistemic Vice in the Networked Agora

In contemporary discourse, uncertainty is treated as cognitive delinquency. The algorithms that power public debate reward immediate declarations, moral certainty, and unambiguous polarization. 

Philosopher Miranda Fricker has written extensively on **epistemic injustice** and the virtues required of honest inquirers. Chief among these is what we might term *doxastic restraint*—the willingness to withhold judgment when the evidence is incomplete, rather than filling the void with tribal dogma.

To say "I do not know" is not an admission of defeat; it is the necessary threshold through which real philosophy begins.`,
    quotes: [
      {
        quote: 'The only true wisdom is in knowing you know nothing.',
        author: 'Socrates (via Plato)',
        source: 'Plato, Apology'
      }
    ],
    references: [
      {
        title: 'The Apology of Socrates',
        author: 'Plato',
        year: '399 BCE',
        note: 'The trial and philosophical manifesto of Socrates.'
      },
      {
        title: 'Epistemic Injustice: Power and the Ethics of Knowing',
        author: 'Miranda Fricker',
        year: '2007',
        note: 'Explores testimonial and hermeneutical injustice.'
      }
    ],
    likesCount: 129,
    bookmarksCount: 64,
    isLiked: false,
    isBookmarked: false,
    isPublished: true
  },
  {
    id: 'issue-33-nozick-experience-machine',
    issueNumber: 33,
    publishDate: 'August 14, 2026',
    weekLabel: 'Week 33 · August 2026',
    title: 'Nozick’s Machine and the Price of Bliss',
    subtitle: 'Why we continue to value contact with reality even when delusion guarantees flawless happiness.',
    branch: 'Ethics',
    readTimeMinutes: 10,
    coverImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1600&q=80',
    coverCaption: 'The boundary between simulated ecstasy and authentic struggle.',
    author: {
      name: 'Dr. Alistair Vance',
      title: 'Editor & Philosophical Essayist',
      bio: 'Author of "The Unquiet Mind" and Senior Lecturer in Continental Philosophy.',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
    },
    summaryThesis: 'Robert Nozick devised the Experience Machine to refute psychological and ethical hedonism. Our refusal to plug in proves that human flourishing requires being a certain kind of person and acting in real relation with the world, not merely floating in subjective euphoria.',
    discussionPrompt: 'If you were offered a painless, permanent immersion where you write the greatest novel of all time and eradicate poverty—knowing it is all an illusion—would you plug in? If not, what does that reveal about what you truly value?',
    content: `### The Thought Experiment That Shook Utilitarianism

In *Anarchy, State, and Utopia* (1974), Robert Nozick posed a simple, devastating hypothetical:

> "Suppose there were an experience machine that would give you any experience you desired. Superduper neuropsychologists could stimulate your brain so that you would think and feel you were writing a great novel, or making a friend, or reading an interesting book. All the time you would be floating in a tank, with electrodes attached to your brain. Should you plug into this machine for life, preprogramming your life's experiences?"

Nozick asked: *What else can matter to us, other than how our lives feel from the inside?*

The answer is: quite a lot. Most people, upon serious reflection, reject the machine.

---

### Three Things That Matter Beyond Sensation

Nozick identified three crucial reasons why we recoiled from the machine:

1. **We want to DO certain things, not just have the experience of doing them.** Writing a poem is not merely the endorphin rush of feeling proud; it is the grueling, frustrating act of translating consciousness into language.
2. **We want to BE a certain sort of person.** Someone floating in a tank is an indeterminate blob. There is no courage in a simulated crisis, no loyalty in a fabricated relationship.
3. **Plugging into an experience machine limits us to a human-made reality.** It severs contact with any deeper reality, leaving us confined within the boundaries of what psychologists or engineers can program.

Hedonism claims that pleasure is the sole intrinsic good and pain the sole intrinsic bad. The Experience Machine is the ultimate refutation of that claim: we crave truth and authenticity, even when they break our hearts.`,
    quotes: [
      {
        quote: 'We learn that something matters to us in addition to experience by imagining an experience machine and then realizing that we would not use it.',
        author: 'Robert Nozick',
        source: 'Anarchy, State, and Utopia (1974)'
      }
    ],
    references: [
      {
        title: 'Anarchy, State, and Utopia',
        author: 'Robert Nozick',
        year: '1974',
        note: 'Includes the famous Experience Machine thought experiment.'
      }
    ],
    likesCount: 142,
    bookmarksCount: 71,
    isLiked: false,
    isBookmarked: false,
    isPublished: true
  }
];
