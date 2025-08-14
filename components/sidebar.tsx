import * as Blocks from "@/components/blocks";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import Link from "next/link";

export default function BlocksSidebar() {
  const componentNames = Object.keys(Blocks);
  return (
    <Sidebar className="mt-32">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Blocks</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {componentNames.map((name) => (
                <SidebarMenuItem key={name}>
                  <SidebarMenuButton asChild>
                    <Link href={`/blocks/${name}`}>
                      <span className="capitalize">
                        {name.replace(/-/g, " ")}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
