import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Terms() {
    return (
        <AuthenticatedLayout>
            <Head title="Terms of Service" />
            <div className="mx-auto max-w-4xl px-6 py-10">
                <h1 className="text-3xl font-bold text-gray-800">
                    Terms of Service
                </h1>
                <p className="mt-4 text-gray-600">
                    By using Task Master, you agree to abide by the following
                    terms:
                </p>
                <ul className="mt-4 list-inside list-disc text-gray-600">
                    <li>Do not misuse our services.</li>
                    <li>Respect the privacy of other users.</li>
                    <li>Do not upload illegal or harmful content.</li>
                </ul>
                <p className="mt-4 text-gray-600">
                    Failure to comply with these terms may result in account
                    suspension or termination.
                </p>
            </div>
        </AuthenticatedLayout>
    );
}
