import React from 'react';
import { TrophyIcon, SparklesIcon, StarIcon, Square2StackIcon } from '@heroicons/react/20/solid'
import MultiplayerClip from '../../assets/MultiplayerClip.mp4'

const MultiplayerShowcase = () => {
    return (
        <div className="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:overflow-visible lg:px-0" id="MultiplayerMode">
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <svg
                    aria-hidden="true"
                    className="absolute left-[max(50%,25rem)] top-0 h-[64rem] w-[128rem] -translate-x-1/2 stroke-gray-200 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)]"
                >
                    <defs>
                    <pattern
                        x="50%"
                        y={-1}
                        id="e813992c-7d03-4cc4-a2bd-151760b470a0"
                        width={200}
                        height={200}
                        patternUnits="userSpaceOnUse"
                    >
                        <path d="M100 200V.5M.5 .5H200" fill="none" />
                    </pattern>
                    </defs>
                    <svg x="50%" y={-1} className="overflow-visible fill-gray-50">
                    <path
                        d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z"
                        strokeWidth={0}
                    />
                    </svg>
                    <rect fill="url(#e813992c-7d03-4cc4-a2bd-151760b470a0)" width="100%" height="100%" strokeWidth={0} />
                </svg>
                </div>
                <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">
                <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
                    <div className="lg:pr-4">
                    <div className="lg:max-w-lg">
                        <p className="text-base font-semibold leading-7 text-indigo-600">Compete and Learn</p>
                        <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Multiplayer Mode</h1>
                        <p className="mt-6 text-xl leading-8 text-gray-700">
                            In multiplayer mode, learners can interact with peers in an engaging quiz environment. Host or join multiplayer rooms to compete in quiz-based gameplay while collaborating with others to improve knowledge on various computer fundamentals topics. This mode includes unique game types that add variety and challenge. Progress is saved automatically, and players can return to the main menu after sessions.
                        </p>
                    </div>
                </div>
            </div>
            <div className="-ml-12 -mt-12 p-12 lg:pt-32 lg:sticky lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden">
                <video
                    alt="ByteQuiz Multiplayer Clip"
                    src={ MultiplayerClip }
                    className="w-[48rem] max-w-none rounded-xl bg-gray-900 shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem]"
                    controls={false}
                    autoPlay={true}
                    loop={true}
                    muted={true}
                />
            </div>
            <div className="lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
                <div className="lg:pr-4">
                <div className="max-w-xl text-base leading-7 text-gray-700 lg:max-w-lg">
                    <p>
                    Players advance through subjects in a competitive setting, racing against or collaborating with peers. Subjects like "Number System" unlock by improving knowledge of "History of Computer," and "Introduction to Programming" unlocks through better understanding of "Elements of Computer System." Here's the following multiplayer minigame to enjoy:                    </p>
                    <ul role="list" className="mt-8 space-y-8 text-gray-600">
                    <li className="flex gap-x-3">
                        <TrophyIcon aria-hidden="true" className="mt-1 h-5 w-5 flex-none text-indigo-600" />
                        <span>
                        <strong className="font-semibold text-gray-900">Runner Quiz Mode. </strong> Players race through maze-like rooms filled with obstacles. Each room ends with a quiz presented by an NPC, and answering correctly unlocks the next room. The first to complete all rooms and quizzes wins.
                        </span>
                    </li>
                    <li className="flex gap-x-3">
                        <SparklesIcon aria-hidden="true" className="mt-1 h-5 w-5 flex-none text-indigo-600" />
                        <span>
                        <strong className="font-semibold text-gray-900">Trivia Showdown.</strong> Players face quiz questions in a shared room. They must move to the answer they believe is correct, with all players able to see each other’s choices. It adds a competitive twist as everyone can observe their peers' decisions.
                        </span>
                    </li>
                    <li className="flex gap-x-3">
                        <Square2StackIcon aria-hidden="true" className="mt-1 h-5 w-5 flex-none text-indigo-600" />
                        <span>
                        <strong className="font-semibold text-gray-900">Territory Conquest.</strong> Players claim tiles in a room by answering quiz questions correctly. The goal is to capture as many tiles as possible, while also having the chance to steal tiles from opponents. Strategic movement and quiz knowledge are key to dominating the game.
                        </span>
                    </li>
                    </ul>
                    <p className="mt-8">
                        Players can create their unique in-game character by selecting an avatar, name, and username. The character’s stats reflect progress and achievements in both singleplayer and multiplayer modes. Multiplayer rooms allow learners to interact with peers and play educational quizzes together. Players can choose to either host a game or join an existing one. Players can select topics to focus on, such as "History of Computer" or "Elements of Computer System." The multiplayer quizzes reinforce learning through friendly competition or collaboration.
                    </p>
                    <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">Compete with Friends!</h2>
                    <p className="mt-6">
                        In multiplayer mode, learners can collaborate with others while also competing to enhance their understanding of topics. The variety of quiz modes ensures engaging and interactive learning experiences, with real-time competition driving motivation. Each session concludes with a display of final scores, showing individual performance against peers. All actions and progress are saved automatically, allowing players to continue building their academic stats.                    </p>
                </div>
                </div>
            </div>
            </div>
        </div>
    )
};

export default MultiplayerShowcase;