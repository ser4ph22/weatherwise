// scripts/check-build-size.js
import { readdir, stat } from 'fs/promises';
import { join } from 'path';

async function calculateDirSize(dirPath) {
    let size = 0;
    const files = await readdir(dirPath, { withFileTypes: true });

    for (const file of files) {
        const filePath = join(dirPath, file.name);
        if (file.isDirectory()) {
            size += await calculateDirSize(filePath);
        } else {
            const { size: fileSize } = await stat(filePath);
            size += fileSize;
        }
    }

    return size;
}

async function formatSize(bytes) {
    const units = ['B', 'KB', 'MB', 'GB'];
    let size = bytes;
    let unitIndex = 0;

    while (size >= 1024 && unitIndex < units.length - 1) {
        size /= 1024;
        unitIndex++;
    }

    return `${size.toFixed(2)} ${units[unitIndex]}`;
}

async function checkBuildSize() {
    try {
        const buildDir = './dist';
        const totalSize = await calculateDirSize(buildDir);
        const formattedSize = await formatSize(totalSize);
        
        console.log('\nBuild Size Analysis:');
        console.log('-------------------');
        console.log(`Total build size: ${formattedSize}`);
        
        // Check against Azure Static Web Apps limit (250MB)
        const maxSize = 262144000; // 250MB in bytes
        if (totalSize > maxSize) {
            console.error(`\n⚠️  Warning: Build size exceeds Azure Static Web Apps limit!`);
            console.error(`Maximum allowed: ${await formatSize(maxSize)}`);
            process.exit(1);
        } else {
            const percentageUsed = ((totalSize / maxSize) * 100).toFixed(2);
            console.log(`Size limit usage: ${percentageUsed}%`);
            console.log('✅ Build size is within Azure Static Web Apps limits\n');
        }
    } catch (error) {
        console.error('Error analyzing build size:', error);
        process.exit(1);
    }
}

checkBuildSize();