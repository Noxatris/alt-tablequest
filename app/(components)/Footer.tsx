import Link from "next/link"

export default function Footer() {
    return (
        <footer className="w-full border-t px-4 py-8 text-center text-sm text-gray-500">
            <div className="flex flex-col">
                <h2>Liens Utiles</h2>
                <Link href="/">Mentions Légales</Link>
                <Link href="/">Contact</Link>
                <Link href="/">ZQSD-Production</Link>
            </div>
            &copy; {new Date().getFullYear()} ZQSD Production. Tous droits réservés.
        </footer>
    )
}