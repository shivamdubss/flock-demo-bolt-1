'use client'

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronRight, CheckCircle2, Smartphone, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CampaignHeader } from "@/components/campaign-header"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface Template {
  id: string
  name: string
  description?: string
  image: string
  previewImage: string
}

const templates: Template[] = [
  {
    id: "gifts",
    name: "Gifts",
    image: "https://484zd26nhzbahsul.public.blob.vercel-storage.com/Frame%20184695%201-mNygmLlGJAERvDpZ2xUWadbxtZR4RH.png",
    previewImage: "https://484zd26nhzbahsul.public.blob.vercel-storage.com/Frame%20184695%201-mNygmLlGJAERvDpZ2xUWadbxtZR4RH.png",
  },
  {
    id: "wallet",
    name: "Wallet",
    image: "https://484zd26nhzbahsul.public.blob.vercel-storage.com/Frame%20184713%201-GiGz6KespcQEzcaLh6S4TiI8Cq5A0A.png",
    previewImage: "https://484zd26nhzbahsul.public.blob.vercel-storage.com/Frame%20184713%201-GiGz6KespcQEzcaLh6S4TiI8Cq5A0A.png",
  },
  {
    id: "simple",
    name: "Simple",
    image: "https://484zd26nhzbahsul.public.blob.vercel-storage.com/Frame%20184713%201-GiGz6KespcQEzcaLh6S4TiI8Cq5A0A.png",
    previewImage: "https://484zd26nhzbahsul.public.blob.vercel-storage.com/Frame%20184713%201-GiGz6KespcQEzcaLh6S4TiI8Cq5A0A.png",
  }
]

export default function HowItLooks() {
  const [campaignTitle, setCampaignTitle] = useState("Campaign #1")
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleTemplateClick = (template: Template) => {
    setSelectedTemplate(template)
    setIsModalOpen(true)
  }

  const handleUseTemplate = () => {
    // Handle template selection
    setIsModalOpen(false)
    window.location.href = '/campaign-builder/how-it-looks/customize'
  }

  return (
    <div className="flex min-h-screen">
      {/* Left Sidebar */}
      <div className="w-64 border-r bg-gray-50/40">
        <nav className="space-y-2 p-4">
          <div className="space-y-1">
            <Link
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-600 hover:bg-gray-100"
              href="/campaign-builder"
            >
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              Rewards
            </Link>
            <Link
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-emerald-600 hover:bg-gray-100"
              href="#"
            >
              How it looks
            </Link>
            <Link
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-600 hover:bg-gray-100"
              href="/campaign-builder/referrer-journey"
            >
              Referrer journey
            </Link>
            <Link
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-600 hover:bg-gray-100"
              href="/campaign-builder/referee-journey"
            >
              Referee journey
            </Link>
            <Link
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-600 hover:bg-gray-100"
              href="/campaign-builder/summary"
            >
              Summary
            </Link>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        <CampaignHeader 
          campaignTitle={campaignTitle}
          onTitleChange={setCampaignTitle}
        />

        <div className="overflow-auto">
          <div className="mx-auto max-w-5xl p-6">
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-semibold">Choose a template</h1>
                <p className="mt-2 text-gray-600">
                  Choose a template for your Referral Homepage.
                </p>
              </div>

              <Card className="flex cursor-pointer items-center justify-between p-6 transition-colors hover:bg-gray-50">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg border bg-white">
                    <Smartphone className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium">Request a Template</h3>
                    <p className="text-sm text-gray-600">We'll build any design within ~1 week.</p>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </Card>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                {templates.map((template) => (
                  <div key={template.id} className="space-y-2">
                    <h3 className="font-medium">{template.name}</h3>
                    <p className="text-sm text-gray-500">Created Oct 2, 2024</p>
                    <Card 
                      className="cursor-pointer overflow-hidden transition-transform hover:scale-[1.02]"
                      onClick={() => handleTemplateClick(template)}
                    >
                      <div className="aspect-[3/4] bg-gray-100">
                        <Image
                          src={template.image}
                          alt={`${template.name} template preview`}
                          width={300}
                          height={400}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </Card>
                  </div>
                ))}

                <div className="space-y-2">
                  <h3 className="font-medium">From Scratch</h3>
                  <Card className="flex aspect-[3/4] cursor-pointer items-center justify-center border-2 border-dashed transition-colors hover:bg-gray-50">
                    <div className="text-center">
                      <p className="text-sm font-medium">Start from scratch</p>
                      <p className="mt-1 text-sm text-gray-500">Create your own design</p>
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Template Preview Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-sm p-0 overflow-hidden">
          <DialogHeader className="p-4 pb-0">
            <DialogTitle>{selectedTemplate?.name}</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col h-full">
            <div className="flex-grow overflow-hidden">
              {selectedTemplate && (
                <Image
                  src={selectedTemplate.previewImage}
                  alt={`${selectedTemplate.name} preview`}
                  width={300}
                  height={450}
                  className="w-full h-auto object-cover"
                />
              )}
            </div>
            <div className="p-4">
              <Button 
                className="w-full bg-gray-600 hover:bg-gray-700"
                onClick={handleUseTemplate}
              >
                Use Template →
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}