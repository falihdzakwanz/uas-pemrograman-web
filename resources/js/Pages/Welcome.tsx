import { Head, Link } from '@inertiajs/react';

const Welcome = () => {
    return (
        <main className="min-h-screen bg-gray-50">
            <header className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
                <Head title="Task Master" />
                <div className="container mx-auto flex flex-col items-center justify-center py-16 text-center md:flex-row md:justify-between">
                    <div className="mb-8 md:mb-0 md:mr-8">
                        <h1 className="text-4xl font-bold md:text-5xl">
                            Welcome to TaskMaster
                        </h1>
                        <p className="mt-4 text-lg">
                            Simplify your task management and boost
                            productivity.
                        </p>
                        <div className="mt-6 flex justify-center md:justify-start">
                            <Link
                                href="/register"
                                className="mr-4 rounded bg-white px-6 py-3 text-blue-600 shadow hover:bg-gray-200"
                            >
                                Get Started
                            </Link>
                            <Link
                                href="/login"
                                className="rounded border border-white px-6 py-3 text-white hover:bg-white hover:text-blue-600"
                            >
                                Sign In
                            </Link>
                        </div>
                    </div>
                    <img
                        src="https://images.unsplash.com/photo-1544819667-9bfc1de23d4e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cHJvZHVjdGl2aXR5fGVufDB8fDB8fHwy"
                        alt="Task Management"
                        className="w-80 rounded-lg shadow-lg"
                    />
                </div>
            </header>

            <section className="container mx-auto py-16 text-gray-700">
                <h2 className="text-center text-3xl font-semibold text-gray-800">
                    Features That Make Your Life Easier
                </h2>
                <div className="mt-12 grid gap-8 md:grid-cols-3">
                    <div className="rounded-lg bg-white p-6 shadow hover:shadow-md">
                        <h3 className="text-lg font-semibold text-indigo-600">
                            Task Organization
                        </h3>
                        <p className="mt-4">
                            Organize your tasks efficiently with priority
                            settings and deadlines.
                        </p>
                    </div>
                    <div className="rounded-lg bg-white p-6 shadow hover:shadow-md">
                        <h3 className="text-lg font-semibold text-indigo-600">
                            Seamless Collaboration
                        </h3>
                        <p className="mt-4">
                            Work together with team members for shared tasks and
                            projects.
                        </p>
                    </div>
                    <div className="rounded-lg bg-white p-6 shadow hover:shadow-md">
                        <h3 className="text-lg font-semibold text-indigo-600">
                            Real-Time Updates
                        </h3>
                        <p className="mt-4">
                            Keep track of progress with live updates and
                            notifications.
                        </p>
                    </div>
                </div>
            </section>

            <section className="bg-gray-100 py-16">
                <div className="container mx-auto text-center">
                    <h2 className="text-3xl font-semibold text-gray-800">
                        What Our Users Are Saying
                    </h2>
                    <div className="mt-12 flex flex-wrap justify-center gap-8">
                        <div className="max-w-sm rounded-lg bg-white p-6 shadow-lg">
                            <p className="italic text-gray-600">
                                "TaskMaster has transformed the way I organize
                                my daily life."
                            </p>
                            <p className="mt-4 font-semibold text-gray-700">
                                - John Wick, Freelancer
                            </p>
                        </div>
                        <div className="max-w-sm rounded-lg bg-white p-6 shadow-lg">
                            <p className="italic text-gray-600">
                                "The best tool for managing team projects with
                                ease!"
                            </p>
                            <p className="mt-4 font-semibold text-gray-700">
                                - Fujiwara Takumi, Project Manager
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <footer className="bg-indigo-600 text-white">
                <div className="container mx-auto flex flex-col items-center justify-center py-8 text-center">
                    <h2 className="text-2xl font-bold">
                        Ready to Get Started with TaskMaster?
                    </h2>
                    <p className="mt-4">
                        Sign up today and take control of your tasks!
                    </p>
                    <Link
                        href="/register"
                        className="mt-6 rounded bg-white px-6 py-3 text-indigo-600 shadow hover:bg-gray-200"
                    >
                        Join Now
                    </Link>
                </div>
            </footer>
        </main>
    );
};

export default Welcome;
