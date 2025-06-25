import React from 'react'
import { fetchStudentProjects } from '../../../actions/fetch-projects'
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';

async function StudentProjects({ id }: { id: string }) {

    const projects = await fetchStudentProjects(id)

   return (
  <div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {projects.map((project) => {
        const latest = project.versions[0];

        return (
          <Link href={`/track-projects/${project.id}`}  key={project.id}>
            <Card className="group h-full w-[800px] bg-muted/40 border border-border shadow-sm hover:shadow-xl transition duration-200 hover:scale-[1.015] cursor-pointer rounded-2xl overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl font-semibold text-foreground group-hover:text-primary transition">
                  {latest?.name || "Untitled Project"}
                </CardTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  Last submitted on{" "}
                  <span className="font-medium">
                    {new Date(latest?.createdAt).toLocaleDateString()}
                  </span>
                </p>
              </CardHeader>

              {/* 🔻 Separator line */}
              <div className="h-[1px] bg-border w-full mb-3" />

              <CardContent className="flex flex-col gap-6 text-sm mt-2">
                {/* 👤 Guide info */}
                <div className="flex flex-col items-center gap-2">
                  <div className="h-14 w-14 rounded-full overflow-hidden bg-muted shadow">
                    <Image
                      src={project.guide.imageUrl}
                      alt={project.guide.name}
                      height={56}
                      width={56}
                      className="object-cover h-full w-full"
                    />
                  </div>

                  <div className="text-center">
                    <p className="text-sm font-medium text-foreground">{project.guide.name}</p>
                    <p className="text-xs text-muted-foreground">{project.guide.email}</p>
                  </div>
                </div>

                {/* 🔻 Separator line */}
                <div className="h-[1px] bg-border w-full mb-3" />

                {/* 🧾 Version Details */}
                <div className="flex flex-col mt-5 gap-2">
                  <p className="truncate">
                    <span className="font-medium text-foreground">Link:</span>{" "}
                    {latest?.link || "—"}
                  </p>
                  <p className="truncate">
                    <span className="font-medium text-foreground">Modification:</span>{" "}
                    {latest?.modification || "None"}
                  </p>
                </div>

                <Badge variant="outline" className="w-fit mt-2 text-xs self-start">
                  Project ID: {project.id.slice(0, 8)}...
                </Badge>
              </CardContent>
            </Card>
          </Link>
        );
      })}
    </div>
  </div>
);

}

export default StudentProjects
