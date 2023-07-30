export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      properties: {
        Row: {
          address: string
          created_at: string | null
          deleted: boolean
          headline: string
          id: string
          imageLinks: Json
          org: string
          price: number
          propertyLink: string
          roomCount: number
          sqmeter: number
          thumbnail: string
          wbs: boolean
        }
        Insert: {
          address: string
          created_at?: string | null
          deleted?: boolean
          headline: string
          id: string
          imageLinks: Json
          org: string
          price: number
          propertyLink: string
          roomCount?: number
          sqmeter: number
          thumbnail: string
          wbs: boolean
        }
        Update: {
          address?: string
          created_at?: string | null
          deleted?: boolean
          headline?: string
          id?: string
          imageLinks?: Json
          org?: string
          price?: number
          propertyLink?: string
          roomCount?: number
          sqmeter?: number
          thumbnail?: string
          wbs?: boolean
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      PaymentProvider: 'STRIPE'
      Provider: 'GITHUB'
      ReportStatus: 'SUCCESS' | 'FAILED'
      Role: 'MEMBER' | 'OWNER'
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
