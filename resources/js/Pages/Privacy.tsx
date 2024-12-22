import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Privacy() {
    return (
        <AuthenticatedLayout>
            <Head title="Privacy Policy" />
            <div className="mx-auto max-w-4xl px-6 py-10">
                <h1 className="text-3xl font-bold text-gray-800">
                    Privacy Policy
                </h1>
                <p className="mt-4 text-gray-600">
                    Your privacy is important to us. This policy outlines how we
                    handle your personal data.
                </p>
                <p className="mt-4 text-gray-600">
                    <strong>Data Collection:</strong> We collect data such as
                    your name, email, and tasks to provide our service.
                </p>
                <p className="mt-4 text-gray-600">
                    <strong>Data Use:</strong> We use your data only to enhance
                    your experience with our service. We do not share your data
                    with third parties.
                </p>
                <p className="mt-4 text-gray-600">
                    <strong>Data Security:</strong> We take security seriously
                    and apply best practices to protect your information.
                </p>
            </div>
        </AuthenticatedLayout>
    );
}
