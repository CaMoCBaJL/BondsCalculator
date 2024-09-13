import * as fs from "fs/promises";
import process from 'process';
import path from 'path';

const libDirectory = 'projects';
const workspaceDirectory = 'bonds-calculator';
const configFileName = 'package.json';
const featureTagName = 'Feature-Number';
const sourceDir = process.cwd();
const pathToProjectsDir = path.join(sourceDir, '../', workspaceDirectory, libDirectory);

fs.readdir(pathToProjectsDir)
    .then((projects) => {
        projects.forEach(async projName => {
            await getProjectInfo(projName);
        });
    });

async function getProjectInfo(projName) {
    const projInfoFile = path.join(pathToProjectsDir, projName, configFileName);

    const fileData = JSON.parse(await fs.readFile(projInfoFile));
    console.log(`\n\nProject name: ${projName}`);

    console.log(`${projName} info:`);
    
    console.log(`version: ${fileData['version']}`);
    if (fileData[featureTagName]){
        console.log(`last changed for feature ${fileData[featureTagName]}`);
    } else {
        console.log(`no feature flag... it seems to be new (if major version is 0.0.1...)!`);
    }

    console.log('---------------------------------------');
}