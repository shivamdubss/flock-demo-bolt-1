'use client'

import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarProvider,
} from "@/components/ui/sidebar"
import {
  BarChart2,
  Home,
  Key,
  Link2,
  ListChecks,
} from "lucide-react"
import { CampaignNameDialog } from "@/components/campaign-name-dialog"
import { useState } from "react"
import { useCampaignStore } from "@/lib/campaign-store"

export default function HomePage() {
  const router = useRouter()
  const [showNameDialog, setShowNameDialog] = useState(false)
  const { campaigns, addCampaign } = useCampaignStore()

  const handleCreateCampaign = (name: string) => {
    addCampaign(name)
    router.push('/campaign-builder')
  }

  return (
    <SidebarProvider>
      <div className="flex h-screen">
        <Sidebar className="w-64 border-r">
          <SidebarHeader className="flex h-[60px] items-center justify-start border-b px-4">
            <Link className="flex items-center" href="#">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Group%208770%20(1)%201-kOBWph7wJ5hXISSOm5yJMHyPeH1VWp.png"
                width={87}
                height={24}
                alt="Flock logo"
                style={{ maxWidth: '100%', height: 'auto' }}
              />
            </Link>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <Link className="flex items-center gap-3 rounded-lg px-3 py-2 bg-accent text-black" href="#">
                  <Home className="h-4 w-4" />
                  Home
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link className="flex items-center gap-3 rounded-lg px-3 py-2 text-black hover:bg-accent" href="/analytics">
                  <BarChart2 className="h-4 w-4" />
                  Analytics
                </Link>
              </SidebarMenuItem>
            </SidebarMenu>
            <SidebarMenuSub>
              <SidebarMenuItem className="text-gray-500">Dev Setup</SidebarMenuItem>
              <SidebarMenuSubItem>
                <Link className="flex items-center gap-3 rounded-lg px-3 py-2 text-black hover:bg-accent" href="#">
                  <Key className="h-4 w-4" />
                  Access Keys
                </Link>
              </SidebarMenuSubItem>
              <SidebarMenuSubItem>
                <Link className="flex items-center gap-3 rounded-lg px-3 py-2 text-black hover:bg-accent" href="#">
                  <Link2 className="h-4 w-4" />
                  Integrations
                </Link>
              </SidebarMenuSubItem>
            </SidebarMenuSub>
            <SidebarMenuSub>
              <SidebarMenuItem className="text-gray-500">Resources</SidebarMenuItem>
              <SidebarMenuSubItem>
                <Link className="flex items-center gap-3 rounded-lg px-3 py-2 text-black hover:bg-accent" href="#">
                  <ListChecks className="h-4 w-4" />
                  Launch Checklist
                </Link>
              </SidebarMenuSubItem>
            </SidebarMenuSub>
          </SidebarContent>
        </Sidebar>

        <main className="flex-1 overflow-y-auto bg-background">
          {campaigns.length === 0 ? (
            <div className="flex min-h-[600px] flex-col items-center justify-center gap-2 p-4 md:gap-8 md:p-6">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image%2030-5g6EVABvmPY87cK1Bm0moFCY3AXvlc.png"
                width={120}
                height={120}
                alt="Flock media icons"
                className="mb-4"
              />
              <h1 className="text-2xl font-semibold tracking-tight">Welcome to Flock</h1>
              <p className="text-center text-muted-foreground">
                Get started by building your first referral campaign in minutes
              </p>
              <Button 
                className="mt-4 bg-emerald-600 hover:bg-emerald-600/90"
                onClick={() => setShowNameDialog(true)}
              >
                Build a campaign
              </Button>
            </div>
          ) : (
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-semibold">Campaigns</h1>
                <Button 
                  className="bg-emerald-600 hover:bg-emerald-600/90"
                  onClick={() => setShowNameDialog(true)}
                >
                  New
                </Button>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>NAME</TableHead>
                    <TableHead>STATUS</TableHead>
                    <TableHead>CREATED</TableHead>
                    <TableHead className="text-right">REFERRALS</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {campaigns.map((campaign) => (
                    <TableRow key={campaign.id}>
                      <TableCell>{campaign.name}</TableCell>
                      <TableCell>
                        <Badge 
                          variant={campaign.status === 'live' ? 'success' : 'secondary'}
                          className="capitalize"
                        >
                          {campaign.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{new Date(campaign.created).toLocaleDateString()}</TableCell>
                      <TableCell className="text-right">{campaign.referrals}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </main>
      </div>

      <CampaignNameDialog
        open={showNameDialog}
        onOpenChange={setShowNameDialog}
        onSave={handleCreateCampaign}
        mode="create"
      />
    </SidebarProvider>
  )
}