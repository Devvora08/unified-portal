import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { getRandomInterests } from "@/helper"
import Image from "next/image"
import Link from "next/link"

type GuideProps = {
  id: string
  name: string
  email: string
  instituteMail?: string | null
  imageUrl?: string | null
}

const interestChips = getRandomInterests()

export default function GuideCard({ id, name, email, instituteMail, imageUrl }: GuideProps) {
  return (
    <Link href={`/guides/${id}`} className="block">
      <Card className="border border-gray-200 hover:shadow-md transition-all rounded-2xl overflow-hidden">
        <CardHeader className="flex flex-col items-center gap-3 py-6">
          <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-blue-300 shadow-sm">
            <Image
              src={imageUrl || "/default-avatar.png"}
              alt={`${name}'s profile picture`}
              height={50}
              width={50}
              className="object-cover"
            />
          </div>
          <CardTitle className="text-xl font-semibold text-center">{name}</CardTitle>
        </CardHeader>


        <CardContent className="px-6 pb-6 space-y-4 mt-4">
          <div className="text-sm text-muted-foreground">
            <span className="font-medium text-gray-600">Institute Mail:</span>
            <div className="truncate">{instituteMail || "Not provided"}</div>
          </div>


          <div className="text-sm text-muted-foreground">
            <span className="font-medium text-gray-600">Email:</span>
            <div className="truncate">{email}</div>
          </div>


          {/* 🔥 INTEREST FIELDS */}
          <div className="pt-2">
            <p className="text-sm font-semibold text-gray-700 mb-2">Fields</p>
            <div className="flex flex-wrap gap-2 mt-2">
              {interestChips.map((interest, i) => (
                <span
                  key={i}
                  className="text-sm px-3 py-1 rounded-full bg-amber-100 text-amber-800 font-medium"
                >
                  + {interest}
                </span>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
