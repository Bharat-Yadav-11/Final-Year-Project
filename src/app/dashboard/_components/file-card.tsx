import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatRelative } from "date-fns";
import { Doc } from "../../../../convex/_generated/dataModel";
import { FileTextIcon, ImageIcon, PresentationIcon } from "lucide-react";
import { ReactNode } from "react";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import Image from "next/image";
import { FileCardActions } from "./file-actions";
import { motion } from "framer-motion";

const PDFIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 640 640"
    fill="currentColor"
    className={props.className ?? "w-6 h-6"}
  ><path d="M240 112L128 112C119.2 112 112 119.2 112 128L112 512C112 520.8 119.2 528 128 528L208 528L208 576L128 576C92.7 576 64 547.3 64 512L64 128C64 92.7 92.7 64 128 64L261.5 64C278.5 64 294.8 70.7 306.8 82.7L429.3 205.3C441.3 217.3 448 233.6 448 250.6L448 400.1L400 400.1L400 272.1L312 272.1C272.2 272.1 240 239.9 240 200.1L240 112.1zM380.1 224L288 131.9L288 200C288 213.3 298.7 224 312 224L380.1 224zM272 444L304 444C337.1 444 364 470.9 364 504C364 537.1 337.1 564 304 564L292 564L292 592C292 603 283 612 272 612C261 612 252 603 252 592L252 464C252 453 261 444 272 444zM304 524C315 524 324 515 324 504C324 493 315 484 304 484L292 484L292 524L304 524zM400 444L432 444C460.7 444 484 467.3 484 496L484 560C484 588.7 460.7 612 432 612L400 612C389 612 380 603 380 592L380 464C380 453 389 444 400 444zM432 572C438.6 572 444 566.6 444 560L444 496C444 489.4 438.6 484 432 484L420 484L420 572L432 572zM508 464C508 453 517 444 528 444L576 444C587 444 596 453 596 464C596 475 587 484 576 484L548 484L548 508L576 508C587 508 596 517 596 528C596 539 587 548 576 548L548 548L548 592C548 603 539 612 528 612C517 612 508 603 508 592L508 464z" /></svg>
);

const ExcelIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg 
  {...props} 
  xmlns="http://www.w3.org/2000/svg" 
  viewBox="0 0 24 24" 
  fill="currentColor"
  className={props.className ?? "w-6 h-6"}
  ><path d="M2.85858 2.87732L15.4293 1.0815C15.7027 1.04245 15.9559 1.2324 15.995 1.50577C15.9983 1.52919 16 1.55282 16 1.57648V22.4235C16 22.6996 15.7761 22.9235 15.5 22.9235C15.4763 22.9235 15.4527 22.9218 15.4293 22.9184L2.85858 21.1226C2.36593 21.0522 2 20.6303 2 20.1327V3.86727C2 3.36962 2.36593 2.9477 2.85858 2.87732ZM4 4.73457V19.2654L14 20.694V3.30599L4 4.73457ZM17 19H20V4.99997H17V2.99997H21C21.5523 2.99997 22 3.44769 22 3.99997V20C22 20.5523 21.5523 21 21 21H17V19ZM10.2 12L13 16H10.6L9 13.7143L7.39999 16H5L7.8 12L5 7.99997H7.39999L9 10.2857L10.6 7.99997H13L10.2 12Z"></path></svg>
);


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
    pdf: <PDFIcon />,
    csv: <ExcelIcon />,
    word: <FileTextIcon />,
    ppt: <PresentationIcon />,
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
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          )}
          {file.type === "csv" && <ExcelIcon className="w-20 h-20 text-gray-400" />}
          {file.type === "pdf" && <PDFIcon className="w-20 h-20 text-gray-400" />}
          {file.type === "word" && <FileTextIcon className="w-20 h-20 text-gray-400" />}
          {file.type === "ppt" && <PresentationIcon className="w-20 h-20 text-gray-400" />}
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