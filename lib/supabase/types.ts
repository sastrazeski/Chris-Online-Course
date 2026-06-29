export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          full_name: string | null;
          avatar_url: string | null;
          role: "student" | "teacher" | "instructor" | "admin" | "developer";
          created_at: string;
        };
        Insert: {
          id: string;
          full_name?: string | null;
          avatar_url?: string | null;
          role?: "student" | "teacher" | "instructor" | "admin" | "developer";
          created_at?: string;
        };
        Update: {
          full_name?: string | null;
          avatar_url?: string | null;
          role?: "student" | "teacher" | "instructor" | "admin" | "developer";
        };
        Relationships: [];
      };
      courses: {
        Row: {
          id: string;
          title: string;
          slug: string;
          description: string;
          cover_image_url: string | null;
          price: number;
          currency: string;
          is_published: boolean;
          created_by: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          slug: string;
          description: string;
          cover_image_url?: string | null;
          price: number;
          currency?: string;
          is_published?: boolean;
          created_by?: string | null;
        };
        Update: Partial<Database["public"]["Tables"]["courses"]["Insert"]>;
        Relationships: [
          {
            foreignKeyName: "courses_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
      modules: {
        Row: {
          id: string;
          course_id: string;
          title: string;
          position: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          course_id: string;
          title: string;
          position?: number;
        };
        Update: Partial<Database["public"]["Tables"]["modules"]["Insert"]>;
        Relationships: [
          {
            foreignKeyName: "modules_course_id_fkey";
            columns: ["course_id"];
            isOneToOne: false;
            referencedRelation: "courses";
            referencedColumns: ["id"];
          }
        ];
      };
      lessons: {
        Row: {
          id: string;
          module_id: string;
          title: string;
          slug: string;
          description: string | null;
          video_url: string | null;
          duration_seconds: number;
          position: number;
          is_preview: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          module_id: string;
          title: string;
          slug: string;
          description?: string | null;
          video_url?: string | null;
          duration_seconds?: number;
          position?: number;
          is_preview?: boolean;
        };
        Update: Partial<Database["public"]["Tables"]["lessons"]["Insert"]>;
        Relationships: [
          {
            foreignKeyName: "lessons_module_id_fkey";
            columns: ["module_id"];
            isOneToOne: false;
            referencedRelation: "modules";
            referencedColumns: ["id"];
          }
        ];
      };
      enrollments: {
        Row: {
          id: string;
          user_id: string;
          course_id: string;
          status: "active" | "refunded" | "cancelled";
          enrolled_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          course_id: string;
          status?: "active" | "refunded" | "cancelled";
          enrolled_at?: string;
        };
        Update: {
          status?: "active" | "refunded" | "cancelled";
        };
        Relationships: [
          {
            foreignKeyName: "enrollments_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "enrollments_course_id_fkey";
            columns: ["course_id"];
            isOneToOne: false;
            referencedRelation: "courses";
            referencedColumns: ["id"];
          }
        ];
      };
      lesson_progress: {
        Row: {
          user_id: string;
          lesson_id: string;
          is_completed: boolean;
          watched_seconds: number;
          updated_at: string;
        };
        Insert: {
          user_id: string;
          lesson_id: string;
          is_completed?: boolean;
          watched_seconds?: number;
          updated_at?: string;
        };
        Update: {
          is_completed?: boolean;
          watched_seconds?: number;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "lesson_progress_lesson_id_fkey";
            columns: ["lesson_id"];
            isOneToOne: false;
            referencedRelation: "lessons";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "lesson_progress_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
      orders: {
        Row: {
          id: string;
          user_id: string;
          course_id: string;
          amount: number;
          currency: string;
          status: "pending" | "paid" | "failed" | "expired" | "cancelled";
          midtrans_order_id: string;
          midtrans_transaction_id: string | null;
          payment_type: string | null;
          raw_notification: Json | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          course_id: string;
          amount: number;
          currency?: string;
          status?: "pending" | "paid" | "failed" | "expired" | "cancelled";
          midtrans_order_id: string;
          midtrans_transaction_id?: string | null;
          payment_type?: string | null;
          raw_notification?: Json | null;
        };
        Update: {
          status?: "pending" | "paid" | "failed" | "expired" | "cancelled";
          midtrans_transaction_id?: string | null;
          payment_type?: string | null;
          raw_notification?: Json | null;
        };
        Relationships: [
          {
            foreignKeyName: "orders_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "orders_course_id_fkey";
            columns: ["course_id"];
            isOneToOne: false;
            referencedRelation: "courses";
            referencedColumns: ["id"];
          }
        ];
      };
      client_brands: {
        Row: {
          id: string;
          name: string;
          is_active: boolean;
          position: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          is_active?: boolean;
          position?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["client_brands"]["Insert"]>;
        Relationships: [];
      };
      pending_registrations: {
        Row: {
          email: string;
          full_name: string;
          encrypted_password: string;
          otp_hash: string;
          otp_expires_at: string;
          attempts: number;
          last_sent_at: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          email: string;
          full_name: string;
          encrypted_password: string;
          otp_hash: string;
          otp_expires_at: string;
          attempts?: number;
          last_sent_at?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          full_name?: string;
          encrypted_password?: string;
          otp_hash?: string;
          otp_expires_at?: string;
          attempts?: number;
          last_sent_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: {
      is_admin: {
        Args: Record<PropertyKey, never>;
        Returns: boolean;
      };
      is_enrolled: {
        Args: {
          course_uuid: string;
        };
        Returns: boolean;
      };
    };
    Enums: {
      user_role: "student" | "teacher" | "instructor" | "admin" | "developer";
      enrollment_status: "active" | "refunded" | "cancelled";
      order_status: "pending" | "paid" | "failed" | "expired" | "cancelled";
    };
    CompositeTypes: Record<string, never>;
  };
};

export type CourseWithModules = Database["public"]["Tables"]["courses"]["Row"] & {
  modules: Array<
    Database["public"]["Tables"]["modules"]["Row"] & {
      lessons: Database["public"]["Tables"]["lessons"]["Row"][];
    }
  >;
};

export type CourseRow = Database["public"]["Tables"]["courses"]["Row"];
export type ModuleRow = Database["public"]["Tables"]["modules"]["Row"];
export type LessonRow = Database["public"]["Tables"]["lessons"]["Row"];
export type ClientBrandRow = Database["public"]["Tables"]["client_brands"]["Row"];
export type UserRole = Database["public"]["Enums"]["user_role"];

export type EnrollmentWithCourse = Database["public"]["Tables"]["enrollments"]["Row"] & {
  courses: CourseWithModules;
};
