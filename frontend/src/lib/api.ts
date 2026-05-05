const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:4000";

export type CollegeSummary = {
  id: string;
  slug: string;
  name: string;
  location: string;
  state: string;
  fee: number;
  rating: number;
  placementPercent: number;
  averagePackageLpa: number;
  courseTags: string[];
};

export type CollegeDetail = CollegeSummary & {
  overview: string;
  established: number;
  ownership: string;
  campusSizeAcres: number;
  highestPackageLpa: number;
  exams: string[];
  minRank: number;
  courses: { id: string; name: string; duration: string; seats: number }[];
  reviews: { id: string; author: string; rating: number; comment: string }[];
};

export type CompareCollege = Pick<
  CollegeDetail,
  "id" | "name" | "location" | "fee" | "placementPercent" | "rating" | "averagePackageLpa" | "highestPackageLpa"
>;

export type CollegeListResponse = {
  items: CollegeSummary[];
  pagination: { page: number; limit: number; total: number; totalPages: number };
};

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: "Request failed" }));
    throw new Error(error.message ?? "Request failed");
  }

  return response.json() as Promise<T>;
}

export function getColleges(params: URLSearchParams) {
  return request<CollegeListResponse>(`/api/colleges?${params.toString()}`);
}

export function getCollege(slug: string) {
  return request<CollegeDetail>(`/api/colleges/${slug}`);
}

export function getFilters() {
  return request<{ locations: string[]; courses: string[] }>("/api/colleges/meta/filters");
}

export function compareColleges(ids: string[]) {
  return request<{ items: CompareCollege[] }>(`/api/compare?ids=${ids.join(",")}`);
}

export function predictColleges(exam: string, rank: number) {
  return request<{ items: (CollegeSummary & { minRank: number; exams: string[] })[]; message: string }>(
    "/api/predictor",
    {
      method: "POST",
      body: JSON.stringify({ exam, rank })
    }
  );
}
