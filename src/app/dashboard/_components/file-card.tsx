import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatRelative } from "date-fns";
import { Doc } from "../../../../convex/_generated/dataModel";
import { FileTextIcon, GanttChartIcon, ImageIcon } from "lucide-react";
import { ReactNode } from "react";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import Image from "next/image";
import { FileCardActions } from "./file-actions";
import { motion } from "framer-motion";

export function FileCard({
  file,
}: {
  file: Doc<"files"> & { isFavorited: boolean; url: string | null };
}) {
  const userProfile = useQuery(api.users.getUserProfile, {
    userId: file.userId,
  });

  const typeIcons = {
    image: <ImageIcon />,
    pdf: <FileTextIcon />,
    csv: <GanttChartIcon />,
  } as Record<Doc<"files">["type"], ReactNode>;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="transition-all duration-300 hover:shadow-xl hover:scale-105">
        <CardHeader className="relative">
          <CardTitle className="flex gap-2 text-base font-normal items-center">
            <div>{typeIcons[file.type]}</div>
            <span className="truncate">{file.name}</span> 
          </CardTitle>
          <div className="absolute top-2 right-2">
            <FileCardActions isFavorited={file.isFavorited} file={file} />
          </div>
        </CardHeader>
        
        <CardContent className="aspect-video relative flex justify-center items-center">
          {file.type === "image" && file.url && (
            <Image
              alt={file.name}
              src={file.url}
              fill 
              style={{ objectFit: 'cover' }} 
            />
          )}
          {file.type === "csv" && <GanttChartIcon className="w-20 h-20 text-gray-400" />}
          {file.type === "pdf" && <FileTextIcon className="w-20 h-20 text-gray-400" />}
        </CardContent>
        
        <CardFooter className="flex flex-col xs:flex-row items-start xs:items-center gap-2 xs:justify-between text-xs text-gray-700">
          <div className="flex items-center gap-2">
            <Avatar className="w-6 h-6">
              <AvatarImage src={userProfile?.image} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <span className="truncate">{userProfile?.name}</span>
          </div>
          <div>
            {formatRelative(new Date(file._creationTime), new Date())}
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}