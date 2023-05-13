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
      product_expiration: {
        Row: {
          created_at: string | null
          exp_date: string | null
          id: number
          note: string | null
          product: number | null
          start_date: string | null
        }
        Insert: {
          created_at?: string | null
          exp_date?: string | null
          id?: number
          note?: string | null
          product?: number | null
          start_date?: string | null
        }
        Update: {
          created_at?: string | null
          exp_date?: string | null
          id?: number
          note?: string | null
          product?: number | null
          start_date?: string | null
        }
      }
      products: {
        Row: {
          created_at: string | null
          expiration_days: number | null
          id: number
          product_name: string | null
        }
        Insert: {
          created_at?: string | null
          expiration_days?: number | null
          id?: number
          product_name?: string | null
        }
        Update: {
          created_at?: string | null
          expiration_days?: number | null
          id?: number
          product_name?: string | null
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
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
