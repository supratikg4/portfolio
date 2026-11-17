const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

// Directories
const INPUT_DIR = path.join(__dirname, "../public/photography");
const OUTPUT_DIR = path.join(INPUT_DIR, "thumbnails");

// Image settings
const MAX_DIMENSION = 1200;
const WEBP_QUALITY = 85;

// Supported image formats
const SUPPORTED_FORMATS = /\.(jpg|jpeg|png|tif|tiff)$/i;

async function generateThumbnails() {
  try {
    // Create output directory if it doesn't exist.
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });

    // Get all image files from the photography directory.
    const files = fs.readdirSync(INPUT_DIR).filter(
      (file) =>
        SUPPORTED_FORMATS.test(file) &&
        fs.statSync(path.join(INPUT_DIR, file)).isFile()
    );

    console.log(`Found ${files.length} photographs.\n`);

    let totalOriginalSize = 0;
    let totalThumbnailSize = 0;

    // Process images sequentially to avoid excessive memory usage.
    for (const file of files) {
      const inputPath = path.join(INPUT_DIR, file);

      // Convert filename to WebP.
      const outputFilename = file.replace(/\.[^.]+$/, ".webp");
      const outputPath = path.join(OUTPUT_DIR, outputFilename);

      try {
        const originalStats = fs.statSync(inputPath);

        // Generate optimized thumbnail.
        await sharp(inputPath)
          .rotate() // Respect EXIF orientation.
          .resize({
            width: MAX_DIMENSION,
            height: MAX_DIMENSION,
            fit: "inside",
            withoutEnlargement: true,
          })
          .webp({
            quality: WEBP_QUALITY,
            effort: 5,
          })
          .toFile(outputPath);

        const thumbnailStats = fs.statSync(outputPath);

        totalOriginalSize += originalStats.size;
        totalThumbnailSize += thumbnailStats.size;

        const originalKB = (originalStats.size / 1024).toFixed(1);
        const thumbnailKB = (thumbnailStats.size / 1024).toFixed(1);

        const reduction = (
          (1 - thumbnailStats.size / originalStats.size) *
          100
        ).toFixed(1);

        console.log(
          `✓ ${file} → ${outputFilename} | ${originalKB} KB → ${thumbnailKB} KB (${reduction}% smaller)`
        );
      } catch (error) {
        console.error(`✗ Failed to process ${file}:`, error.message);
      }
    }

    // Display summary.
    console.log("\n----------------------------------");
    console.log("THUMBNAIL GENERATION COMPLETE");
    console.log("----------------------------------");

    console.log(`Photographs processed: ${files.length}`);

    console.log(
      `Original total: ${(totalOriginalSize / 1024 / 1024).toFixed(2)} MB`
    );

    console.log(
      `Thumbnail total: ${(totalThumbnailSize / 1024 / 1024).toFixed(2)} MB`
    );

    if (totalOriginalSize > 0) {
      const overallReduction = (
        (1 - totalThumbnailSize / totalOriginalSize) *
        100
      ).toFixed(1);

      console.log(`Overall reduction: ${overallReduction}%`);
    }

    console.log(`\nThumbnails saved to: ${OUTPUT_DIR}`);
  } catch (error) {
    console.error("Thumbnail generation failed:", error);
    process.exitCode = 1;
  }
}

generateThumbnails();