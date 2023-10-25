export type Mention = {
  searchTerm: string;
  site: string;
  created_at: string;
};

export type MentionsSummary = {
  runHour: string;
  mentions: number;
}[];
