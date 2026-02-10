"use client"

import * as React from "react"
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  Layers,
  Users,
  Image as ImageIcon,
  Settings,
  ShieldCheck,
  LogOut,
  ChevronRight,
  MoreHorizontal
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from "@/components/ui/sidebar"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { cn } from "@/lib/utils"

const data = {
  user: {
    name: "Thomas Anree",
    email: "admin@xxii.com",
    avatar: "https://github.com/shadcn.png",
  },
  navMain: [
    {
      title: "Cổng quản trị",
      items: [
        {
          title: "Bảng điều khiển",
          url: "/admin",
          icon: LayoutDashboard,
        },
        {
          title: "Sản phẩm",
          url: "/admin/products",
          icon: Package,
        },
        {
          title: "Đơn hàng",
          url: "/admin/orders",
          icon: ShoppingBag,
        },
      ]
    },
    {
      title: "Kho hàng",
      items: [
        {
          title: "Danh mục",
          url: "/admin/categories",
          icon: Layers,
        },
        {
          title: "Thương hiệu",
          url: "/admin/brands",
          icon: ShieldCheck,
        },
      ]
    },
    {
      title: "Giao diện & Cấu hình",
      items: [
        {
          title: "Banners",
          url: "/admin/banners",
          icon: ImageIcon,
        },
        {
          title: "Khách hàng",
          url: "/admin/users",
          icon: Users,
        },
        {
          title: "Cài đặt",
          url: "/admin/settings",
          icon: Settings,
        },
      ]
    }
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()

  return (
    <Sidebar variant="inset" collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild className="hover:bg-transparent">
              <Link href="/admin" className="flex items-center gap-3">
                <div className="flex aspect-square size-9 items-center justify-center rounded-xl bg-zinc-900 text-white shadow-lg">
                  <span className="font-serif font-black text-xl">X</span>
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-bold text-zinc-900">XX.II Admin</span>
                  <span className="truncate text-[10px] text-zinc-500 font-medium">MANAGEMENT SYSTEM</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="px-2">
        {data.navMain.map((group) => (
          <SidebarGroup key={group.title} className="py-2">
            <SidebarGroupLabel className="px-2 text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em] mb-2">
              {group.title}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      tooltip={item.title}
                      isActive={pathname === item.url}
                      className={cn(
                        "h-10 px-3 rounded-xl transition-all duration-200",
                        pathname === item.url
                          ? "bg-zinc-900 text-white shadow-md shadow-zinc-200 hover:bg-zinc-800 hover:text-white"
                          : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900"
                      )}
                    >
                      <Link href={item.url} className="flex items-center gap-3">
                        <item.icon className={cn("size-4.5 shrink-0", pathname === item.url ? "text-white" : "text-zinc-400")} />
                        <span className="font-medium">{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter className="p-4 border-t border-zinc-100 bg-zinc-50/50">
        <div className="flex items-center gap-3 bg-white p-2 rounded-xl border border-zinc-200/50 shadow-sm">
          <div className="size-8 rounded-lg bg-zinc-100 flex items-center justify-center overflow-hidden border border-zinc-200">
            <img src={data.user.avatar} alt={data.user.name} className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col flex-1 min-w-0">
            <span className="text-[11px] font-bold text-zinc-900 truncate">{data.user.name}</span>
            <span className="text-[9px] text-zinc-400 font-medium truncate uppercase tracking-wider">Super Admin</span>
          </div>
          <button className="text-zinc-400 hover:text-red-500 transition-colors p-1 hover:bg-red-50 rounded-md">
            <LogOut size={14} />
          </button>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
