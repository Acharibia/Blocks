import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const blocks = [
  {
    name: "card",
    title: "Card",
    description: "Basic card component with header, content, and actions",
  },
  {
    name: "feature-grid",
    title: "Feature Grid",
    description: "Showcase your product features in a grid layout",
  },
  {
    name: "testimonials",
    title: "Testimonials",
    description: "Customer reviews and social proof section",
  },
  {
    name: "pricing-table",
    title: "Pricing Table",
    description: "Compare pricing plans and packages",
  },
  {
    name: "contact-form",
    title: "Contact Form",
    description: "Get in touch form with validation",
  },
  {
    name: "navigation-bar",
    title: "Navigation Bar",
    description: "Responsive navigation with menu items",
  },
  {
    name: "footer",
    title: "Footer",
    description: "Site footer with links and information",
  },
  {
    name: "call-to-action",
    title: "Call to Action",
    description: "Conversion-focused action section",
  },
  {
    name: "image-gallery",
    title: "Image Gallery",
    description: "Showcase images in an elegant gallery",
  },
  {
    name: "stats-section",
    title: "Stats Section",
    description: "Display key metrics and numbers",
  },
];

export default function BlocksIndex() {
  return (
    <>
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-3">UI Blocks</h1>
        <p className="text-muted-foreground text-lg">
          Pre-built components and sections to accelerate your development
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {blocks.map((block) => {
          return (
            <Card key={block.name} className="group">
              <CardHeader className="pb-3">
                <CardTitle className="text-xl">{block.title}</CardTitle>
                <CardDescription className="text-sm">
                  {block.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <Link href={`/blocks/${block.name}`} className="block">
                  <Button className="w-full gap-2" variant="outline">
                    View Component
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </>
  );
}
