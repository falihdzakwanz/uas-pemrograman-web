import { Link } from '@inertiajs/react';

export default function AuthenticatedFooter() {
    return (
        <footer className="mt-6 bg-indigo-600 py-6 text-white">
            <div className="container mx-auto text-center">
                <p className="text-sm">
                    &copy; {new Date().getFullYear()} Task Master. All Rights
                    Reserved.
                </p>
                <nav className="mt-2">
                    <ul className="flex justify-center space-x-4">
                        <li>
                            <Link
                                href="/about"
                                className="text-white transition hover:text-gray-400"
                            >
                                About
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/terms"
                                className="text-white transition hover:text-gray-400"
                            >
                                Terms of Service
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/privacy"
                                className="text-white transition hover:text-gray-400"
                            >
                                Privacy Policy
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </footer>
    );
}
