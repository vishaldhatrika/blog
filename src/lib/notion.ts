import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";
import { PageObjectResponse } from "@notionhq/client/";

export const notion = new Client({ auth: process.env.NOTION_TOKEN });
export const n2m = new NotionToMarkdown({ notionClient: notion });

export interface Post {
  id: string;
  title: string;
  slug: string;
  coverImage?: string;
  description: string;
  date: string;
  content: string;
  author?: string;
  tags?: string[];
  category?: string;
}

export async function getDatabaseStructure() {
  const database = await notion.databases.retrieve({
    database_id: process.env.NOTION_DATABASE_ID!,
  });
  return database;
}

export function getWordCount(content: string): number {
  const cleanText = content
    .replace(/[^\w\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  return cleanText.split(" ").length;
}

export async function fetchPublishedPosts() {
  const posts = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID!,
    filter: {
      and: [
        {
          property: "Status",
          status: {
            equals: "Published",
          },
        },
      ],
    },
    sorts: [
      {
        property: "Published Date",
        direction: "descending",
      },
    ],
  });

  return posts;
}

export async function getPost(pageId: string): Promise<Post | null> {
  try {
    const page = (await notion.pages.retrieve({
      page_id: pageId,
    })) as PageObjectResponse;
    const mdBlocks = await n2m.pageToMarkdown(pageId);
    const { parent: contentString } = n2m.toMarkdownString(mdBlocks);

    // Get first paragraph for description (excluding empty lines)
    const paragraphs = contentString
      .split("\n")
      .filter((line: string) => line.trim().length > 0);
    const firstParagraph = paragraphs[0] || "";
    const description =
      firstParagraph.slice(0, 160) + (firstParagraph.length > 160 ? "..." : "");

    const properties = page.properties as any;
    const post: Post = {
      id: page.id,
      title: properties.Title.title[0]?.plain_text || "Untitled",
      slug:
        properties.Title.title[0]?.plain_text
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-") // Replace any non-alphanumeric chars with dash
          .replace(/^-+|-+$/g, "") || // Remove leading/trailing dashes
        "untitled",
      coverImage: properties["Featured Image"]?.url || undefined,
      description,
      date:
        properties["Published Date"]?.date?.start || new Date().toISOString(),
      content: contentString,
      author: properties.Author?.people[0]?.name,
      tags: properties.Tags?.multi_select?.map((tag: any) => tag.name) || [],
      category: properties.Category?.select?.name,
    };

    return post;
  } catch (error) {
    console.error("Error getting post:", error);
    return null;
  }
}
