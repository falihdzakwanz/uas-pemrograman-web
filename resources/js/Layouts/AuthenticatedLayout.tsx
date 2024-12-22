import AuthenticatedNavbar from '@/Components/fragments/Navbar/AuthenticatedNavbar/Index';
import { PropsWithChildren } from 'react';

export default function AuthenticatedLayout({ children }: PropsWithChildren) {
    return (
        <div className="min-h-screen bg-gray-100">
            <AuthenticatedNavbar />
            <main className="p-6">{children}</main>
        </div>
    );
}
