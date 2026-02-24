import { createClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";
import path from "path";

dotenv.config({ path: ".env.local" });

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const BUCKET_NAME = "images";

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error("Missing SUPABASE credentials");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function downloadImage(url: string): Promise<{ buffer: Buffer; contentType: string } | null> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.error(`Failed to fetch ${url}: ${response.statusText}`);
      return null;
    }
    const contentType = response.headers.get("content-type") || "application/octet-stream";
    const arrayBuffer = await response.arrayBuffer();
    return { buffer: Buffer.from(arrayBuffer), contentType };
  } catch (error) {
    console.error(`Error downloading ${url}:`, error);
    return null;
  }
}

async function run() {
  console.log("Fetching all notices...");
  const { data: notices, error } = await supabase.from("notices").select("id, title, content");
  
  if (error) {
    console.error("Error fetching notices:", error);
    return;
  }
  
  let migratedCount = 0;

  for (const notice of notices!) {
    if (!notice.content) continue;
    
    // Look for legacy WP uploads links
    const regex = /https?:\/\/artswisdom\.com\/wp-content\/uploads\/[a-zA-Z0-9\/_\.\-%]+/g;
    const matches = notice.content.match(regex);
    
    if (matches && matches.length > 0) {
      console.log(`\nProcessing Notice ID: ${notice.id} - ${notice.title} (${matches.length} images)`);
      
      let updatedContent = notice.content;
      
      // We use a Set to avoid re-uploading identical URLs in the same post
      const uniqueUrls = [...new Set<string>(matches)];
      
      for (const legacyUrl of uniqueUrls) {
        // Extract filename from URL
        const parsedUrl = new URL(legacyUrl);
        let filename = path.basename(decodeURIComponent(parsedUrl.pathname));
        
        // Ensure valid filename (replace weird chars)
        filename = filename.replace(/[^a-zA-Z0-9_.-]/g, "_");
        
        // Upload path in bucket
        const storagePath = `notices/${notice.id}/${filename}`;
        
        // Check if it already exists (optional, but let's just upload with upsert)
        console.log(`  Downloading: ${legacyUrl}`);
        const downloaded = await downloadImage(legacyUrl);
        
        if (downloaded) {
          console.log(`  Uploading to Supabase: ${storagePath}`);
          const { data: uploadData, error: uploadError } = await supabase.storage
            .from(BUCKET_NAME)
            .upload(storagePath, downloaded.buffer, {
              contentType: downloaded.contentType,
              upsert: true
            });
            
          if (uploadError) {
            console.error(`  Upload failed:`, uploadError);
          } else {
            // Get public URL
            const { data: publicUrlData } = supabase.storage.from(BUCKET_NAME).getPublicUrl(storagePath);
            const newUrl = publicUrlData.publicUrl;
            
            // Replace globally in content
            // We need to escape the legacyUrl for regex if we use replace with RegExp, or use split/join
            console.log(`  Replacing URL in HTML...`);
            updatedContent = updatedContent.split(legacyUrl).join(newUrl);
          }
        }
      }
      
      // Update DB if content changed
      if (updatedContent !== notice.content) {
        console.log(`  Updating Database for Notice ID: ${notice.id}...`);
        const { error: updateError } = await supabase
          .from("notices")
          .update({ content: updatedContent })
          .eq("id", notice.id);
          
        if (updateError) {
          console.error(`  Failed to update Notice ID ${notice.id}:`, updateError);
        } else {
          console.log(`  Successfully updated Notice ID ${notice.id}.`);
          migratedCount++;
        }
      }
    }
  }
  
  console.log(`\nMigration completed. Updated ${migratedCount} notices.`);
}

run();
