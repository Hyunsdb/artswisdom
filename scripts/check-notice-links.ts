import { createClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(SUPABASE_URL!, SUPABASE_KEY!);

async function run() {
  console.log("Fetching all notices...");
  const { data: notices, error } = await supabase.from("notices").select("id, title, content");
  
  if (error) {
    console.error(error);
    return;
  }
  
  let found = 0;
  for (const notice of notices!) {
    if (notice.content && notice.content.includes("artswisdom.com/wp-content/uploads/")) {
      console.log(`\nNotice ID: ${notice.id} - ${notice.title} contains old external image links!`);
      // Find all image urls
      const regex = /https?:\/\/artswisdom\.com\/wp-content\/uploads\/[^"'\s]+/g;
      const matches = notice.content.match(regex);
      if (matches) {
        matches.forEach((url: string) => console.log(`  -> ${url}`));
      }
      found++;
    }
  }
  
  if (found === 0) {
    console.log("No old wp-content image links found in any notices.");
  } else {
    console.log(`\nFound ${found} notices with legacy image links.`);
  }
}

run();
