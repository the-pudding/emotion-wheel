export const wheelSections = [
	{
		color: "#fc5132", // Orange
		words: [
			["Genius"],
			[
				"Challenged",
				"Passionate",
				"Creative",
				"Focused",
				"Confident",
				"Interested",
				"In Awe",
				"Inspired"
			],
			[
				"Motivated",
				"Empowered",
				"Manic",
				"In Flow",
				"Brave",
				"Curious",
				"Proud",
				"Moved"
			]
		]
	},
	{
		color: "#ffb316", // Yellow
		words: [
			["Joy"],
			[
				"Acceptance",
				"Silly",
				"Care",
				"Safe",
				"Intimate",
				"Calm",
				"Present",
				"Connected"
			],
			[
				"Kindness",
				"Free",
				"Love",
				"Belonging",
				"Tender",
				"Grateful",
				"Grounded",
				"Seen"
			]
		]
	},
	{
		color: "#51a03a", // Green
		words: [
			["Disgust"],
			[
				"Disapproval",
				"Tainted",
				"Avoidance",
				"Awful",
				"Uncomfortable",
				"Guilty",
				"Embarrassed",
				"Not Good Enough"
			],
			[
				"Not 'Normal'",
				"Jealous",
				"Aversion",
				"Nauseous",
				"Self-conscious",
				"Judgemental",
				"Humiliated",
				"Ashamed"
			]
		]
	},
	{
		color: "#893248", // Purple
		words: [
			["Fear"],
			[
				"Insignificant",
				"Busy",
				"Threatened",
				"Surprised",
				"Uncontrollable",
				"Worried",
				"Insecure",
				"Fragile"
			],
			[
				"Imposter Syndrome",
				"Overwhelmed",
				"Terrified",
				"Taken Advantage Of",
				"Addicted",
				"Anxious",
				"Unsafe",
				"Vulnerable"
			]
		]
	},
	{
		color: "#4862ad", // Blue
		words: [
			["Sad"],
			[
				"Lost",
				"Lonely",
				"Unmotivated",
				"Bored",
				"Tired",
				"Loss",
				"Disappointed",
				"Left Out"
			],
			[
				"Purposeless",
				"Isolated",
				"Burnt Out",
				"Numb",
				"Exhausted",
				"Heartbroken",
				"Depressed",
				"Hurt"
			]
		]
	},
	{
		color: "#aa0015", // Red
		words: [
			["Anger"],
			[
				"Tense",
				"Aggressive",
				"Mad",
				"Frustrated",
				"Armored Up",
				"Resentful",
				"Skeptical",
				"Protective"
			],
			[
				"Hateful",
				"Violent",
				"Furious",
				"Irritated",
				"Defensive",
				"Envious",
				"Suspiscious",
				"Loyal"
			]
		]
	}
];

export const outerWords = [
	["Intuition", "Courage"], // orange
	["Dignity", "Resilience"], // yellow
	["Shame", "Aversion"], // green
	["Fragility", "Vulnerability"], // purple
	["Isolation", "Grief"], // blue
	["Reactivity", "Rage"] // red
];

export const fromBasic = {
	ok: [
		"Numb",
		"Bored",
		"Present",
		"Calm",
		"Uncomfortable",
		"Tired",
		"Worried",
		"Overwhelmed",
		"Judgemental"
	],
	good: [
		"Grounded",
		"Silly",
		"Grateful",
		"Curious",
		"Passionate",
		"Bored",
		"Tired",
		"Proud",
		"Calm",
		"Focused"
	],
	busy: [
		"Tense",
		"Irritated",
		"Exhausted",
		"Burnt Out",
		"Overwhelmed",
		"Anxious",
		"Insecure",
		"Avoidance",
		"In Flow",
		"Creative",
		"Motivated",
		"Challenged",
		"Focused"
	]
};

export const allWords = wheelSections
	.map((d) => d.words.slice(1).flat())
	.flat()
	.map((d) => d.toLowerCase());
