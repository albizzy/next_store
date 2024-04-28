import { Loader2 } from "lucide-react"

export default function AdminLoading() {
    return (
        <>
            <div className="w-full h-full flex justify-center items-center">
                <Loader2 className="size-12 text-gray-500 animate-spin" />
            </div>
        </>
    )
}