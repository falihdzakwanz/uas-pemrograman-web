import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function About() {
    return (
        <AuthenticatedLayout>
            <Head title="About" />
            <div className="mx-auto max-w-4xl px-6 py-10">
                <h1 className="text-3xl font-bold text-gray-800">About Us</h1>
                <p className="mt-4 text-gray-600">
                    Welcome to Task Master! Our mission is to help you stay
                    organized and manage your tasks effectively. Whether you're
                    working on a team project or managing your personal to-do
                    list, we provide tools to make your work easier.
                </p>
                <p className="mt-4 text-gray-600">
                    Founded in 2024, Task Master is built with simplicity and
                    productivity in mind. We continually strive to improve and
                    provide you with the best user experience.
                </p>
            </div>
        </AuthenticatedLayout>
    );
}
