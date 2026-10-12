import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

async function exportData() {
  console.log('Loading TypeScript data using Vite ssrLoadModule...');
  const server = await createServer({
    root: rootDir,
    server: { middlewareMode: true },
    appType: 'custom',
  });

  try {
    const companyMod = await server.ssrLoadModule('/src/data/company.ts');
    const servicesMod = await server.ssrLoadModule('/src/data/services.ts');
    const processMod = await server.ssrLoadModule('/src/data/process.ts');
    const projectsMod = await server.ssrLoadModule('/src/data/projects.ts');
    const techMod = await server.ssrLoadModule('/src/data/technologies.ts');

    const combinedData = {
      company: companyMod.COMPANY,
      services: servicesMod.SERVICES,
      processSteps: processMod.PROCESS_STEPS,
      projects: projectsMod.PROJECTS,
      categories: projectsMod.CATEGORIES,
      techCategories: techMod.TECH_CATEGORIES,
    };

    const outPath = path.join(__dirname, 'exported_data.json');
    fs.writeFileSync(outPath, JSON.stringify(combinedData, null, 2), 'utf-8');
    console.log(`Successfully exported data to: ${outPath}`);
    console.log(`Exported ${combinedData.projects.length} projects, ${combinedData.services.length} services, ${combinedData.processSteps.length} process steps.`);
  } catch (err) {
    console.error('Error exporting data:', err);
    process.exit(1);
  } finally {
    await server.close();
    process.exit(0);
  }
}

exportData();
