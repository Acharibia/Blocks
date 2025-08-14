"use client";

import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  BookOpen,
  Clock,
  Download,
  Edit,
  Eye,
  FileText,
  ImageIcon,
  MoreVertical,
  Share2,
  Trash2,
} from "lucide-react";

type CourseCardProps = {
  id: number;
  title: string;
  description?: string;
  thumbnail?: string | null;
  href?: string;
  programTitle?: string;
  materialCount?: number;
  duration?: string;
  fileTypes?: string[];
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
  onView?: (id: number) => void;
  onDownload?: (id: number) => void;
  onShare?: (id: number) => void;
};

export default function CourseCard({
  id,
  title,
  description,
  thumbnail,
  href,
  programTitle,
  materialCount = 0,
  duration,
  fileTypes = [],
  onEdit,
  onDelete,
  onView,
  onDownload,
  onShare,
}: CourseCardProps) {
  const link = href || `/modules/hr/courses/${id}`;

  return (
    <Card className="group flex h-full flex-col overflow-hidden py-0">
      <CardHeader className="p-0">
        <Link href={link} className="block focus:outline-none">
          {thumbnail ? (
            <Image
              src={thumbnail}
              alt={title}
              className="h-40 w-full rounded-t-lg object-cover transition-transform group-hover:scale-105"
              loading="lazy"
              width={400}
              height={160}
            />
          ) : (
            <div className="bg-muted flex h-40 w-full items-center justify-center rounded-t-lg">
              <ImageIcon className="text-muted-foreground h-10 w-10" />
            </div>
          )}
        </Link>
      </CardHeader>

      <CardContent className="flex flex-1 flex-col gap-2 p-4">
        {programTitle && (
          <Badge variant="secondary" className="w-fit text-xs">
            {programTitle}
          </Badge>
        )}

        <Link href={link} className="hover:underline focus:outline-none">
          <CardTitle className="line-clamp-1 text-lg font-semibold">
            {title}
          </CardTitle>
        </Link>

        <CardDescription className="text-muted-foreground line-clamp-2 text-sm">
          {description || "No description provided."}
        </CardDescription>

        <div className="mt-auto flex items-center justify-between gap-2 pt-2">
          <div className="text-muted-foreground flex items-center gap-3 text-xs">
            {materialCount > 0 && (
              <div className="flex items-center gap-1">
                <FileText className="h-3 w-3" />
                <span>{materialCount} materials</span>
              </div>
            )}

            {duration && (
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>{duration}</span>
              </div>
            )}

            {fileTypes.length > 0 && (
              <div className="flex items-center gap-1">
                <BookOpen className="h-3 w-3" />
                <span>
                  {fileTypes.slice(0, 2).join(", ")}
                  {fileTypes.length > 2 ? "..." : ""}
                </span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-1">
            {onShare && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onShare(id)}
                className="h-8 w-8 p-0"
              >
                <Share2 className="h-4 w-4" />
                <span className="sr-only">Share course</span>
              </Button>
            )}

            {onDownload && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDownload(id)}
                className="h-8 w-8 p-0"
              >
                <Download className="h-4 w-4" />
                <span className="sr-only">Download materials</span>
              </Button>
            )}

            {(onEdit || onDelete || onView) && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <MoreVertical className="h-4 w-4" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  {onView && (
                    <DropdownMenuItem onClick={() => onView(id)}>
                      <Eye className="mr-2 h-4 w-4" />
                      View Details
                    </DropdownMenuItem>
                  )}

                  {onEdit && (
                    <DropdownMenuItem onClick={() => onEdit(id)}>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit Course
                    </DropdownMenuItem>
                  )}

                  {onDelete && (
                    <DropdownMenuItem
                      onClick={() => onDelete(id)}
                      className="text-destructive focus:text-destructive"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete Course
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
