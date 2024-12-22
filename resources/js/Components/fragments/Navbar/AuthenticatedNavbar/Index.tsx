import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function AuthenticatedNavbar() {
    const user = usePage().props.auth.user;
    const [showDropdown, setShowDropdown] = useState(false);

    return (
        <nav className="flex items-center justify-between bg-gradient-to-r from-blue-500 to-indigo-600 px-4 py-3 shadow">
            <div>
                <Link href="/tasks" className="text-lg font-bold text-white">
                    Task Master
                </Link>
            </div>

            <div className="relative">
                <button
                    onClick={() => setShowDropdown((prev) => !prev)}
                    className="hover: flex items-center space-x-2 rounded-md px-4 py-2 text-sm text-white transition-all duration-200 hover:bg-gray-100 hover:text-gray-700"
                >
                    <span>{user.name}</span>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="h-5 w-5"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M8.25 9.75L12 13.5l3.75-3.75"
                        />
                    </svg>
                </button>

                {showDropdown && (
                    <div className="absolute right-0 mt-2 w-48 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                        <Link
                            href={route('profile.edit')}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                            Profile
                        </Link>
                        <Link
                            method="post"
                            href={route('logout')}
                            as="button"
                            className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                        >
                            Log Out
                        </Link>
                    </div>
                )}
            </div>
        </nav>
    );
}
