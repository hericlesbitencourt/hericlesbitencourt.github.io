import Link from 'components/link'
import { ChevronLeftIcon } from './icons'

interface BackButtonProps {
  href: string
  label?: string
}

export default function BackButton({ href, label = "Back to Projects" }: BackButtonProps) {
  return (
    <Link
      href={href}
      className="inline-flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full transition-all duration-200 hover:scale-105 shadow-sm"
    >
      <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center mr-2">
        <ChevronLeftIcon className="w-4 h-4 text-gray-600" />
      </div>
      <span className="font-medium">{label}</span>
    </Link>
  )
}
