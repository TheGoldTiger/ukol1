import fs from 'fs/promises';

const INSTRUCTIONS_FILE = 'instrukce.txt';

async function main() {
    try {
        try {
            await fs.access(INSTRUCTIONS_FILE);
        } catch (error) {
            console.error(`Chyba: Soubor "${INSTRUCTIONS_FILE}" nebyl nalezen.`);
            return;
        }
        const instructions = await fs.readFile(INSTRUCTIONS_FILE, 'utf8');

        const [sourceFile, targetFile] = instructions.trim().split(' ');

        if (!sourceFile || !targetFile) {
            console.error(`Chyba: Neplatný formát instrukcí v souboru "${INSTRUCTIONS_FILE}".`);
            console.error('Očekávaný formát: "zdrojovy_soubor.txt cilovy_soubor.txt"');
            return;
        }

        try {
            await fs.access(sourceFile);
        } catch (error) {
            console.error(`Chyba: Zdrojový soubor "${sourceFile}" nebyl nalezen.`);
            return;
        }

        const data = await fs.readFile(sourceFile, 'utf8');

        await fs.writeFile(targetFile, data);

        console.log(`Úspěch: Obsah souboru "${sourceFile}" byl zkopírován do souboru "${targetFile}".`);

    } catch (error) {
        console.error('Nastala neočekávaná chyba:', error.message);
    }
}

main();