import AuthenticatedFooter from '@/Components/fragments/Footer/AutheticatedFooter/Index';
import AuthenticatedNavbar from '@/Components/fragments/Navbar/AuthenticatedNavbar/Index';
import { PropsWithChildren } from 'react';

export default function AuthenticatedLayout({ children }: PropsWithChildren) {
    return (
        <div className="flex min-h-screen flex-col bg-gray-100">
            <AuthenticatedNavbar />
            <main className="flex-grow p-6">{children}</main>
            <AuthenticatedFooter />
        </div>
    );
}
