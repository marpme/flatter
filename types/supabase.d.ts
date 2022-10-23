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
      _prisma_migrations: {
        Row: {
          id: string
          checksum: string
          finished_at: string | null
          migration_name: string
          logs: string | null
          rolled_back_at: string | null
          started_at: string
          applied_steps_count: number
        }
        Insert: {
          id: string
          checksum: string
          finished_at?: string | null
          migration_name: string
          logs?: string | null
          rolled_back_at?: string | null
          started_at?: string
          applied_steps_count?: number
        }
        Update: {
          id?: string
          checksum?: string
          finished_at?: string | null
          migration_name?: string
          logs?: string | null
          rolled_back_at?: string | null
          started_at?: string
          applied_steps_count?: number
        }
      }
      Organization: {
        Row: {
          id: string
          slug: string
          companyName: string
          addressName: string | null
          addressStreet: string | null
          addressCity: string | null
          addressState: string | null
          addressZip: string | null
          addressCountry: string | null
          paymentId: string | null
        }
        Insert: {
          id: string
          slug: string
          companyName: string
          addressName?: string | null
          addressStreet?: string | null
          addressCity?: string | null
          addressState?: string | null
          addressZip?: string | null
          addressCountry?: string | null
          paymentId?: string | null
        }
        Update: {
          id?: string
          slug?: string
          companyName?: string
          addressName?: string | null
          addressStreet?: string | null
          addressCity?: string | null
          addressState?: string | null
          addressZip?: string | null
          addressCountry?: string | null
          paymentId?: string | null
        }
      }
      Payment: {
        Row: {
          id: string
          provider: Database["public"]["Enums"]["PaymentProvider"]
          billingEmail: string
          subscriptionId: string
        }
        Insert: {
          id: string
          provider?: Database["public"]["Enums"]["PaymentProvider"]
          billingEmail: string
          subscriptionId: string
        }
        Update: {
          id?: string
          provider?: Database["public"]["Enums"]["PaymentProvider"]
          billingEmail?: string
          subscriptionId?: string
        }
      }
      Project: {
        Row: {
          id: string
          provider: Database["public"]["Enums"]["Provider"]
          repository: string
          owner: string
          projectName: string
          entryPoint: string
          lcovPath: string
          installCommand: string | null
          preparationCommand: string | null
          coverageCommand: string | null
          userId: string
          defaultBranch: string
        }
        Insert: {
          id: string
          provider?: Database["public"]["Enums"]["Provider"]
          repository: string
          owner: string
          projectName: string
          entryPoint: string
          lcovPath: string
          installCommand?: string | null
          preparationCommand?: string | null
          coverageCommand?: string | null
          userId: string
          defaultBranch: string
        }
        Update: {
          id?: string
          provider?: Database["public"]["Enums"]["Provider"]
          repository?: string
          owner?: string
          projectName?: string
          entryPoint?: string
          lcovPath?: string
          installCommand?: string | null
          preparationCommand?: string | null
          coverageCommand?: string | null
          userId?: string
          defaultBranch?: string
        }
      }
      properties: {
        Row: {
          id: string
          created_at: string | null
          org: string | null
          address: string | null
          price: number | null
          sqmeter: number | null
          headline: string | null
          thumbnail: string | null
          imageLinks: Json | null
          propertyLink: string | null
        }
        Insert: {
          id?: string
          created_at?: string | null
          org?: string | null
          address?: string | null
          price?: number | null
          sqmeter?: number | null
          headline?: string | null
          thumbnail?: string | null
          imageLinks?: Json | null
          propertyLink?: string | null
        }
        Update: {
          id?: string
          created_at?: string | null
          org?: string | null
          address?: string | null
          price?: number | null
          sqmeter?: number | null
          headline?: string | null
          thumbnail?: string | null
          imageLinks?: Json | null
          propertyLink?: string | null
        }
      }
      Report: {
        Row: {
          reportId: string
          commitRef: string
          installationId: string
          date: string
          result: Database["public"]["Enums"]["ReportStatus"]
          error: string | null
          lcov: string | null
          runnerId: string
          timespent: number
          projectId: string
          branch: string
        }
        Insert: {
          reportId: string
          commitRef: string
          installationId: string
          date?: string
          result: Database["public"]["Enums"]["ReportStatus"]
          error?: string | null
          lcov?: string | null
          runnerId: string
          timespent: number
          projectId: string
          branch: string
        }
        Update: {
          reportId?: string
          commitRef?: string
          installationId?: string
          date?: string
          result?: Database["public"]["Enums"]["ReportStatus"]
          error?: string | null
          lcov?: string | null
          runnerId?: string
          timespent?: number
          projectId?: string
          branch?: string
        }
      }
      ReportLog: {
        Row: {
          id: string
          log: string
          reportId: string
        }
        Insert: {
          id: string
          log: string
          reportId: string
        }
        Update: {
          id?: string
          log?: string
          reportId?: string
        }
      }
      UserToOrg: {
        Row: {
          userId: string
          orgName: string
          role: Database["public"]["Enums"]["Role"]
        }
        Insert: {
          userId: string
          orgName: string
          role?: Database["public"]["Enums"]["Role"]
        }
        Update: {
          userId?: string
          orgName?: string
          role?: Database["public"]["Enums"]["Role"]
        }
      }
      wishes: {
        Row: {
          id: number
          wish: string
          userid: string
          dateAdded: string
          link: string
        }
        Insert: {
          id?: number
          wish: string
          userid?: string
          dateAdded?: string
          link?: string
        }
        Update: {
          id?: number
          wish?: string
          userid?: string
          dateAdded?: string
          link?: string
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
      PaymentProvider: "STRIPE"
      Provider: "GITHUB"
      ReportStatus: "SUCCESS" | "FAILED"
      Role: "MEMBER" | "OWNER"
    }
  }
}
