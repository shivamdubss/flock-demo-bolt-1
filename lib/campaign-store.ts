import { create } from 'zustand'

interface Campaign {
  id: string
  name: string
  status: 'draft' | 'live'
  created: string
  referrals: number
}

interface CampaignStore {
  campaigns: Campaign[]
  addCampaign: (name: string) => void
}

export const useCampaignStore = create<CampaignStore>((set) => ({
  campaigns: [],
  addCampaign: (name) => 
    set((state) => ({
      campaigns: [
        ...state.campaigns,
        {
          id: String(state.campaigns.length + 1),
          name,
          status: 'draft',
          created: new Date().toISOString().split('T')[0],
          referrals: 0
        }
      ]
    }))
}))